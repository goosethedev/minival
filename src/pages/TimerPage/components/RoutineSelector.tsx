import { HiOutlineClock } from "solid-icons/hi";

const RoutineSelector = () => {
  const baseClass =
    "w-fit py-1 px-2 border-b-sky-500 text-sky-500 flex flex-row items-center";

  return (
    <div class={baseClass}>
      <span class="text-xl">
        <HiOutlineClock />
      </span>
      <span class="ml-1.5 text-gray-300">Default</span>
    </div>
  );
};

export default RoutineSelector;
