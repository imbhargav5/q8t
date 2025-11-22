import { z } from "zod";

// Custom Field Type Enum
export const CustomFieldTypeEnum = z.enum([
  "text",
  "textarea",
  "number",
  "email",
  "phone",
  "url",
  "date",
  "datetime",
  "select",
  "multiselect",
  "checkbox",
  "currency",
]);

export type CustomFieldType = z.infer<typeof CustomFieldTypeEnum>;

// Validation Rules Schema
export const ValidationRulesSchema = z.object({
  min_length: z.number().int().positive().optional(),
  max_length: z.number().int().positive().optional(),
  pattern: z.string().optional(),
  min_value: z.number().optional(),
  max_value: z.number().optional(),
});

export type ValidationRules = z.infer<typeof ValidationRulesSchema>;

// Custom Field Definition Schema
export const CustomFieldDefinitionSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),

  // Field metadata
  field_name: z.string().min(1),
  field_label: z.string().min(1),
  field_description: z.string().nullable(),
  field_type: CustomFieldTypeEnum,

  // Field configuration
  is_required: z.boolean().default(false),
  is_unique: z.boolean().default(false),
  is_searchable: z.boolean().default(true),

  // Validation rules
  validation_rules: ValidationRulesSchema.default({}),

  // Options for select/multiselect fields
  options: z.array(z.string()).nullable(),

  // Default value
  default_value: z.string().nullable(),

  // Display configuration
  display_order: z.number().int().default(0),
  placeholder: z.string().nullable(),
  help_text: z.string().nullable(),

  // Grouping
  field_group: z.string().nullable(),

  // System fields
  is_system: z.boolean().default(false),

  // Creator tracking
  created_by: z.string().uuid(),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type CustomFieldDefinition = z.infer<typeof CustomFieldDefinitionSchema>;

// Custom Field Value Schema (for forms and validation)
export const CustomFieldValueSchema = z.object({
  field_id: z.string().uuid(),
  field_name: z.string(),
  field_type: CustomFieldTypeEnum,
  value: z.unknown(),
});

export type CustomFieldValue = z.infer<typeof CustomFieldValueSchema>;
