import { useTimerContext } from "../../contexts/TimerContext";

const ConfirmModal = () => {
  let { dialogRef, setDialogRef, goToNextCycle } = useTimerContext();

  const close = () => {
    dialogRef().close();
  };

  return (
    <dialog
      ref={setDialogRef}
      class="w-48 y-24 bg-black text-sky-500 p-4 rounded border border-sky-500"
    >
      <div class="">
        <p class="text-white">Timer finished!</p>
        <div class="flex flex-row justify-between">
          <button onClick={close}>Close</button>
          <button onClick={goToNextCycle}>Confirm</button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmModal;
