import { z } from "zod";

export const GetHolidayApiQuerysSchema = z.object({
  country: z.string(),
  year: z.string(),
});
