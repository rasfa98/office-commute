import { API } from "./types";
import { getRequest, postRequest } from "./utils";

export const generateAccessToken = () => {
  return postRequest<API.GenerateAccessTokenResponse>(
    "/token",
    "grant_type=client_credentials",
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        `${process.env.REACT_APP_API_CLIENT_ID}:${process.env.REACT_APP_API_CLIENT_SECRET}`
      )}`,
    }
  );
};

export const getDepartures = async (token: string) => {
  return getRequest<API.DeparturesResponse>(
    `/pr/v4/stop-areas/${process.env.REACT_APP_STOP_AREA_ID}/departures?platforms=A`,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};
