import { API } from "../services/types";

export const isTokenExpired = (expirationDate: Date) => {
  return new Date() >= new Date(expirationDate);
};

export const getExpirationDate = (expiresIn: number) => {
  const date = new Date();

  date.setSeconds(date.getSeconds() + expiresIn);

  return date;
};

export const getStoredTokenData = (): API.AccessToken | null => {
  try {
    return JSON.parse(localStorage.getItem("token") || "");
  } catch {
    return null;
  }
};
