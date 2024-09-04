import { MultiProvider } from "@solid-primitives/context";
import { Route, Router } from "@solidjs/router";
import { Component, lazy } from "solid-js";

import { DialogProvider } from "./contexts/DialogContext";
import { TimerProvider } from "./contexts/TimerContext";

import TimerPage from "./pages/TimerPage/TimerPage";
const HistoryPage = lazy(() => import("./pages/HistoryPage/HistoryPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage/SettingsPage"));

const App: Component = () => {
  return (
    <div class="w-screen h-screen bg-background text-white p-4">
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
    </div>
  );
};

export default App;
