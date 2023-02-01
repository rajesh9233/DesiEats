import { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({ totalSec,timerState,getTimer }) => {
  const countRef = useRef("");
  const [restart, setRestart] = useState(true);
  const [timee, setTime] = useState(Date.now() + totalSec);
  // console.log(api);
  const resendVerificationCode = (e, apiii) => {
    e.preventDefault();
    setTime(Date.now() + totalSec);
    // apiii.start();
  };

  const renderer = ({ hours, minutes, seconds, completed, api }) => {
    if (completed) {
      // console.log(api);
      return (
        <div>
          <a onClick={(e) => resendVerificationCode(e, api)}>Resend OTP</a>
        </div>
      );
    } else {
      return (
        <div>
          <span>{minutes > 9 ? minutes : `0 ${minutes}`}</span>
          <span>{" : "}</span>
          <span>{seconds > 9 ? seconds : `0 ${seconds}`}</span>
        </div>
      );
    }
  };

  useEffect(() => {
    if (restart) {
      countRef?.current?.start();
    }
  }, [restart, timee]);

  return (
    <Countdown
      date={timee}
      renderer={renderer}
      autoStart={false}
      ref={countRef}
    
    ></Countdown>
  );
};

export default CountdownTimer;
