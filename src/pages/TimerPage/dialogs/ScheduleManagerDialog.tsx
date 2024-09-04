import { For, Show, createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { clsx } from "clsx";
import { Icon } from "solid-heroicons";
import {
  arrowDownTray,
  arrowUturnLeft,
  minus,
  plus,
} from "solid-heroicons/outline";

import BaseDialog from "../../../components/BaseDialog";
import IconButton from "../../../components/IconButton";
import { useDialogContext } from "../../../contexts/DialogContext";
import { useTimerContext } from "../../../contexts/TimerContext";
import { Schedule } from "../../../globals/types";
import {
  getSchedules,
  insertSchedule,
} from "../../../services/scheduleService";

const ScheduleManagerDialog = () => {
  const { setScheduleManagerRef, closeScheduleManagerDialog } =
    useDialogContext();

  const [schedules] = createResource(getSchedules);

  // Toggle list and creation form
  const [showForm, setshowForm] = createSignal(false);

  const addSchedule = (schedule: Schedule) => {
    insertSchedule(schedule);
    closeScheduleManagerDialog();
  };

  return (
    <BaseDialog
      ref={setScheduleManagerRef}
      type="panel"
      header="Choose a schedule"
    >
      {/* Toggle between list and form */}
      <Show
        when={showForm()}
        fallback={
          <ScheduleList
            schedules={schedules()}
            toggleForm={() => setshowForm(true)}
          />
        }
      >
        <ScheduleForm
          toggleForm={() => setshowForm(false)}
          onAddSchedule={addSchedule}
        />
      </Show>
    </BaseDialog>
  );
};

const ScheduleForm = (props: {
  toggleForm: () => void;
  onAddSchedule: (s: Schedule) => void;
}) => {
  const [newSchedule, setNewSchedule] = createStore<Schedule>({
    name: "",
    work: 25,
    break: 5,
    longBreak: 15,
    spacing: 3,
  });

  const onClickAdd = () => {
    props.onAddSchedule(newSchedule);
    props.toggleForm();
  };

  return (
    <>
      {/* Container */}
      <div class="flex min-h-60 w-80 max-h-80 flex-col gap-2 overflow-y-auto">
        {/* Input box */}
        <input
          type="text"
          class="w-full rounded-lg border border-white bg-background px-2 py-1.5"
          placeholder="Routine name"
          onInput={(e) => setNewSchedule("name", e.target.value)}
        />

        {/* Input controllers */}
        <div class="flex flex-col gap-3 mt-2">
          {/* Work input */}
          <ScheduleInput
            title="Work time (mins)"
            value={() => newSchedule.work}
            decrement={() => setNewSchedule("work", (v) => Math.max(v - 5, 5))}
            increment={() =>
              setNewSchedule("work", (v) => Math.min(v + 5, 120))
            }
            range={{ min: 5, max: 120 }}
          />

          {/* Break input */}
          <ScheduleInput
            title="Break time (mins)"
            value={() => newSchedule.break}
            decrement={() => setNewSchedule("break", (v) => Math.max(v - 1, 0))}
            increment={() =>
              setNewSchedule("break", (v) => Math.min(v + 1, 30))
            }
            range={{ min: 0, max: 30 }}
          />

          {/* Cycles input */}
          <ScheduleInput
            title="Cycles before long break"
            value={() => newSchedule.spacing}
            decrement={() =>
              setNewSchedule("spacing", (v) => Math.max(v - 1, 0))
            }
            increment={() =>
              setNewSchedule("spacing", (v) => Math.min(v + 1, 5))
            }
            range={{ min: 0, max: 5 }}
          />

          {/* Long break input */}
          <ScheduleInput
            title="Long break time (mins)"
            value={() => newSchedule.longBreak}
            decrement={() =>
              setNewSchedule("longBreak", (v) => Math.max(v - 1, 0))
            }
            increment={() =>
              setNewSchedule("longBreak", (v) => Math.min(v + 1, 30))
            }
            range={{ min: 0, max: 30 }}
            disabled={() => newSchedule.spacing == 0}
          />
        </div>
      </div>

      {/* Base buttons */}
      <div class="mt-auto flex flex-row justify-around pt-3">
        <IconButton
          icon={arrowUturnLeft}
          label="Back"
          small={true}
          onClick={props.toggleForm}
        />
        <IconButton
          icon={arrowDownTray}
          label="Save"
          small={true}
          onClick={onClickAdd}
        />
      </div>
    </>
  );
};

const ScheduleInput = (props: {
  title: string;
  decrement: () => void;
  increment: () => void;
  value: () => number;
  range: { min: number; max: number };
  disabled?: () => boolean;
}) => {
  const isDisabled = () => props.disabled && props.disabled();
  const increment = () => !isDisabled() && props.increment();
  const decrement = () => !isDisabled() && props.decrement();

  return (
    <div
      class={clsx(
        "flex flex-row justify-between",
        isDisabled() && "opacity-40",
      )}
    >
      <h1>{props.title}</h1>
      <div class="flex flex-row gap-2">
        <Icon path={minus} class="w-4 text-accent" onClick={decrement} />
        <input
          class="w-10 bg-background rounded-lg border border-white text-center py-1 invalid:border-red"
          type="number"
          min={props.range.min}
          max={props.range.max}
          value={props.value()}
          disabled={isDisabled()}
        />
        <Icon path={plus} class="w-4 text-accent" onClick={increment} />
      </div>
    </div>
  );
};

const ScheduleList = (props: {
  schedules: Schedule[];
  toggleForm: () => void;
}) => {
  const { setSchedule } = useTimerContext();
  const { closeScheduleManagerDialog } = useDialogContext();

  const summary = (sch: Schedule) =>
    sch.spacing > 0
      ? `${sch.spacing} x (${sch.work}/${sch.break}) + ${sch.longBreak}`
      : `${sch.work}/${sch.break}`;

  const onClickSchedule = (sch: Schedule) => {
    setSchedule(sch);
    closeScheduleManagerDialog();
  };

  return (
    <>
      {/* Container */}
      <div class="flex min-h-60 w-64 max-h-80 flex-col gap-2 overflow-y-auto">
        <For each={props.schedules}>
          {(sch) => (
            <>
              <div
                class="flex flex-row justify-between items-center"
                onClick={() => onClickSchedule(sch)}
              >
                <h1>{sch.name}</h1>
                <p class="opacity-70 text-sm">{summary(sch)}</p>
              </div>
              <hr class="h-px text-white opacity-40" />
            </>
          )}
        </For>
      </div>

      {/* Base buttons */}
      <div class="mt-auto flex flex-row justify-center pt-3">
        <IconButton
          icon={plus}
          label="New"
          small={true}
          onClick={props.toggleForm}
        />
      </div>
    </>
  );
};

export default ScheduleManagerDialog;
