import { For, Show, createSignal } from "solid-js";

import { useTimerPageContext } from "../../../contexts/TimerPageContext";
import BaseDialog from "../../../components/BaseDialog";
import Tag from "../../../components/Tag";
import { usePomodoroContext } from "../../../contexts/PomodoroContext";

const TagManagerDialog = () => {
  const { setTagManagerRef } = useTimerPageContext();
  const { globalTags, setCurrentTag } = usePomodoroContext();

  const [search, setSearch] = createSignal("");

  const filteredTags = () =>
    globalTags.filter((tag) =>
      tag.toLowerCase().includes(search().toLowerCase()),
    );

  return (
    <BaseDialog ref={setTagManagerRef} type="panel" header="Choose a tag">
      {/* Container */}
      <div class="flex min-h-60 w-80 flex-col gap-4">
        {/* Input box */}
        <input
          type="text"
          class="w-full rounded-lg border border-white bg-background px-2 py-1.5"
          placeholder="Search"
          onInput={(e) => setSearch(e.target.value)}
        />
        {/* <div class="flex w-full flex-row gap-1 rounded-lg border border-white p-1.5"> */}
        {/*   <input type="text" class="min-w-0 flex-grow bg-background" /> */}
        {/*   <IconButton icon={plus} label="New" small={true} /> */}
        {/* </div> */}

        {/* Tags to pick if there are results to search string */}
        {/* else, create new tag */}
        <Show
          when={search() && filteredTags().length == 0}
          fallback={
            <form method="dialog" class="flex flex-row gap-2">
              <For each={search() ? filteredTags() : globalTags}>
                {(tag) => (
                  <button>
                    <Tag label={tag} onClick={() => setCurrentTag(tag)} />
                  </button>
                )}
              </For>
            </form>
          }
        >
          <p class="text-sm opacity-70">Click on the tag to create it</p>
          <div>
            <Tag label={search()} />
          </div>
        </Show>
      </div>
    </BaseDialog>
  );
};

export default TagManagerDialog;
