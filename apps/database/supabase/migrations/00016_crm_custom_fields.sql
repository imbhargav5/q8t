-- CRM Custom Fields - Workspace-Specific Contact Fields
-- This migration creates the custom field definition system for flexible contact data

-- Create enum for custom field types
CREATE TYPE crm_custom_field_type AS ENUM (
  'text',
  'textarea',
  'number',
  'email',
  'phone',
  'url',
  'date',
  'datetime',
  'select',
  'multiselect',
  'checkbox',
  'currency'
);

-- ============================================================================
-- CRM CUSTOM FIELD DEFINITIONS TABLE
-- ============================================================================

CREATE TABLE crm_custom_field_definitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Field metadata
  field_name TEXT NOT NULL, -- Internal key (e.g., 'customer_id')
  field_label TEXT NOT NULL, -- Display label (e.g., 'Customer ID')
  field_description TEXT,
  field_type crm_custom_field_type NOT NULL,

  -- Field configuration
  is_required BOOLEAN DEFAULT false NOT NULL,
  is_unique BOOLEAN DEFAULT false NOT NULL,
  is_searchable BOOLEAN DEFAULT true NOT NULL,

  -- Validation rules
  validation_rules JSONB DEFAULT '{}',
  -- Example validation rules:
  -- {
  --   "min_length": 5,
  --   "max_length": 100,
  --   "pattern": "^[A-Z0-9-]+$",
  --   "min_value": 0,
  --   "max_value": 1000000
  -- }

  -- Options for select/multiselect fields
  options JSONB, -- Array of options: ["Option 1", "Option 2", "Option 3"]

  -- Default value
  default_value TEXT,

  -- Display configuration
  display_order INTEGER DEFAULT 0 NOT NULL,
  placeholder TEXT,
  help_text TEXT,

  -- Grouping
  field_group TEXT, -- Group fields together (e.g., 'Sales', 'Support', 'Marketing')

  -- System fields (protected from deletion)
  is_system BOOLEAN DEFAULT false NOT NULL,

  -- Creator tracking
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Unique constraint: one field name per workspace
  UNIQUE(workspace_id, field_name)
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_crm_custom_field_definitions_updated_at
  BEFORE UPDATE ON crm_custom_field_definitions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to validate custom field value against field definition
