import { useTimerContext } from "../contexts/TimerContext";

const Clock = () => {
  const { getTimer, isTimerActive, toggleTimer } = useTimerContext();

  // Map timer (seconds) to MM:SS
  const zeroPad = (num: number) => String(num).padStart(2, "0");
  const minutes = () => zeroPad(Math.floor(getTimer() / 60));
  const seconds = () => zeroPad(getTimer() % 60);

  const showHelp = () => (isTimerActive() ? "text-black" : "text-sky-500");

  return (
    <div class="self-center w-fit flex flex-col" onClick={toggleTimer}>
      <div class="text-sky-500 text-8xl text-center font-extralight">
        {minutes()}:{seconds()}
      </div>
      <span class={"text-center transition self-center " + showHelp()}>
        Click to start/pause
      </span>
    </div>
  );
};

export default Clock;
