<script lang="ts">
	import { Icon, type IconSource } from '@steeze-ui/svelte-icon';

	interface Props {
		label: string;
		icon: IconSource;
		onclick?: () => void;
		small?: boolean;
	}

	let { label, icon, onclick, small = false }: Props = $props();
</script>

<button class="flex flex-row items-center" {onclick}>
	<Icon src={icon} class={['text-accent', small ? 'w-6' : 'w-6']} />
	<span class={'hidden sm:block ' + (small ? 'ml-1' : 'ml-1.5')}>
		{label}
	</span>
</button>