CREATE OR REPLACE FUNCTION validate_custom_field_value(
  field_uuid UUID,
  field_value TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  field_def RECORD;
  rules JSONB;
  options_arr JSONB;
BEGIN
  -- Get field definition
  SELECT * INTO field_def
  FROM crm_custom_field_definitions
  WHERE id = field_uuid;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Custom field not found';
  END IF;

  -- Check if required
  IF field_def.is_required AND (field_value IS NULL OR field_value = '') THEN
    RETURN false;
  END IF;

  -- Type-specific validation
  CASE field_def.field_type
    WHEN 'email' THEN
      IF field_value IS NOT NULL AND field_value !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RETURN false;
      END IF;

    WHEN 'url' THEN
      IF field_value IS NOT NULL AND field_value !~ '^https?://' THEN
        RETURN false;
      END IF;

    WHEN 'number' THEN
      IF field_value IS NOT NULL AND field_value !~ '^\d+(\.\d+)?$' THEN
        RETURN false;
      END IF;

    WHEN 'select', 'multiselect' THEN
      options_arr := field_def.options;
      IF field_value IS NOT NULL AND NOT (field_value = ANY(ARRAY(SELECT jsonb_array_elements_text(options_arr)))) THEN
        RETURN false;
      END IF;

    WHEN 'date' THEN
      BEGIN
        PERFORM field_value::DATE;
      EXCEPTION WHEN OTHERS THEN
        RETURN false;
      END;

    WHEN 'datetime' THEN
      BEGIN
        PERFORM field_value::TIMESTAMPTZ;
      EXCEPTION WHEN OTHERS THEN
        RETURN false;
      END;

    ELSE
      -- No specific validation for other types
      NULL;
  END CASE;

  -- Validation rules
  rules := field_def.validation_rules;

  IF rules ? 'min_length' AND length(field_value) < (rules->>'min_length')::INTEGER THEN
    RETURN false;
  END IF;

  IF rules ? 'max_length' AND length(field_value) > (rules->>'max_length')::INTEGER THEN
    RETURN false;
  END IF;

  IF rules ? 'pattern' AND field_value !~ (rules->>'pattern') THEN
    RETURN false;
  END IF;

  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Function to get all custom fields for a workspace
CREATE OR REPLACE FUNCTION get_workspace_custom_fields(workspace_uuid UUID)
RETURNS TABLE (
  id UUID,
  field_name TEXT,
  field_label TEXT,
  field_type crm_custom_field_type,
  is_required BOOLEAN,
  display_order INTEGER,
  field_group TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    cfd.id,
    cfd.field_name,
    cfd.field_label,
    cfd.field_type,
    cfd.is_required,
    cfd.display_order,
    cfd.field_group
  FROM crm_custom_field_definitions cfd
  WHERE cfd.workspace_id = workspace_uuid
  ORDER BY cfd.display_order, cfd.field_label;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to bulk update person custom fields
CREATE OR REPLACE FUNCTION update_person_custom_fields(
  person_uuid UUID,
  custom_fields_data JSONB
)
RETURNS BOOLEAN AS $$
DECLARE
  field_key TEXT;
  field_value TEXT;
BEGIN
  -- Validate all fields before updating
  FOR field_key, field_value IN
    SELECT * FROM jsonb_each_text(custom_fields_data)
  LOOP
    -- Get field definition and validate
    DECLARE
      field_def_id UUID;
    BEGIN
      SELECT id INTO field_def_id
      FROM crm_custom_field_definitions
      WHERE field_name = field_key
        AND workspace_id = (SELECT workspace_id FROM crm_people WHERE id = person_uuid);

      IF field_def_id IS NULL THEN
        RAISE EXCEPTION 'Custom field % does not exist', field_key;
      END IF;

      IF NOT validate_custom_field_value(field_def_id, field_value) THEN
        RAISE EXCEPTION 'Invalid value for custom field %', field_key;
      END IF;
    END;
  END LOOP;

  -- Update custom fields
  UPDATE crm_people
  SET custom_fields = custom_fields || custom_fields_data,
      updated_at = NOW()
  WHERE id = person_uuid;

  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SEED DEFAULT CUSTOM FIELDS
-- ============================================================================

-- Function to create default custom fields for a workspace
CREATE OR REPLACE FUNCTION create_default_custom_fields(workspace_uuid UUID)
RETURNS VOID AS $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Get a workspace admin to set as creator
  SELECT user_id INTO admin_user_id
  FROM workspace_members
  WHERE workspace_id = workspace_uuid
    AND role IN ('owner', 'admin')
  LIMIT 1;

  IF admin_user_id IS NULL THEN
    RETURN;
  END IF;

  -- Customer ID
  INSERT INTO crm_custom_field_definitions (
    workspace_id, field_name, field_label, field_description, field_type,
    is_required, is_unique, display_order, field_group, created_by
  ) VALUES (
    workspace_uuid,
    'customer_id',
    'Customer ID',
    'Internal customer identifier',
    'text',
    false,
    true,
    1,
    'Business',
    admin_user_id
  );

  -- Lead Source
  INSERT INTO crm_custom_field_definitions (
    workspace_id, field_name, field_label, field_description, field_type,
    options, display_order, field_group, created_by
  ) VALUES (
    workspace_uuid,
    'lead_source',
    'Lead Source',
    'How this contact found you',
    'select',
    '["Social Media", "Website", "Referral", "Event", "Advertisement", "Direct", "Other"]'::jsonb,
    2,
    'Marketing',
    admin_user_id
  );

  -- Annual Revenue
  INSERT INTO crm_custom_field_definitions (
    workspace_id, field_name, field_label, field_description, field_type,
    validation_rules, display_order, field_group, created_by
  ) VALUES (
    workspace_uuid,
    'annual_revenue',
    'Annual Revenue',
    'Estimated annual revenue',
    'currency',
    '{"min_value": 0}'::jsonb,
    3,
    'Business',
    admin_user_id
  );

  -- Number of Employees
  INSERT INTO crm_custom_field_definitions (
    workspace_id, field_name, field_label, field_description, field_type,
    validation_rules, display_order, field_group, created_by
  ) VALUES (
    workspace_uuid,
    'employee_count',
    'Number of Employees',
    'Company size',
    'select',
    '{}'::jsonb,
    4,
    'Business',
    admin_user_id
  );

  -- Last Purchase Date
  INSERT INTO crm_custom_field_definitions (
    workspace_id, field_name, field_label, field_description, field_type,
    display_order, field_group, created_by
  ) VALUES (
    workspace_uuid,
    'last_purchase_date',
    'Last Purchase Date',
    'Date of most recent purchase',
    'date',
    5,
    'Sales',
    admin_user_id
  );

  -- Customer Lifetime Value
  INSERT INTO crm_custom_field_definitions (
    workspace_id, field_name, field_label, field_description, field_type,
    validation_rules, display_order, field_group, created_by
  ) VALUES (
    workspace_uuid,
    'lifetime_value',
    'Lifetime Value',
    'Total customer lifetime value',
    'currency',
    '{"min_value": 0}'::jsonb,
    6,
    'Sales',
    admin_user_id
  );

  -- Industry
  INSERT INTO crm_custom_field_definitions (
    workspace_id, field_name, field_label, field_description, field_type,
    options, display_order, field_group, created_by
  ) VALUES (
    workspace_uuid,
    'industry',
    'Industry',
    'Business industry or sector',
    'select',
    '["Technology", "Healthcare", "Finance", "Retail", "Manufacturing", "Education", "Real Estate", "Entertainment", "Other"]'::jsonb,
    7,
    'Business',
    admin_user_id
  );

  -- Interests
  INSERT INTO crm_custom_field_definitions (
    workspace_id, field_name, field_label, field_description, field_type,
    options, display_order, field_group, created_by
  ) VALUES (
    workspace_uuid,
    'interests',
    'Interests',
    'Contact interests and preferences',
    'multiselect',
    '["Products", "Services", "Partnership", "Press", "Support", "Careers"]'::jsonb,
    8,
    'Marketing',
    admin_user_id
  );

  -- Newsletter Subscription
  INSERT INTO crm_custom_field_definitions (
    workspace_id, field_name, field_label, field_description, field_type,
    default_value, display_order, field_group, created_by
  ) VALUES (
    workspace_uuid,
    'newsletter_subscribed',
    'Newsletter Subscription',
    'Subscribed to newsletter',
    'checkbox',
    'false',
    9,
    'Marketing',
    admin_user_id
  );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_crm_custom_field_definitions_workspace_id ON crm_custom_field_definitions(workspace_id);
CREATE INDEX idx_crm_custom_field_definitions_field_name ON crm_custom_field_definitions(workspace_id, field_name);
CREATE INDEX idx_crm_custom_field_definitions_field_type ON crm_custom_field_definitions(field_type);
CREATE INDEX idx_crm_custom_field_definitions_field_group ON crm_custom_field_definitions(workspace_id, field_group);
CREATE INDEX idx_crm_custom_field_definitions_display_order ON crm_custom_field_definitions(workspace_id, display_order);
CREATE INDEX idx_crm_custom_field_definitions_is_required ON crm_custom_field_definitions(workspace_id) WHERE is_required = true;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE crm_custom_field_definitions ENABLE ROW LEVEL SECURITY;

-- Custom field definitions policies
CREATE POLICY "Workspace members can view custom field definitions"
  ON crm_custom_field_definitions
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can create custom field definitions"
  ON crm_custom_field_definitions
  FOR INSERT
  WITH CHECK (has_workspace_role(workspace_id, auth.uid(), 'admin'));

CREATE POLICY "Workspace admins can update custom field definitions"
  ON crm_custom_field_definitions
  FOR UPDATE
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

CREATE POLICY "Workspace admins can delete non-system custom field definitions"
  ON crm_custom_field_definitions
  FOR DELETE
  USING (
    is_system = false AND
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE crm_custom_field_definitions IS 'Workspace-specific custom field definitions for contacts';
COMMENT ON COLUMN crm_custom_field_definitions.field_name IS 'Internal field key used in custom_fields JSONB';
COMMENT ON COLUMN crm_custom_field_definitions.validation_rules IS 'JSONB validation rules for field values';
COMMENT ON COLUMN crm_custom_field_definitions.options IS 'Options array for select/multiselect fields';
COMMENT ON FUNCTION validate_custom_field_value IS 'Validate a custom field value against its definition';
COMMENT ON FUNCTION update_person_custom_fields IS 'Bulk update custom fields for a person with validation';
COMMENT ON FUNCTION create_default_custom_fields IS 'Create default custom fields for a new workspace';
