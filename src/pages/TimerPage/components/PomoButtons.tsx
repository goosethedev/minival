import { usePomodoroContext } from "../../../contexts/PomodoroContext";

const PomoButtons = () => {
  const { dropCycle, finishCycle, resetCycle, isTimerPristine } =
    usePomodoroContext();

  const hideClass = () => (isTimerPristine() ? "invisible" : "visible");

  return (
    <div
      class={
        "flex flex-row justify-center gap-4 transition-[visibility] " +
        hideClass()
      }
    >
      <Button label="Reset" action={resetCycle} />
      <Button label="Skip" action={dropCycle} />
      <Button label="Finish" action={finishCycle} />
    </div>
  );
};

const Button = (props: { label: string; action: () => void }) => (
  <button
    class="text-sky-500 p-2 border border-sky-500 rounded"
    onClick={props.action}
  >
    {props.label}
  </button>
);

export default PomoButtons;
