import { usePomodoroContext } from "../../../contexts/PomodoroContext";

const Clock = () => {
  const { getTimer, isTimerActive, toggleTimer } = usePomodoroContext();

  // Map timer (seconds) to MM:SS
  const zeroPad = (num: number) => String(num).padStart(2, "0");
  const minutes = () => zeroPad(Math.floor(getTimer() / 60));
  const seconds = () => zeroPad(getTimer() % 60);

  const hideClass = () => " transition-[visibility] " + (isTimerActive() ? "invisible" : "visible");

  return (
    <div class="self-center w-fit flex flex-col justify-center" onClick={toggleTimer}>
      <div class="text-8xl font-['Roboto_Slab'] text-accent">
        {minutes()}:{seconds()}
      </div>
      <span class={"text-center text-white opacity-70 text-lg mt-2" + hideClass()}>
        Click to start the timer
      </span>
    </div>
  );
};

export default Clock;
