import { useTimer } from "react-timer-hook";
import "../components/Timer.css";
function Timer({ expiryTimestamp }) {
  const time = new Date("2022-12-12");

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <>
      <div>
        <h1>Countdown</h1>
        <div className="countdown-wrapper">
          <div className="countdown-item">
            {days}
            <span>days</span>
          </div>
          <div className="countdown-item">
            {hours}
            <span>hours</span>
          </div>
          <div className="countdown-item">
            {minutes}
            <span>minutes</span>
          </div>
          <div className="countdown-item">
            {seconds}
            <span>seconds</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default function MyTimer() {
  const time = new Date("2022-12-12");

  return (
    <div>
      <Timer expiryTimestamp={time} />
    </div>
  );
}
