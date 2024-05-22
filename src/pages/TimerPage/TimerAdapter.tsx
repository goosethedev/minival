import Timer from "./Timer";
import { useTimerContext } from "../../contexts/TimerContext";

const TimerAdapter = () => {
  const { timeSignal, isActive, setActive, finished } = useTimerContext();

  const showHelp = () => (isActive() ? "text-black" : "text-sky-500");

  return (
    <div
      class="self-center w-fit flex flex-col"
      onClick={() => setActive(!isActive())}
    >
      <Timer timeSignal={timeSignal} onFinish={finished} isActive={isActive} />
      <span class={"text-center transition self-center " + showHelp()}>
        Click to start/pause
      </span>
    </div>
  );
};

export default TimerAdapter;
