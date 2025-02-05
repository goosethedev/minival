import { createSchedule } from '$lib/schedule/schedule.svelte';

export const current = $state({
	schedule: createSchedule(),
	tag: 'Work'
});
