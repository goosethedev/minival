import { usePomodoroContext } from "../../../contexts/PomodoroContext";

const PomoCount = () => {
  const { completedPomos } = usePomodoroContext();

  return (
    <div class="flex self-center rounded-full py-2 px-4 text-lg hover:bg-gray-900">
      {completedPomos() || 0}
    </div>
  );
};

export default PomoCount;
