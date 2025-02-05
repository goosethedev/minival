import { createTimer } from './timer.svelte';

type Interval = {
	type: 'work' | 'break';
	duration: number;
};

const DEFAULT_SCHEDULE: ScheduleBlueprint = {
	name: 'Default',
	work: 25,
	break: 5,
	longBreak: 15,
	intervals: 3
};

export function createSchedule(sb?: ScheduleBlueprint) {
	let schedule = sb || DEFAULT_SCHEDULE;
	let index = $state(0);
	let currentInterval = $derived(buildInterval(index));
	let timer = createTimer(currentInterval.duration, onFinish);

	// TODO: Move as params. Maybe for each work and break finished.
	function onFinish() {
		console.log('Timer finished!');
		index++;
	}

	function buildInterval(idx: number): Interval {
		const limit = schedule.intervals * 2;
		if (idx > limit) idx %= limit;

		let interval: Interval;
		if (idx == limit) interval = { type: 'break', duration: schedule.longBreak };
		else if (idx % 2)
			interval = {
				type: 'break',
				duration: schedule.break
			};
		else
			interval = {
				type: 'work',
				duration: schedule.work
			};

		return interval;
	}

	return {
		get timer() {
			return timer;
		},
		get name() {
			return schedule.name;
		},
		currentInterval,
		nextInterval: () => {
			index++;
			timer.reset(currentInterval.duration);
		}
	};
}
