import { createAudio } from "@solid-primitives/audio";
import { createRoot } from "solid-js";

export const audio = createRoot(() => {
  const [_, notifControls] = createAudio("/src/assets/audio/notif-sound.mp3");

  return {
    playNotificationSound: () => notifControls.play()
  }
})

