import { API } from "../../services/types";
import styles from "./LineNumber.module.css";

const LineNumber = ({ line }: { line: API.Line }) => {
  return (
    <div
      className={styles.lineNumber}
      style={{
        backgroundColor: line.backgroundColor,
        color: line.foregroundColor,
        borderColor: line.borderColor,
      }}
    >
      {line.shortName}
    </div>
  );
};

export default LineNumber;
