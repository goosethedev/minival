import {
  Accessor,
  Signal,
  createEffect,
  createSignal,
  onCleanup,
} from "solid-js";

type CreateTimer = (
  initialTime: number,
  onFinish: () => void,
) => [
    Accessor<number>, // timer
    (newValue: number) => void, // reset
    Signal<boolean>, // [isActive, setActive]
  ];

// IMPORTANT: initialTime in seconds
const createTimer: CreateTimer = (initialTime, onFinish) => {
  // Real-time timer
  const [timer, setTimer] = createSignal(initialTime);
  // Interval that decreases the timer when active
  const [intervalID, setIntervalID] = createSignal(null);
  // Control pause/resume
  const [isActive, setActive] = createSignal(false);

  // Toggle timer on isActive signal update
  createEffect(() => (isActive() ? start() : pause()));

  // Reset timer on initialTime change
  createEffect(() => reset(initialTime));

  // Pause the timer (remove decreasing interval)
  const pause = () => {
    clearInterval(intervalID());
    setIntervalID(null);
  };

  // Start/resume the timer
  const start = () => {
    const id = setInterval(() => {
      if (timer() > 1) setTimer((t) => t - 1);
      else {
        // Pause and finish the timer
        setTimer(0);
        setActive(false);
        onFinish();
      }
    }, 1000);
    setIntervalID(id);
  };

  // Reset timer (also pauses the timer)
  const reset = (newTime: number) => {
    setTimer(newTime);
    setActive(false);
  };

  // Remove interval on unmount
  onCleanup(() => pause());

  // Signal public API
  return [timer, reset, [isActive, setActive]];
};

export default createTimer;
