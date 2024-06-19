import { A } from "@solidjs/router";
import { clock, cog_6Tooth } from "solid-heroicons/outline";
import { Component } from "solid-js";
import { Portal } from "solid-js/web";

import { useDialogContext } from "../../contexts/DialogContext";
import { useTimerContext } from "../../contexts/TimerContext";

import IconButton from "../../components/IconButton";
import Tag from "../../components/Tag";
import Clock from "./components/Clock";
import CompletedCount from "./components/CompletedCount";
import IntervalControls from "./components/IntervalControls";

import TagManagerDialog from "./dialogs/TagManagerDialog";
import TimerFinishedDialog from "./dialogs/TimerFinishedDialog";

const TimerPage: Component = () => {
  const { openTagManagerDialog } = useDialogContext();
  const { isTimerActive, currentTag } = useTimerContext();
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
          <IconButton label="Default" icon={clock} />
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
          <IntervalControls />
        </div>
        <A href="/history" class={"ml-auto" + hideClass()}>
          <CompletedCount />
        </A>
      </div>
    </div>
  );
};

export default TimerPage;
