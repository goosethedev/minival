import { onDestroy } from 'svelte';

export function createTimer(initialTime: number, onFinish: () => void) {
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
