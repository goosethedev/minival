import { Route, Router } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import { Portal } from "solid-js/web";
import ScheduleManagerDialog from "./components/dialogs/ScheduleManagerDialog";
import TagManagerDialog from "./components/dialogs/TagManagerDialog";
import TimerFinishedDialog from "./components/dialogs/TimerFinishedDialog";
import TimerPage from "./pages/TimerPage";

const HistoryPage = lazy(() => import("@/pages/HistoryPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

const App: Component = () => {
  return (
    <div class="w-screen h-screen bg-background text-white p-4">
      {/* Dialogs */}
      <Portal>
        <TagManagerDialog />
        <TimerFinishedDialog />
        <ScheduleManagerDialog />
      </Portal>

      {/* Pages */}
      <Router>
        <Route path="/" component={TimerPage} />
        <Route path="/history" component={HistoryPage} />
        <Route path="/settings" component={SettingsPage} />
      </Router>
    </div>
  );
};

export default App;
