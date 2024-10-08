import { openTimerFinishedDialog } from "@/components/dialogs/TimerFinishedDialog"
import { insertPomo } from "@/services/pomoService";
import { currentTag } from "@/stores/app";
import { audio } from "@/stores/audio";
import { timer } from "@/stores/timer";

export const onTimerFinish = async () => {
  const { getInterval, goToNextInterval } = timer;

  // Open dialog and play notification sound
  openTimerFinishedDialog();
  audio.playNotificationSound();

  // Save pomo if working interval
  if (!getInterval().isBreak)
    await insertPomo(Math.ceil(getInterval().duration), currentTag());

  // Set next interval
  goToNextInterval(false);
}

export const skipCurrentInterval = (saveCurrent: boolean, startNext: boolean) => {
  const { goToNextInterval, getTimer, getInterval } = timer;

  // Save elapsed time as pomo if requested
  if (saveCurrent) {
    const elapsedSecs = getInterval().duration * 60 - getTimer()
    const elapsedMins = Math.ceil(elapsedSecs / 60);
    insertPomo(elapsedMins, currentTag())
  }

  // Move to next and auto start if requested
  goToNextInterval(startNext);
}