import { API } from "../../services/types";
import { getDifferenceInMinutes } from "../../utils/date";
import LineNumber from "../LineNumber";
import Skeleton from "../Skeleton";
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
  platform?: string;
  isCanceled: boolean;
}) => {
  const timeUntilDeparture = getDifferenceInMinutes(
    new Date(departureTime),
    new Date()
  );

  return (
    <div className={styles.journey}>
      <LineNumber line={line} />
      {label} {platform && `(${platform})`}
      <b>
        {isCanceled
          ? "INSTÄLLD"
          : timeUntilDeparture > 0
          ? `${timeUntilDeparture} MIN`
          : `NU`}
      </b>
    </div>
  );
};

Journey.Skeleton = () => {
  return (
    <div className={styles.journey}>
      <Skeleton />
    </div>
  );
};

export default Journey;
