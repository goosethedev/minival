import { createSignal, type Component } from "solid-js";
import Timer from "./components/Timer";

const DEFAULT_TIMER_SECONDS = 25 * 60;

const App: Component = () => {
  // Temporary timer
  const [temp, setTemp] = createSignal(DEFAULT_TIMER_SECONDS, {
    equals: false,
  });

  const finished = (runtime: number) => {
    console.log("Timer finished in ", runtime, " seconds");
    setTemp(DEFAULT_TIMER_SECONDS);
  };

  const dropped = (runtime: number) => {
    console.log("Timer dropped in ", runtime, " seconds");
    setTemp(DEFAULT_TIMER_SECONDS);
  };

  return (
    <div class="bg-black w-full h-screen flex flex-col justify-between">
      {/* header working */}
      <div class="bg-sky-500 text-white"></div>
      <div>
        <Timer init_val={temp()} onFinish={finished} onDrop={dropped} />
      </div>
      {/* footer working */}
      <div class="bg-sky-500 text-white"></div>
    </div>
  );
};

export default App;
