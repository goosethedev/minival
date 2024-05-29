import { Router, Route } from "@solidjs/router";
import { type Component } from "solid-js";

import TimerPage from "./pages/TimerPage/TimerPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";

const App: Component = () => {
  return (
    <div class="w-screen h-screen bg-black text-sky-500">
      <Router>
        <Route path="/" component={TimerPage} />
        <Route path="/history" component={HistoryPage} />
      </Router>
    </div>
  );
};

export default App;
