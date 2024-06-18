import BaseDialog from "../../../components/BaseDialog";
import { usePomodoroContext } from "../../../contexts/PomodoroContext";
import { useTimerPageContext } from "../../../contexts/TimerPageContext";

const TimerFinishedDialog = () => {
  const { finishCycle, startNextCycle } = usePomodoroContext();
  const { setTimerFinishedRef } = useTimerPageContext();

  const buttonClass = "uppercase tracking-wider text-sm font-semibold";

  return (
    <BaseDialog ref={setTimerFinishedRef} type="modal">
      <div class="">
        <p class="mb-4 mt-2 text-lg text-white">Timer finished!</p>
        <div class="flex flex-row justify-between gap-6 uppercase text-accent">
          <button onClick={finishCycle} class={buttonClass}>
            Close
          </button>
          <button onClick={startNextCycle} class={buttonClass}>
            Start next
          </button>
        </div>
      </div>
    </BaseDialog>
  );
};

export default TimerFinishedDialog;
