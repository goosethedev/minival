import { createSignal } from "solid-js";
import { createAudio } from "@solid-primitives/audio";
import { createContextProvider } from "@solid-primitives/context";

export const [DialogProvider, useDialogContext] = createContextProvider(
  () => {
    // Timer finished dialog ref with audio notification signal
    const [timerFinishedRef, setTimerFinishedRef] =
      createSignal<HTMLDialogElement>(null);
    const [_, notifControls] = createAudio("/src/assets/audio/notif-sound.mp3");

    // When opening the finished dialog, play the notif sound
    const openTimerFinishedDialog = () => {
      timerFinishedRef().showModal();
      notifControls.play();
    };

    // Panel for tag selection and creation
    const [tagManagerRef, setTagManagerRef] =
      createSignal<HTMLDialogElement>(null);

    return {
      // Timer finished dialog
      openTimerFinishedDialog,
      closeTimerFinishedDialog: () => timerFinishedRef().close(),
      setTimerFinishedRef,

      // Select/create tag dialog
      openTagManagerDialog: () => tagManagerRef().showModal(),
      closeTagManagerDialog: () => tagManagerRef().close(),
      setTagManagerRef,
    };
  },
);
