import { Portal } from "solid-js/web";
import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { cog_6Tooth } from "solid-heroicons/outline";

import { usePomodoroContext } from "../../contexts/PomodoroContext";
import { useTimerPageContext } from "../../contexts/TimerPageContext";

import RoutineSelector from "./components/RoutineSelector";
import Clock from "./components/Clock";
import PomoCount from "./components/PomoCount";
import PomoButtons from "./components/PomoButtons";
import IconButton from "../../components/IconButton";
import Tag from "../../components/Tag";

import TimerFinishedDialog from "./dialogs/TimerFinishedDialog";
import TagManagerDialog from "./dialogs/TagManagerDialog";

const TimerPage: Component = () => {
  const { openTagManagerDialog } = useTimerPageContext();
  const { isTimerActive, currentTag } = usePomodoroContext();
  const hideClass = () =>
    " transition-[visibility] " + (isTimerActive() ? "invisible" : "visible");

  return (
    <div class="flex h-full flex-col justify-between">
      {/* Dialogs */}
      <Portal>
        <TimerFinishedDialog />
        <TagManagerDialog />
      </Portal>

      {/* Header */}
      <div class={"grid grid-cols-3 items-center justify-center" + hideClass()}>
        <div class="mr-auto">
          <RoutineSelector />
        </div>
        <div
          class="flex flex-row justify-center"
          onClick={openTagManagerDialog}
        >
          <Tag label={currentTag()} />
        </div>
      </div>

      {/* Counter */}
      <Clock />

      {/* Footer */}
      <div class="grid grid-cols-4 items-center justify-center">
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
