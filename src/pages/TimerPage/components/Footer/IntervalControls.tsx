import {
  arrowDownTray,
  arrowUturnLeft,
  forward,
} from "solid-heroicons/outline";

import IconButton from "../../../../components/IconButton";
import { useTimerContext } from "../../../../contexts/TimerContext";

const IntervalControls = () => {
  const { finishInterval, startNextInterval, resetInterval, isTimerPristine } =
    useTimerContext();

  const hideClass = () =>
    " transition-[visibility] " + (isTimerPristine() ? "invisible" : "visible");

  return (
    <div class={"flex flex-row justify-center gap-6" + hideClass()}>
      <IconButton label="Reset" icon={arrowUturnLeft} onClick={resetInterval} />
      <IconButton
        label="Finish"
        icon={arrowDownTray}
        onClick={finishInterval}
      />
      <IconButton
        label="Start next"
        icon={forward}
        onClick={startNextInterval}
      />
    </div>
  );
};

export default IntervalControls;
