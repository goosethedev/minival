import { Component } from "solid-js";
import { A } from "@solidjs/router";

import RoutineSelector from "./components/RoutineSelector";
import Clock from "./components/Clock";
import PomoCount from "./components/PomoCount";
import PomoButtons from "./components/PomoButtons";
import TimerFinishedDialog from "./dialogs/TimerFinishedDialog";

const TimerPage: Component = () => {
  return (
    <div class="h-full flex flex-col justify-between">
      {/* Modal to show when timer finishes */}
      <TimerFinishedDialog />

      {/* Header */}
      <div class="">
        <RoutineSelector />
      </div>

      {/* Center */}
      <Clock />

      {/* Footer */}
      <div class="grid grid-cols-3 justify-center p-2">
        <A href="/settings" class="mr-auto">
          Go to Settings
        </A>
        <div class="">
          <PomoButtons />
        </div>
        <A href="/history" class="ml-auto">
          <PomoCount />
        </A>
      </div>
    </div>
  );
};

export default TimerPage;
