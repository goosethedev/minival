<script lang="ts">
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { HTMLDialogAttributes } from 'svelte/elements';

	interface Props extends HTMLDialogAttributes {
		type: 'modal' | 'panel' | 'toast';
		dialog: HTMLDialogElement;
		header?: string;
		bgBlur?: boolean;
	}

	let { type, header, children, bgBlur, dialog = $bindable() }: Props = $props();
	const typeClass = {
		modal: '',
		panel: 'top-auto rounded-b-none border-b-0',
		toast: ''
	}[type];
</script>

<dialog
	bind:this={dialog}
	class={[
		'h-fit w-fit rounded-lg border border-white bg-background p-4 text-white',
		typeClass,
		bgBlur ? 'backdrop-blur-sm' : ''
	]}
>
	<!-- Header if needed - form needed to close with x icon -->
	{#if header}
		<form method="dialog" class="mb-4 flex flex-row justify-between">
			<h1 class="opacity-70">{header}</h1>
			<button>
				<Icon src={XMark} class="w-4 text-white opacity-70" />
			</button>
		</form>
	{/if}
	{@render children?.()}
</dialog>
