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

export const getJourneys = async (token: string, position: API.Position) => {
  return getRequest<API.JourneysResponse>(
    `/pr/v4/journeys?originLatitude=${position.latitude}&originLongitude=${position.longitude}&destinationGid=${process.env.REACT_APP_DESTINATION_ID}&transportModes=tram&limit=10`,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};
