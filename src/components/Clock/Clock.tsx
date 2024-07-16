import closeIcon from "../../img/close.svg";
import styles from "./Clock.module.scss";

interface ClockProps {
  name: string;
  hour: number;
  minutes: number;
  seconds: number;
  onClick: () => void;
}

export const Clock = ({name, hour, minutes, seconds, onClick}: ClockProps) => {
  const hourStalk = (hour % 12) * 30 + minutes * 0.5;
  const minStalk = minutes * 6;
  const secStalk = seconds * 6;

  return (
    <div className={styles.wrapper}>
      <p className={styles.name}>{name}</p>

      <div className={styles.watch}>
        <button onClick={onClick} className={styles.close_btn}>
          <img src={closeIcon} alt='close icon' />
        </button>
        <div className={styles.point}></div>
        <div
          className={styles.hour}
          style={{transform: `rotate(${hourStalk}deg)`}}
        ></div>
        <div
          className={styles.min}
          style={{transform: `rotate(${minStalk}deg)`}}
        ></div>
        <div
          className={styles.sec}
          style={{transform: `rotate(${secStalk}deg)`}}
        ></div>
      </div>
    </div>
  );
};
