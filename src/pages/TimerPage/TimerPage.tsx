import { Component } from "solid-js";
import { A } from "@solidjs/router";

import { HiSolidTag, HiOutlineCog } from "solid-icons/hi";

import RoutineSelector from "./components/RoutineSelector";
import Clock from "./components/Clock";
import PomoCount from "./components/PomoCount";
import PomoButtons from "./components/PomoButtons";
import TimerFinishedDialog from "./dialogs/TimerFinishedDialog";
import { usePomodoroContext } from "../../contexts/PomodoroContext";

const TimerPage: Component = () => {
  return (
    <div class="h-full flex flex-col justify-between">
      {/* Dialogs */}
      <TimerFinishedDialog />

      {/* Page body */}
      <Header />
      <Clock />
      <Footer />
    </div>
  );
};

const Header = () => {
  const { isTimerActive } = usePomodoroContext();
  const hideClass = () => (isTimerActive() ? "invisible" : "visible");
  return (
    <div
      class={
        "grid grid-cols-3 justify-center p-2 transition-[visibility] " +
        hideClass()
      }
    >
      <div class="mr-auto">
        <RoutineSelector />
      </div>
      <div class="flex flex-row justify-center items-center">
        <span class="flex flex-row items-center bg-sky-500 text-black rounded-xl py-0.5 px-2 text-sm">
          <HiSolidTag />
          <span class="ml-1.5">No Tag</span>
        </span>
      </div>
    </div>
  );
};

const Footer = () => {
  const { isTimerActive } = usePomodoroContext();
  const hideClass = () => (isTimerActive() ? "invisible" : "visible");

  return (
    <div class="grid grid-cols-3 justify-center p-2">
      <A
        href="/settings"
        class={
          "mr-auto flex items-center transition-[visibility] " + hideClass()
        }
      >
        <HiOutlineCog class="text-3xl mx-1" />
      </A>
      <div class="">
        <PomoButtons />
      </div>
      <A
        href="/history"
        class={"ml-auto transition-[visibility] " + hideClass()}
      >
        <PomoCount />
      </A>
    </div>
  );
};

export default TimerPage;
