import { Icon } from "solid-heroicons";
import { tag } from "solid-heroicons/outline";

type TagProps = {
  label: string;
};

const Tag = (props: TagProps) => {
  return (
    <div class="flex flex-row items-center bg-opacity-0 rounded-2xl py-0.5 px-2 border border-accent text-accent">
      <Icon path={tag} class="w-5" />
      <span class="ml-1">{props.label}</span>
    </div>
  );
};

export default Tag;
