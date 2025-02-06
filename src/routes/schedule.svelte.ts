import { onDestroy } from 'svelte';

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

// Singleton class to manage the schedule with a timer inside
export class ScheduleManager {
	#schedule: ScheduleBlueprint = $state(DEFAULT_SCHEDULE);
	#index: number = $state(0);
	#currentInterval: Interval = $derived(this.#buildInterval(this.#index));
	#timer = $state() as ReturnType<typeof createTimer>;

	constructor(onFinish: () => void) {
		$effect.pre(() => {
			this.#timer = createTimer(this.#currentInterval.duration * 60, onFinish);
		});
	}

	get name() {
		return this.#schedule.name;
	}
	get timer() {
		return this.#timer;
	}

	setSchedule(schedule: ScheduleBlueprint) {
		this.#schedule = schedule;
		this.#index = 0;
	}

	#buildInterval(idx: number): Interval {
		const limit = this.#schedule.intervals * 2;
		if (idx > limit) idx %= limit;

		let interval: Interval;
		if (idx == limit) interval = { type: 'break', duration: this.#schedule.longBreak };
		else if (idx % 2)
			interval = {
				type: 'break',
				duration: this.#schedule.break
			};
		else
			interval = {
				type: 'work',
				duration: this.#schedule.work
			};

		return interval;
	}
}

// Timer that decreases one second at a time
function createTimer(initialTime: number, onFinish: () => void) {
	let time = $state(initialTime);
	let isRunning = $state(false);
	let interval: number | null = null;

	function start() {
		interval = setInterval(() => {
			if (time > 1) time--;
			else {
				time = 0;
				isRunning = false;
				onFinish();
			}
		}, 1000);
	}

	function pause() {
		clearInterval(interval!);
		interval = null;
	}

	$effect(() => (isRunning ? start() : pause()));
	onDestroy(() => pause());

	return {
		get time() {
			return time;
		},
		get isRunning() {
			return isRunning;
		},
		pause: () => (isRunning = false),
		resume: () => (isRunning = true),
		toggle: () => (isRunning = !isRunning),
		reset: (newTime?: number) => {
			time = newTime || initialTime;
		}
	};
}
