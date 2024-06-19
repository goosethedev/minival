import { MultiProvider } from "@solid-primitives/context";
import { Route, Router } from "@solidjs/router";
import { Component, Show, createResource, lazy, onCleanup } from "solid-js";

import { DialogProvider } from "./contexts/DialogContext";
import { TimerProvider } from "./contexts/TimerContext";
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
    <div class="w-screen h-screen bg-background text-white p-4">
      <Show
        when={dbConnection.state == "ready"}
        fallback={<div>Loading...</div>}
      >
        <MultiProvider
          values={[
            DialogProvider, // All dialogs of the app
            TimerProvider, // Timer and schedule operations
          ]}
        >
          <Router>
            <Route path="/" component={TimerPage} />
            <Route path="/history" component={HistoryPage} />
            <Route path="/settings" component={SettingsPage} />
          </Router>
        </MultiProvider>
      </Show>
    </div>
  );
};

export default App;
