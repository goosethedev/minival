import BaseDialog from "../../../components/BaseDialog";
import { useDialogContext } from "../../../contexts/DialogContext";
import { useTimerContext } from "../../../contexts/TimerContext";

const TimerFinishedDialog = () => {
  const { finishInterval, startNextInterval } = useTimerContext();
  const { setTimerFinishedRef } = useDialogContext();

  const buttonClass = "uppercase tracking-wider text-sm font-semibold";

  return (
    <BaseDialog ref={setTimerFinishedRef} type="modal">
      <form method="dialog">
        <p class="mb-4 mt-2 text-lg text-white">Timer finished!</p>
        <div class="flex flex-row justify-between gap-6 uppercase text-accent">
          <button onClick={finishInterval} class={buttonClass}>
            Close
          </button>
          <button onClick={startNextInterval} class={buttonClass}>
            Start next
          </button>
        </div>
      </form>
    </BaseDialog>
  );
};

export default TimerFinishedDialog;
