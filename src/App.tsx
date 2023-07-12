import { useEffect, useState } from "react";
import Journey from "./components/Journey";
import { generateAccessToken, getJourneys } from "./services/api";
import { API } from "./services/types";
import {
  getExpirationDate,
  getStoredTokenData,
  isTokenExpired,
} from "./utils/token";

import "./App.css";

function App() {
  const [position, setPosition] = useState<API.Position>();
  const [journeys, setJourneys] = useState<API.Journey[]>([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const getUserPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (data: GeolocationPosition) =>
          setPosition({
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          }),
        (err) => console.log(err)
      );
    };

    getUserPosition();
  }, []);

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
    const fetchJourneys = async () => {
      const journeys = await getJourneys(token, position!);

      setJourneys(journeys.results);
    };

    if (token && position) {
      fetchJourneys();
    }
  }, [token, position]);

  return (
    <div className="container">
      {journeys.map((journey) => (
        <Journey
          key={journey.detailsReference}
          line={journey.tripLegs[0].serviceJourney.line}
          label={journey.tripLegs[0].origin.stopPoint.name}
          platform={journey.tripLegs[0].origin.stopPoint.platform}
          departureTime={
            journey.tripLegs[0].estimatedOtherwisePlannedDepartureTime
          }
          isCanceled={journey.tripLegs[0].isCancelled}
        />
      ))}
    </div>
  );
}

export default App;
