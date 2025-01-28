<script lang="ts">
  import {Tag} from "@steeze-ui/heroicons"
  import {Icon} from "@steeze-ui/svelte-icon"

  interface Props {
    label: string,
    onclick: () => void,
  }

  let { label, onclick}: Props = $props();

</script>

<button
  class="flex flex-row items-center rounded-2xl border border-accent bg-opacity-0 px-2 py-0.5 text-accent"
  {onclick}
>
  <Icon src={Tag} class="w-5" />
  <span class="ml-1">{label}</span>
</button>
