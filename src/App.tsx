import { useEffect, useState } from "react";
import Journey from "./components/Journey";
import { generateAccessToken, getJourneys } from "./services/api";
import { API } from "./services/types";
import { NUMBER_OF_JOURNEYS } from "./utils/constants";
import {
  getExpirationDate,
  getStoredTokenData,
  isTokenExpired,
} from "./utils/token";

import "./App.css";

function App() {
  const [reversed, setReversed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    getOrCreateToken().then((token) => setToken(token));
  }, []);

  useEffect(() => {
    const fetchJourneys = async () => {
      const journeys = await getJourneys(token, reversed, NUMBER_OF_JOURNEYS);

      setJourneys(journeys.results);
      setIsLoading(false);
    };

    if (token) {
      setIsLoading(true);
      fetchJourneys();
    }
  }, [token, reversed]);

  return (
    <div className="App">
      <div className="journeys">
        {isLoading
          ? new Array(NUMBER_OF_JOURNEYS)
              .fill(null)
              .map((_, index) => <Journey.Skeleton key={index} />)
          : journeys.map((journey) => {
              const departure = journey.tripLegs[0];

              return (
                <Journey
                  key={journey.detailsReference}
                  line={departure.serviceJourney.line}
                  label={departure.serviceJourney.direction}
                  platform={departure.origin.stopPoint.platform}
                  departureTime={
                    departure.estimatedOtherwisePlannedDepartureTime
                  }
                  isCanceled={departure.isCancelled}
                />
              );
            })}
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
