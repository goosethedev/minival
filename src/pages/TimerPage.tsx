import { openScheduleManagerDialog } from "@/components/dialogs/ScheduleManagerDialog";
import { openTagManagerDialog } from "@/components/dialogs/TagManagerDialog";
import IconButton from "@/components/ui/IconButton";
import Tag from "@/components/ui/Tag";
import { skipCurrentInterval } from "@/logic/TimerManager";
import { getTodayPomoCount } from "@/services/pomoService";
import { getTags } from "@/services/tagsService";
import { currentTag, setCurrentTag } from "@/stores/app";
import { timer } from "@/stores/timer";
import { A } from "@solidjs/router";
import {
  arrowDownTray,
  arrowUturnLeft,
  clock,
  cog_6Tooth,
  forward,
} from "solid-heroicons/outline";
import { Component, createEffect, createResource } from "solid-js";

const TimerPage: Component = () => {
  const { isTimerActive, isTimerPristine, toggleTimer } = timer;
  const [tags] = createResource(getTags, { initialValue: [] });

  // Set initial tag
  createEffect(() => {
    if (tags().length != 0 && !currentTag()) {
      setCurrentTag(tags()[0]);
    }
  });

  const hideClassOnActive = () =>
    " transition-[visibility] " + (isTimerActive() ? "invisible" : "visible");
  const hideClassOnPristine = () =>
    " transition-[visibility] " + (isTimerPristine() ? "invisible" : "visible");

  return (
    <div class="flex h-full flex-col justify-between">
      {/* Header */}
      <div
        class={
          "grid grid-cols-3 items-center justify-center" + hideClassOnActive()
        }
      >
        <ScheduleButton />
        <TagButton />
      </div>

      {/* Centered timer clock */}
      <div
        class="self-center w-fit flex flex-col justify-center"
        onClick={toggleTimer}
      >
        <TimerClock />
        <span
          class={
            "text-center text-white opacity-70 text-lg mt-2" +
            hideClassOnActive()
          }
        >
          Click to start the timer
        </span>
      </div>

      {/* Footer */}
      <div class="grid grid-cols-4 items-center justify-center">
        <A href="/settings" class={"mr-auto" + hideClassOnActive()}>
          <IconButton label="Settings" icon={cog_6Tooth} />
        </A>
        <div class="col-span-2">
          <div
            class={"flex flex-row justify-center gap-6" + hideClassOnPristine()}
          >
            <IntervalButtons />
          </div>
        </div>
        <A href="/history" class={"ml-auto" + hideClassOnActive()}>
          <PomoCountButton />
        </A>
      </div>
    </div>
  );
};

const ScheduleButton = () => {
  const { currentSchedule } = timer;
  return (
    <div class="mr-auto">
      <IconButton
        label={currentSchedule().name}
        icon={clock}
        onClick={openScheduleManagerDialog}
      />
    </div>
  );
};

const TagButton = () => {
  return (
    <div class="flex flex-row justify-center" onClick={openTagManagerDialog}>
      <Tag label={currentTag()} />
    </div>
  );
};

const TimerClock = () => {
  const { getTimer } = timer;

  // Map timer (seconds) to MM:SS
  const zeroPad = (num: number) => String(num).padStart(2, "0");
  const minutes = () => zeroPad(Math.floor(getTimer() / 60));
  const seconds = () => zeroPad(getTimer() % 60);

  return (
    <div class="text-8xl font-['Roboto_Slab'] text-accent">
      {minutes()}:{seconds()}
    </div>
  );
};

const IntervalButtons = () => {
  const { resetInterval } = timer;
  return (
    <>
      <IconButton label="Reset" icon={arrowUturnLeft} onClick={resetInterval} />
      <IconButton
        label="Finish"
        icon={arrowDownTray}
        onClick={() => skipCurrentInterval(true, false)}
      />
      <IconButton
        label="Skip"
        icon={forward}
        onClick={() => skipCurrentInterval(false, false)}
      />
    </>
  );
};

const PomoCountButton = () => {
  const { getInterval } = timer;
  const [todayPomoCount, { refetch }] = createResource(getTodayPomoCount, {
    initialValue: 0,
  });

  // Refetch pomo count on every interval change
  createEffect(() => {
    getInterval() && refetch();
  });
  return (
    <div class="flex rounded-full justify-center items-center px-2 hover:bg-white hover:bg-opacity-10">
      <span class="text-lg">{todayPomoCount()}</span>
    </div>
  );
};

export default TimerPage;
