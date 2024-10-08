import { getPomos } from "@/services/pomoService";
import { A } from "@solidjs/router";
import { For, createResource } from "solid-js";

const HistoryPage = () => {
  return (
    <>
      <div class="flex flex-row p-4 align-bottom">
        <A href="/" class="border border-sky-500 rounded px-2">
          Back
        </A>
        <div class="text-white text-xl capitalize ml-4">History</div>
      </div>
      <div class="p-4 flex flex-col mx-auto gap-2 xl:w-1/2 md:w-2/3 w-full">
        <PomoList />
      </div>
    </>
  );
};

const PomoList = () => {
  const [pomoList] = createResource(getPomos);

  return (
    <For each={pomoList()}>
      {(pomo) => (
        <div class="flex flex-row items-center">
          <span class="text-2xl px-4">{pomo.duration}</span>
          <div class="flex flex-col ml-4 text-white">
            <div class="text-sm">
              {pomo.created_at.format("dddd, MMM D, YYYY")}
            </div>
            <div class="text-sm">{pomo.created_at.format("hh:mm A")}</div>
          </div>
        </div>
      )}
    </For>
  );
};

export default HistoryPage;
