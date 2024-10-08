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
  small?: boolean;
};

const IconButton = (props: IconButtonProps) => {
  return (
    <button class="flex flex-row items-center" onClick={props.onClick}>
      <Icon
        path={props.icon}
        class={"text-accent " + (props.small ? "w-6" : "w-6")}
      />
      <span class={"hidden sm:block " + (props.small ? "ml-1" : "ml-1.5")}>
        {props.label}
      </span>
    </button>
  );
};

export default IconButton;
