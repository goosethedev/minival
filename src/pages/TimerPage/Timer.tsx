import {
  Accessor,
  Signal,
  createEffect,
  createSignal,
  onCleanup,
} from "solid-js";

type TimerProps = {
  timeSignal: Signal<number>;
  isActive: Accessor<boolean>;
  onFinish: () => void;
};

const Timer = (props: TimerProps) => {
  // Recompose time signal from prop
  const [timer, setTimer] = props.timeSignal;
  // Interval that decreases the timer when active
  const [intervalID, setIntervalID] = createSignal(null);

  // Map timer (seconds) to MM:SS
  const zeroPad = (num: number) => String(num).padStart(2, "0");
  const minutes = () => zeroPad(Math.floor(timer() / 60));
  const seconds = () => zeroPad(timer() % 60);

  // Effect when isActive is changed
  createEffect(() => {
    props.isActive() ? start() : pause();
  });

  // Clean interval on unmount
  onCleanup(() => {
    clearInterval(intervalID());
  });

  // Start/resume timer (set new interval)
  const start = () => {
    const id = setInterval(() => {
      if (timer() > 1) setTimer((t) => t - 1);
      else {
        setTimer(0);
        clearInterval(id);
        props.onFinish();
      }
    }, 1000);
    setIntervalID(id);
  };

  // Pause timer (remove running interval)
  const pause = () => {
    clearInterval(intervalID());
    setIntervalID(null);
  };

  return (
    <div class="text-sky-500 text-8xl text-center font-extralight">
      {minutes()}:{seconds()}
    </div>
  );
};

export default Timer;
