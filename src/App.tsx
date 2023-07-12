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
  const [reversed, setReversed] = useState(false);

  const [journeys, setJourneys] = useState<API.Journey[]>([]);
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
    const fetchJourneys = async () => {
      const journeys = await getJourneys(token, reversed);

      setJourneys(journeys.results);
    };

    if (token) {
      fetchJourneys();
    }
  }, [token, reversed]);

  return (
    <div className="App">
      <div className="journeys">
        {journeys.map((journey) => (
          <Journey
            key={journey.detailsReference}
            line={journey.tripLegs[0].serviceJourney.line}
            label={journey.tripLegs[0].serviceJourney.direction}
            platform={journey.tripLegs[0].origin.stopPoint.platform}
            departureTime={
              journey.tripLegs[0].estimatedOtherwisePlannedDepartureTime
            }
            isCanceled={journey.tripLegs[0].isCancelled}
          />
        ))}
      </div>
      <button onClick={() => setReversed(!reversed)}>
        {reversed ? (
          <span>Let's get to work! &#128170;</span>
        ) : (
          <span>I wanna go home &#128526;</span>
        )}
      </button>
    </div>
  );
}

export default App;
