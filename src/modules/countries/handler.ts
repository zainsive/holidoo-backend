import { Response } from "express";
import { AppError } from "../../config/app-error";
import axios from "axios";
import { CacheClient } from "../../config/node-cache-client";

export const GetCountriesHandler = async (request: any, response: Response) => {
  const cacheKey = `countries`;

  let countries = CacheClient.get(cacheKey);

  if (!countries) {
    try {
      countries = await getCountries();

      CacheClient.set(cacheKey, countries);
    } catch (error) {
      response
        .status(400)
        .json({ status: 400, message: "Unable to fetch countries." });
    }
  }

  response.send({ status: "success", data: countries });
};

async function getCountries() {
  if (!process.env.CALENDRIFIC_BASE_URL || !process.env.CALENDRIFIC_API_KEY)
    throw AppError.internal("Calendrific api credential missing!");

  const url = `${process.env.CALENDRIFIC_BASE_URL}/countries?api_key=${process.env.CALENDRIFIC_API_KEY}`;

  const res = await axios.get(url);
  return res.data.response.countries;
}
