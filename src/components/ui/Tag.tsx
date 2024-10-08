import { Icon } from "solid-heroicons";
import { tag } from "solid-heroicons/outline";

type TagProps = {
  label: string;
  onClick?: () => void;
};

const Tag = (props: TagProps) => {
  return (
    <button
      class="flex flex-row items-center rounded-2xl border border-accent bg-opacity-0 px-2 py-0.5 text-accent"
      onClick={props.onClick}
    >
      <Icon path={tag} class="w-5" />
      <span class="ml-1">{props.label}</span>
    </button>
  );
};

export default Tag;
