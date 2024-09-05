import { clock } from "solid-heroicons/outline";

import IconButton from "../../../../components/IconButton";
import Tag from "../../../../components/Tag";
import { useDialogContext } from "../../../../contexts/DialogContext";
import { useTimerContext } from "../../../../contexts/TimerContext";

const Header = () => {
  const { openTagManagerDialog, openScheduleManagerDialog } =
    useDialogContext();
  const { isTimerActive, currentTag } = useTimerContext();
  const hideClass = () =>
    " transition-[visibility] " + (isTimerActive() ? "invisible" : "visible");
  return (
    <div class={"grid grid-cols-3 items-center justify-center" + hideClass()}>
      <div class="mr-auto">
        <IconButton
          label="Default"
          icon={clock}
          onClick={openScheduleManagerDialog}
        />
      </div>
      <div class="flex flex-row justify-center" onClick={openTagManagerDialog}>
        <Tag label={currentTag()} />
      </div>
    </div>
  );
};

export default Header;
