import { array, number, object, string } from 'superstruct';

export const branchItemSchema = object({
  branch_id: number(),
  name: string(),
});

export const getBranchesResponseSchema = object({
  status_code: number(),
  message: string(),
  contents: array(branchItemSchema),
});
