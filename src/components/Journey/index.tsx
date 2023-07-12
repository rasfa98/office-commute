import { API } from "../../services/types";
import { getDifferenceInMinutes } from "../../utils/date";
import LineNumber from "../LineNumber";
import styles from "./Journey.module.css";

const Journey = ({
  departureTime,
  line,
  label,
  platform,
  isCanceled,
}: {
  departureTime: string;
  label: string;
  line: API.Line;
  platform: string;
  isCanceled: boolean;
}) => {
  const timeUntilDeparture = getDifferenceInMinutes(
    new Date(departureTime),
    new Date()
  );

  return (
    <div className={styles.journey}>
      <LineNumber line={line} />
      {label} ({platform})
      <b>
        {isCanceled
          ? "INSTÄLLD"
          : timeUntilDeparture > 0
          ? `${timeUntilDeparture} min`
          : `NU`}
      </b>
    </div>
  );
};

export default Journey;
