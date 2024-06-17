import { Icon } from "solid-heroicons";
import { JSX, ParentProps } from "solid-js";

type IconButtonProps = ParentProps & {
  label: string;
  // Extracted from icon.d.ts of solid-heroicons
  icon: {
    path: JSX.Element;
    outline?: boolean;
    mini?: boolean;
  };
  onClick?: () => void;
};

const IconButton = (props: IconButtonProps) => {
  return (
    <button class="flex flex-row" onClick={props.onClick}>
      <Icon path={props.icon} class="w-6 text-accent" />
      <span class="ml-1.5 hidden sm:block">{props.label}</span>
    </button>
  );
};

export default IconButton;
