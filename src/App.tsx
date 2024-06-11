import { Router, Route } from "@solidjs/router";
import { Component, Show, createResource, lazy, onCleanup } from "solid-js";

import { PomodoroContextProvider } from "./contexts/PomodoroContext";
import { connectDB, disconnectDB } from "./services/authService";

import TimerPage from "./pages/TimerPage/TimerPage";
const HistoryPage = lazy(() => import("./pages/HistoryPage/HistoryPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage/SettingsPage"));

const App: Component = () => {
  // Set DB connection before loading app
  const [dbConnection] = createResource(async () => {
    return await connectDB({ online: false });
  });

  // When exiting, clean the connection
  onCleanup(async () => await disconnectDB());

  return (
    <div class="w-screen h-screen bg-black text-sky-500">
      <Show
        when={dbConnection.state == "ready"}
        fallback={<div>Loading...</div>}
      >
        <PomodoroContextProvider>
          <Router>
            <Route path="/" component={TimerPage} />
            <Route path="/history" component={HistoryPage} />
            <Route path="/settings" component={SettingsPage} />
          </Router>
        </PomodoroContextProvider>
      </Show>
    </div>
  );
};

export default App;
