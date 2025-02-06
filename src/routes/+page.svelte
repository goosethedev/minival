<script lang="ts">
	import { ArrowDownTray, ArrowUturnLeft, Clock, Cog6Tooth, Forward } from '@steeze-ui/heroicons';
	import IconButton from '$lib/components/IconButton.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Timer from './Timer.svelte';
	import { ScheduleManager } from './schedule.svelte';
	import BaseDialog from '$lib/components/BaseDialog.svelte';

	const schedule = new ScheduleManager(() => console.log('Timer finished!'));
	let currentTag = $state('Work');

	let tagDialog = $state() as HTMLDialogElement;

	// TODO: move all of this into a new component
	const allTags = ['Work', 'College', 'Languages', 'Cleaning', 'Coding'];
	const filteredTags = $derived(
		allTags.filter((tag) => tag.toLowerCase().includes(tagSearch.toLowerCase()))
	);
	let tagSearch = $state('');
	// TODO: improve this with form resetting
	const addTag = (newTag: string) => {
		allTags.push(newTag);
		currentTag = newTag;
		tagDialog.close();
		tagSearch = '';
	};
	const selectTag = (tag: string) => {
		currentTag = tag;
		tagDialog.close();
		tagSearch = '';
	};
</script>

<div class="flex h-full flex-col justify-between">
	<!-- Header -->
	<div class="grid grid-cols-3 items-center justify-center">
		<div class="mr-auto">
			<IconButton label={schedule.name} icon={Clock} />
		</div>
		<button type="button" class="flex flex-row justify-center">
			<Tag label={currentTag} onclick={() => tagDialog.showModal()} />
		</button>
	</div>

	<!-- Clock -->
	<div class="flex w-fit flex-col justify-center self-center">
		<Timer timer={schedule.timer} />
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

<BaseDialog bind:dialog={tagDialog} type="panel" header="Choose a tag">
	<!-- Container -->
	<div class="flex min-h-60 w-80 flex-col gap-4">
		<!-- Input box -->
		<input
			type="text"
			class="w-full rounded-lg border border-white bg-background px-2 py-1.5"
			placeholder="Search"
			bind:value={tagSearch}
		/>

		<!-- Tags to pick if there are results to search string. Else, create a new tag -->
		{#if !tagSearch || filteredTags.length > 0}
			<form method="dialog" class="flex flex-row flex-wrap gap-2">
				{#each filteredTags as tag}
					<Tag label={tag} onclick={() => selectTag(tag)} />
				{/each}
			</form>
		{:else}
			<p class="text-sm opacity-70">Click on the tag to create it</p>
			<Tag label={tagSearch} onclick={() => addTag(tagSearch)} />
		{/if}
	</div>
</BaseDialog>
