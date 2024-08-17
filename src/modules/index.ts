import { ValidationSource } from "../constants";
import { GetHolidaysHandler, GetHolidayApiQuerysSchema } from "./holidays";

export const modules = [
  {
    method: "GET",
    name: "GET:Holidays",
    route: "/holidays",
    handler: GetHolidaysHandler,
    validate: [
      {
        source: ValidationSource.QUERY,
        schema: GetHolidayApiQuerysSchema,
      },
    ],
  },
];
