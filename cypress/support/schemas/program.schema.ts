import { object, number, string } from 'superstruct';

export const addProgramResponseSchema = object({
  status_code: number(),
  message: string(),
  contents: object({
    id: number(),
    uuid: string(),
  }),
});
