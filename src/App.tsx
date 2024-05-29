import { Router, Route } from "@solidjs/router";
import { Show, createResource, onCleanup, type Component } from "solid-js";

import TimerPage from "./pages/TimerPage/TimerPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import { connectDB, disconnectDB } from "./services/authService";
import { PomodoroContextProvider } from "./contexts/PomodoroContext";

const App: Component = () => {
  // Set DB connection before loading app
  const [dbConnection] = createResource(async () => {
    return await connectDB({ online: false });
  });

  // When exiting, clean the connection
  onCleanup(async () => await disconnectDB());

  return (
    <Show when={dbConnection.state == "ready"} fallback={<div>Loading...</div>}>
      <PomodoroContextProvider>
        <div class="w-screen h-screen bg-black text-sky-500">
          <Router>
            <Route path="/" component={TimerPage} />
            <Route path="/history" component={HistoryPage} />
          </Router>
        </div>
      </PomodoroContextProvider>
    </Show>
  );
};

export default App;
