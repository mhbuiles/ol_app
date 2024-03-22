import { useReducer } from "react";
import type { Dispatch, Reducer } from "react";

const mergeReducer = <State extends Record<string, unknown>>(
  oldState: State,
  newState: Partial<State>,
): State => ({ ...oldState, ...newState });

export const useComplexState = <State extends Record<string, unknown>>(
  initialState?: State,
): readonly [State, Dispatch<Partial<State>>] => {
  const [state, setState] = useReducer<Reducer<State, Partial<State>>>(
    mergeReducer,
    initialState || ({} as State),
  );

  return [state, setState] as const;
};
