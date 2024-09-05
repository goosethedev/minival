import { A } from "@solidjs/router";
import { cog_6Tooth } from "solid-heroicons/outline";

import IconButton from "../../../../components/IconButton";
import { useTimerContext } from "../../../../contexts/TimerContext";
import CompletedCount from "./CompletedCount";
import IntervalControls from "./IntervalControls";

const Footer = () => {
  const { isTimerActive } = useTimerContext();
  const hideClass = () =>
    " transition-[visibility] " + (isTimerActive() ? "invisible" : "visible");
  return (
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
  );
};

export default Footer;
