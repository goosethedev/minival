<script lang="ts">
	import { current } from '$lib/global/state.svelte';

	const timer = $derived(current.schedule.timer);
	const formattedTime = $derived(formatSeconds(timer.time));

	function formatSeconds(seconds: number) {
		const zeroPad = (num: number) => String(num).padStart(2, '0');
		const mm = Math.floor(seconds / 60);
		const ss = seconds % 60;
		return `${zeroPad(mm)}:${zeroPad(ss)}`;
	}
</script>

<button type="button" class="font-['Roboto_Slab'] text-8xl text-accent" onclick={timer.toggle}>
	{formattedTime}
</button>
