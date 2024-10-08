import BaseDialog from "@/components/ui/BaseDialog";
import { timer } from "@/stores/timer";
import { createSignal } from "solid-js";

const [timerFinishedRef, setTimerFinishedRef] =
  createSignal<HTMLDialogElement>(null);

export const openTimerFinishedDialog = () => timerFinishedRef().showModal();
export const closeTimerFinishedDialog = () => timerFinishedRef().close();

const TimerFinishedDialog = () => {
  const { toggleTimer } = timer;

  const buttonClass = "uppercase tracking-wider text-sm font-semibold";

  return (
    <BaseDialog ref={setTimerFinishedRef} type="modal">
      <form method="dialog">
        <p class="mb-4 mt-2 text-lg text-white">Timer finished!</p>
        <div class="flex flex-row justify-between gap-6 uppercase text-accent">
          <button onClick={closeTimerFinishedDialog} class={buttonClass}>
            Close
          </button>
          <button onClick={toggleTimer} class={buttonClass}>
            Start next
          </button>
        </div>
      </form>
    </BaseDialog>
  );
};

export default TimerFinishedDialog;
