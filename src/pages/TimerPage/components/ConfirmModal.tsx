import { useTimerContext } from "../contexts/TimerContext";

const ConfirmModal = () => {
  let { setDialogRef, finishCycle, startNextCycle } = useTimerContext();

  return (
    <dialog
      ref={setDialogRef}
      class="w-48 y-24 bg-black text-sky-500 p-4 rounded border border-sky-500"
    >
      <div class="">
        <p class="text-white">Timer finished!</p>
        <div class="flex flex-row justify-between uppercase">
          <button onClick={finishCycle}>Close</button>
          <button onClick={startNextCycle}>Start next</button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmModal;
