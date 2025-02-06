<script lang="ts">
	import { Tag } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		label: string;
	}

	let { label, onclick }: Props = $props();
</script>

<button
	class="flex w-fit flex-row items-center rounded-2xl border border-accent bg-opacity-0 px-2 py-0.5 text-accent"
	{onclick}
>
	<Icon src={Tag} class="w-5" />
	<span class="ml-1.5">{label}</span>
</button>
