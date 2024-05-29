import { useTimerContext } from "../contexts/TimerContext";
import { A } from "@solidjs/router";

const PomoCount = () => {
  const { completedPomos } = useTimerContext();

  return (
    <A
      class="flex self-center rounded-full py-2 px-4 text-lg hover:bg-gray-900"
      href="/history"
    >
      {completedPomos() || 0}
    </A>
  );
};

export default PomoCount;
