<script lang="ts">
	import { ArrowDownTray, ArrowUturnLeft, Clock, Cog6Tooth, Forward } from '@steeze-ui/heroicons';
	import IconButton from '$lib/components/IconButton.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import { current } from '$lib/global/state.svelte';
	import Timer from './Timer.svelte';

	const schedule = $derived(current.schedule);
</script>

<div class="flex h-full flex-col justify-between">
	<!-- Header -->
	<div class="grid grid-cols-3 items-center justify-center">
		<div class="mr-auto">
			<IconButton label={schedule.name} icon={Clock} />
		</div>
		<button type="button" class="flex flex-row justify-center">
			<Tag label={current.tag} />
		</button>
	</div>

	<!-- Clock -->
	<div class="flex w-fit flex-col justify-center self-center">
		<Timer />
		<span class={'mt-2 text-center text-lg text-white opacity-70'}> Click to start the timer </span>
	</div>

	<!-- Footer -->
	<div class="grid grid-cols-4 items-center justify-center">
		<a href="/settings" class="mr-auto">
			<IconButton label="Settings" icon={Cog6Tooth} />
		</a>
		<div class="col-span-2">
			<div class="flex flex-row justify-center gap-6">
				<IconButton label="Reset" icon={ArrowUturnLeft} />
				<IconButton label="Finish" icon={ArrowDownTray} />
				<IconButton label="Skip" icon={Forward} />
			</div>
		</div>
		<a href="/history" class="ml-auto">
			<div
				class="flex items-center justify-center rounded-full px-2 hover:bg-white hover:bg-opacity-10"
			>
				<span class="text-lg">0</span>
			</div>
		</a>
	</div>
</div>
