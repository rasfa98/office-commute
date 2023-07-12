import { API } from "./types";
import { getRequest, postRequest } from "./utils";

export const generateAccessToken = () => {
  return postRequest<API.GenerateAccessTokenResponse>(
    "/token",
    "grant_type=client_credentials",
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
      )}`,
    }
  );
};

export const getJourneys = async (token: string, reversed?: boolean) => {
  return getRequest<API.JourneysResponse>(
    reversed
      ? `/pr/v4/journeys?&originGid=${process.env.REACT_APP_DESTINATION_ID}&destinationGid=${process.env.REACT_APP_ORIGIN_ID}&limit=4`
      : `/pr/v4/journeys?&originGid=${process.env.REACT_APP_ORIGIN_ID}&destinationGid=${process.env.REACT_APP_DESTINATION_ID}&limit=4`,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};
