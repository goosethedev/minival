import {
  ParentProps,
  createContext,
  createResource,
  useContext,
} from "solid-js";
import { getPomos } from "../helpers/historyService";

interface HistoryContextProps extends ParentProps {}

const HistoryContextValue = (props: HistoryContextProps) => {
  const [getPomoList] = createResource(getPomos);

  return { getPomoList };
};

// Context creation (bloatware)
type ContextType = ReturnType<typeof HistoryContextValue>;

const HistoryContext = createContext<ContextType>();

export const HistoryContextProvider = (props: HistoryContextProps) => (
  <HistoryContext.Provider value={HistoryContextValue(props)}>
    {props.children}
  </HistoryContext.Provider>
);

export function useHistoryContext() {
  return useContext(HistoryContext);
}
