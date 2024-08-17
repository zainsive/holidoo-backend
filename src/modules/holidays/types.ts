import { z } from "zod";

export const GetHolidayApiQuerysSchema = z.object({
  country: z.string(),
  year: z.string(),
});

export type GetHolidayApiRequestType = z.infer<
  typeof GetHolidayApiQuerysSchema
>;
