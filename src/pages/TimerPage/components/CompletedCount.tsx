import { useTimerContext } from "../../../contexts/TimerContext";

const CompletedCount = () => {
  const { completedPomos } = useTimerContext();

  return (
    <div class="flex rounded-full justify-center items-center px-2 hover:bg-white hover:bg-opacity-10">
      <span class="text-lg">{completedPomos() || 0}</span>
    </div>
  );
};

export default CompletedCount;
