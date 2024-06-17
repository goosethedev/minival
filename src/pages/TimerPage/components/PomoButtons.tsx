import { arrowDownTray, arrowUturnLeft, forward } from "solid-heroicons/outline";

import IconButton from "../../../components/IconButton";
import { usePomodoroContext } from "../../../contexts/PomodoroContext";

const PomoButtons = () => {
  const { dropCycle, finishCycle, resetCycle, isTimerPristine } =
    usePomodoroContext();

  const hideClass = () => " transition-[visibility] " + (isTimerPristine() ? "invisible" : "visible");

  return (
    <div class={"flex flex-row justify-center gap-6" + hideClass()}>
      <IconButton label="Reset" icon={arrowUturnLeft} onClick={resetCycle} />
      <IconButton label="Finish" icon={arrowDownTray} onClick={dropCycle} />
      <IconButton label="Start next" icon={forward} onClick={finishCycle} />
    </div>
  );
};

export default PomoButtons;
