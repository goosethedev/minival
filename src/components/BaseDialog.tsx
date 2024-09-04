import { Icon } from "solid-heroicons";
import { xMark } from "solid-heroicons/outline";
import { Component, ParentProps, Setter, Show } from "solid-js";

type Props = ParentProps & {
  ref: Setter<HTMLDialogElement>;
  type: "modal" | "panel" | "toast";
  bgBlur?: boolean;
  header?: string;
};

const BaseDialog: Component<Props> = (props) => {
  const typeClass = () =>
    ({
      modal: "",
      panel: "top-auto rounded-b-none border-b-0",
      toast: "",
    })[props.type];

  return (
    <dialog
      ref={props.ref}
      class={
        "h-fit w-fit rounded-lg border border-white bg-background p-4 text-white " +
        typeClass()
      }
      classList={{ "backdrop:backdrop-blur-sm": props.bgBlur }}
    >
      {/* Header if needed - form needed to close with x icon */}
      <Show when={props.header}>
        <form method="dialog" class="mb-4 flex flex-row justify-between">
          <h1 class="opacity-70">{props.header}</h1>
          <button>
            <Icon path={xMark} class="w-4 text-white opacity-70" />
          </button>
        </form>
      </Show>
      {props.children}
    </dialog>
  );
};

export default BaseDialog;
