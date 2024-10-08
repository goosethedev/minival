import BaseDialog from "@/components/ui/BaseDialog";
import Tag from "@/components/ui/Tag";
import { insertTag, searchTags } from "@/services/tagsService";
import { setCurrentTag } from "@/stores/app";
import { createSignal, For, Show } from "solid-js";

const [tagManagerRef, setTagManagerRef] = createSignal<HTMLDialogElement>(null);

export const openTagManagerDialog = () => tagManagerRef().showModal();
export const closeTagManagerDialog = () => tagManagerRef().close();

const TagManagerDialog = () => {
  const [searchInput, setSearchInput] = createSignal("");
  const filteredTags = () => searchTags(searchInput());

  const addTag = () => {
    insertTag(searchInput());
    setCurrentTag(searchInput());
  };

  return (
    <BaseDialog ref={setTagManagerRef} type="panel" header="Choose a tag">
      {/* Container */}
      <div class="flex min-h-60 w-80 flex-col gap-4">
        {/* Input box */}
        <input
          type="text"
          class="w-full rounded-lg border border-white bg-background px-2 py-1.5"
          placeholder="Search"
          onInput={(e) => setSearchInput(e.target.value)}
        />

        {/* Tags to pick if there are results to search string */}
        {/* else, create new tag */}
        <Show
          when={searchInput() && filteredTags().length == 0}
          fallback={
            <form method="dialog" class="flex flex-row gap-2">
              <For each={filteredTags()}>
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
          <div onclick={addTag}>
            <Tag label={searchInput()} />
          </div>
        </Show>
      </div>
    </BaseDialog>
  );
};

export default TagManagerDialog;
