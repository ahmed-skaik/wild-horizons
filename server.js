import http from "node:http";

import { getDataFromDB } from "./database/db.js";

import sendJSONResponse from "./util/sendJSONResponse.js";
import getDataByPathParams from "./util/getDataByPathParams.js";
import getDataByQueryParams from "./util/getDataByQueryParams.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();

  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const queryObj = Object.fromEntries(urlObj.searchParams);

  if (urlObj.pathname === "/api" && req.method === "GET") {
    let filteredDestinations = getDataByQueryParams(destinations, queryObj);

    console.log(queryObj);

    sendJSONResponse(res, 200, filteredDestinations);
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const continent = req.url.split("/").pop();
    const filteredContinent = getDataByPathParams(
      destinations,
      "continent",
      continent,
    );
    sendJSONResponse(res, 200, filteredContinent);
  } else if (req.url.startsWith("/api/country") && req.method === "GET") {
    const country = req.url.split("/").pop();
    const filteredCountries = getDataByPathParams(
      destinations,
      "country",
      country,
    );
    sendJSONResponse(res, 200, filteredCountries);
  } else {
    sendJSONResponse(res, 404, {
      error: "not found",
      message: "The requested route does not exist",
    });
  }
});

server.listen(PORT, () =>
  console.log(
    `This Server runs on port: (${PORT}) \nLink: http://localhost:${PORT}`,
  ),
);
