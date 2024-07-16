import {useState, useEffect} from "react";
import moment from "moment-timezone";
import {Clock} from "../Clock/Clock";
import styles from "./Watches.module.scss";

interface Watch {
  name: string;
  timezone: string;
  currentHour?: number;
  currentMin?: number;
  currentSec?: number;
}

export const Watches = () => {
  const [clocks, setClocks] = useState<Watch[]>([]);
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("");

  const tick = () => {
    const updatedClocks = clocks.map((clock) => ({
      ...clock,
      currentHour: Number(moment().tz(clock.timezone).format("HH")),
      currentMin: Number(moment().tz(clock.timezone).format("mm")),
      currentSec: Number(moment().tz(clock.timezone).format("ss")),
    }));
    setClocks(updatedClocks);
  };

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [clocks]);

  const addClock = () => {
    if (name === "" || timezone === "") {
      return;
    }
    setClocks([...clocks, {name, timezone}]);
    setName("");
    setTimezone("");
  };

  const removeClock = (index: number) => {
    const updatedClocks = [...clocks];
    updatedClocks.splice(index, 1);
    setClocks(updatedClocks);
  };

  return (
    <div className={styles.container}>
      <div className={styles.date_wrap}>
        <p className={styles.title}>Название</p>
        <p className={styles.title}>Временная зона</p>
      </div>

      <div className={styles.form}>
        <input
          className={styles.input}
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          <option value=''>Выбрать</option>
          {moment.tz.names().map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button className={styles.btn} onClick={addClock}>
          Добавить
        </button>
      </div>

      <div className={styles.clocks_wrapper}>
        {clocks.map((clock, index) => (
          <Clock
            key={index}
            name={clock.name}
            hour={clock.currentHour ?? 0}
            minutes={clock.currentMin ?? 0}
            seconds={clock.currentSec ?? 0}
            onClick={() => removeClock(index)}
          />
        ))}
      </div>
    </div>
  );
};
