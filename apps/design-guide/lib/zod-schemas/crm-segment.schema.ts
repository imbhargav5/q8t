import { z } from "zod";

// Segment Type Enum
export const SegmentTypeEnum = z.enum(["static", "dynamic"]);
export type SegmentType = z.infer<typeof SegmentTypeEnum>;

// Filter Operator Enum
export const FilterOperatorEnum = z.enum([
  "equals",
  "not_equals",
  "contains",
  "not_contains",
  "starts_with",
  "ends_with",
  "greater_than",
  "less_than",
  "greater_than_or_equal",
  "less_than_or_equal",
  "is_empty",
  "is_not_empty",
  "in",
  "not_in",
]);

export type FilterOperator = z.infer<typeof FilterOperatorEnum>;

// Filter Condition Schema
export const FilterConditionSchema = z.object({
  field: z.string(),
  operator: FilterOperatorEnum,
  value: z.unknown(),
});

export type FilterCondition = z.infer<typeof FilterConditionSchema>;

// Segment Filters Schema
export const SegmentFiltersSchema = z.object({
  conditions: z.array(FilterConditionSchema).default([]),
  logic: z.enum(["AND", "OR"]).default("AND"),
});

export type SegmentFilters = z.infer<typeof SegmentFiltersSchema>;

// CRM Segment Schema
export const CRMSegmentSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),

  // Segment metadata
  name: z.string().min(1),
  description: z.string().nullable(),
  icon: z.string().nullable(),

  // Segment type
  segment_type: SegmentTypeEnum.default("dynamic"),

  // Filter configuration
  filters: SegmentFiltersSchema.default({ conditions: [], logic: "AND" }),

  // Sort configuration
  sort_by: z.string().default("last_contact_at"),
  sort_order: z.enum(["asc", "desc"]).default("desc"),

  // Static segment members
  member_ids: z.array(z.string().uuid()).default([]),

  // Metadata
  is_system: z.boolean().default(false),
  is_favorite: z.boolean().default(false),
  color: z.string().nullable(),

  // Creator tracking
  created_by: z.string().uuid(),

  // Usage tracking
  last_accessed_at: z.string().datetime().nullable(),
  access_count: z.number().int().default(0),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type CRMSegment = z.infer<typeof CRMSegmentSchema>;

// Segment with count
export const CRMSegmentWithCountSchema = CRMSegmentSchema.extend({
  contact_count: z.number().int().default(0),
});

export type CRMSegmentWithCount = z.infer<typeof CRMSegmentWithCountSchema>;
