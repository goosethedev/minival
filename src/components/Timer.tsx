import { createEffect, createSignal, onCleanup, untrack } from "solid-js";

const DEFAULT_TIMER_SECONDS = 25 * 60;

type TimerProps = {
  init_val?: number;
  onFinish: (runtime: number) => void;
  onDrop: (runtime: number) => void;
};

const Timer = (props: TimerProps) => {
  // Current timer value to display
  const [timer, setTimer] = createSignal(
    props.init_val || DEFAULT_TIMER_SECONDS,
  );
  // Total runtime (used when minutes added or skipped/finished early)
  const [runtime, setRuntime] = createSignal(
    props.init_val || DEFAULT_TIMER_SECONDS,
  );
  // Interval that decreases the timer when active
  const [intervalID, setIntervalID] = createSignal(null);

  const zeroPad = (num: number) => String(num).padStart(2, "0");
  const minutes = () => zeroPad(Math.floor(timer() / 60));
  const seconds = () => zeroPad(timer() % 60);

  // Reset timer and pause when a new value is sent
  createEffect(() => {
    // Set interval to null but don't track changes
    untrack(pause);
    // Update only if timer is different than the new value
    if (untrack(timer) !== props.init_val) {
      setTimer(props.init_val);
      setRuntime(props.init_val);
    }
  });

  // Toggle timer (only if timer is not 0)
  const toggle = () => {
    if (timer() > 0) intervalID() ? pause() : start();
  };

  // Start/resume timer (set new interval)
  const start = () => {
    const id = setInterval(() => {
      if (timer() > 1) setTimer((t) => t - 1);
      else {
        setTimer(0);
        clearInterval(id);
        props.onFinish(runtime());
      }
    }, 1000);
    setIntervalID(id);
  };

  // Pause timer (remove running interval)
  const pause = () => {
    clearInterval(intervalID());
    setIntervalID(null);
  };

  // Add one minute to both timer and runtime
  const addOneMinute = () => {
    setTimer((t) => t + 1 * 60);
    setRuntime((t) => t + 1 * 60);
  };

  // Clean interval on unmount
  onCleanup(() => {
    clearInterval(intervalID());
  });

  return (
    <>
      <div
        class="text-sky-500 text-8xl text-center font-extralight"
        onClick={toggle}
      >
        {minutes()}:{seconds()}
      </div>
      <div class="flex flex-row justify-center gap-4 mt-2">
        <button
          class="text-black p-2 px-4 bg-sky-500 rounded"
          onClick={addOneMinute}
        >
          +1 min
        </button>
        <button
          class="text-black p-2 px-4 bg-sky-500 rounded"
          onClick={() => props.onDrop(runtime() - timer())}
        >
          Drop
        </button>
        <button
          class="text-black p-2 px-4 bg-sky-500 rounded"
          onClick={() => props.onFinish(runtime() - timer())}
        >
          Finish
        </button>
      </div>
    </>
  );
};

export default Timer;
