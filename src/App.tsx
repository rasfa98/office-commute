import { useEffect, useState } from "react";
import Departure from "./components/Departure";
import { generateAccessToken, getDepartures } from "./services/api";
import { API } from "./services/types";
import {
  getExpirationDate,
  getStoredTokenData,
  isTokenExpired,
} from "./utils/token";

import "./App.css";

function App() {
  const [departures, setDepartures] = useState<API.Departure[]>([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const getOrCreateToken = async () => {
      const storedTokenData = getStoredTokenData();

      if (storedTokenData && !isTokenExpired(storedTokenData.expires)) {
        return storedTokenData.token;
      }

      const newTokenData = await generateAccessToken();
      const newToken = newTokenData.access_token;

      localStorage.setItem(
        "token",
        JSON.stringify({
          token: newToken,
          expires: getExpirationDate(newTokenData.expires_in),
        })
      );

      return newToken;
    };

    getOrCreateToken().then((token) => setToken(token));
  }, []);

  useEffect(() => {
    const fetchDepartures = async () => {
      const departures = await getDepartures(token);

      setDepartures(departures.results);
    };

    if (token) {
      fetchDepartures();
    }
  }, [token]);

  return (
    <div className="container">
      {departures.map((departure) => (
        <Departure departure={departure} />
      ))}
    </div>
  );
}

export default App;
