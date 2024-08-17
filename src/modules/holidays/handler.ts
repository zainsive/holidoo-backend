import { Response } from "express";
import { GetHolidayApiRequestType } from "./types";
import { AppError } from "../../config/app-error";
import axios from "axios";
import { CacheClient } from "../../config/node-cache-client";

export const GetHolidaysHandler = async (request: any, response: Response) => {
  //

  const { country, year } = request as GetHolidayApiRequestType;

  const cacheKey = `holidays-${country}-${year}`;

  let holidays = CacheClient.get(cacheKey);

  if (!holidays) {
    try {
      holidays = await getHolidays(country, year);

      CacheClient.set(cacheKey, holidays);
    } catch (error) {
      response
        .status(400)
        .json({ status: 400, message: "Unable to fetch holidays." });
    }
  }

  response.send({ status: "success", data: holidays });
};

async function getHolidays(country: string, year: string) {
  if (!process.env.CALENDRIFIC_BASE_URL || !process.env.CALENDRIFIC_API_KEY)
    throw AppError.internal("Calendrific api credential missing!");

  const url = `${process.env.CALENDRIFIC_BASE_URL}/holidays?api_key=${process.env.CALENDRIFIC_API_KEY}&country=${country}&year=${year}`;

  const res = await axios.get(url);
  return res.data.response.holidays;
}
