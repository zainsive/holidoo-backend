import { handle } from "../../handle";
import { ValidationSource } from "../constants";
import { GetCountriesHandler } from "./countries/handler";
import { GetHolidaysHandler, GetHolidayApiQuerysSchema } from "./holidays";

export const modules = [
  {
    method: "GET",
    name: "GET:Holidays",
    route: "/holidays",
    handler: handle(GetHolidaysHandler),
    validate: [
      {
        source: ValidationSource.QUERY,
        schema: GetHolidayApiQuerysSchema,
      },
    ],
  },

  {
    method: "GET",
    name: "GET:Countries",
    route: "/countries",
    handler: handle(GetCountriesHandler),
    validate: [],
  },
];
