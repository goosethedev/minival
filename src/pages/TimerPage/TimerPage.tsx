import { Portal } from "solid-js/web";
import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { cog_6Tooth } from "solid-heroicons/outline";

import { usePomodoroContext } from "../../contexts/PomodoroContext";
import RoutineSelector from "./components/RoutineSelector";
import Clock from "./components/Clock";
import PomoCount from "./components/PomoCount";
import PomoButtons from "./components/PomoButtons";
import TimerFinishedDialog from "./dialogs/TimerFinishedDialog";
import IconButton from "../../components/IconButton";
import Tag from "../../components/Tag";

const TimerPage: Component = () => {
  const { isTimerActive } = usePomodoroContext();
  const hideClass = () => " transition-[visibility] " + (isTimerActive() ? "invisible" : "visible");

  return (
    <div class="h-full flex flex-col justify-between">
      {/* Dialogs */}
      <Portal>
        <TimerFinishedDialog />
      </Portal>

      {/* Header */}
      <div class={"grid grid-cols-3 justify-center items-center" + hideClass()}>
        <div class="mr-auto">
          <RoutineSelector />
        </div>
        <div class="flex flex-row justify-center">
          <Tag label="Work" />
        </div>
      </div>

      {/* Counter */}
      <Clock />

      {/* Footer */}
      <div class="grid grid-cols-4 justify-center items-center">
        <A href="/settings" class={"mr-auto" + hideClass()}>
          <IconButton label="Settings" icon={cog_6Tooth} />
        </A>
        <div class="col-span-2">
          <PomoButtons />
        </div>
        <A href="/history" class={"ml-auto" + hideClass()}>
          <PomoCount />
        </A>
      </div>
    </div>
  );
};

export default TimerPage;
