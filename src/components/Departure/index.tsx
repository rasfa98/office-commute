import { API } from "../../services/types";
import { getDifferenceInMinutes } from "../../utils/date";
import LineNumber from "../LineNumber";
import styles from "./Departure.module.css";

const Departure = ({ departure }: { departure: API.Departure }) => {
  const timeUntilDeparture = getDifferenceInMinutes(
    new Date(departure.estimatedOtherwisePlannedTime),
    new Date()
  );

  return (
    <div className={styles.departure}>
      <LineNumber line={departure.serviceJourney.line} />
      {departure.serviceJourney.direction} ({departure.stopPoint.platform})
      <b>{timeUntilDeparture > 0 ? `${timeUntilDeparture} min` : `NU`}</b>
    </div>
  );
};

export default Departure;
