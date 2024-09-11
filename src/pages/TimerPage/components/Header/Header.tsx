import { clock } from "solid-heroicons/outline";
import { createEffect, createResource } from "solid-js";

import IconButton from "../../../../components/IconButton";
import Tag from "../../../../components/Tag";
import { useDialogContext } from "../../../../contexts/DialogContext";
import { useTimerContext } from "../../../../contexts/TimerContext";
import { getTags } from "../../../../services/tagsService";

const Header = () => {
  const { openTagManagerDialog, openScheduleManagerDialog } =
    useDialogContext();
  const { isTimerActive, currentTag, setCurrentTag } = useTimerContext();

  const [tags] = createResource(getTags, { initialValue: [] });

  createEffect(() => {
    if (tags.length != 0) {
      setCurrentTag(tags()[0]);
    }
  });

  const hideClass = () =>
    " transition-[visibility] " + (isTimerActive() ? "invisible" : "visible");
  return (
    // Current schedule
    <div class={"grid grid-cols-3 items-center justify-center" + hideClass()}>
      <div class="mr-auto">
        <IconButton
          label="Default"
          icon={clock}
          onClick={openScheduleManagerDialog}
        />
      </div>

      {/* Current tag */}
      <div class="flex flex-row justify-center" onClick={openTagManagerDialog}>
        <Tag label={currentTag()} />
      </div>
    </div>
  );
};

export default Header;
