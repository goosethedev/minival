import { Component } from "solid-js";
import { Portal } from "solid-js/web";

import Clock from "./components/Clock";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header";
import ScheduleManagerDialog from "./dialogs/ScheduleManagerDialog";
import TagManagerDialog from "./dialogs/TagManagerDialog";
import TimerFinishedDialog from "./dialogs/TimerFinishedDialog";

const TimerPage: Component = () => {
  return (
    <div class="flex h-full flex-col justify-between">
      {/* Dialogs */}
      <Portal>
        <TimerFinishedDialog />
        <TagManagerDialog />
        <ScheduleManagerDialog />
      </Portal>

      {/* Header: Schedule selector | Tag selector */}
      {/* Clock at middle of screen */}
      {/* Footer: Settings button | Timer buttons | Pomo counter */}
      <Header />
      <Clock />
      <Footer />
    </div>
  );
};

export default TimerPage;
