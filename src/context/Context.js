import React, { useContext, useReducer, createContext, useEffect } from "react";
import { ACTIONS } from "../constants";
import { reducer } from "./reducer";
import { getCats } from "../api";

const initialState = {
  searchTxt: "",
  cats: [],
  selectedIndex: -1,
};
const AppStateContext = createContext();
const AppDispatchContext = createContext();

export const Context = (props) => {
  const { children } = props;
  const catsData = getCats();
  useEffect(() => {
    dispatch({ type: ACTIONS.SET_CATS, payload: catsData });
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  });

  return (
    <AppStateContext.Provider value={{ state, ...props }}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const { state } = useContext(AppStateContext);
  if (state === undefined)
    throw new Error("useAppState must be used within a AppStateProvider");
  return state;
};

export const useAppProps = () => {
  const context = useContext(AppStateContext);
  if (context === undefined)
    throw new Error("useAppProps must be used within a AppStateProvider");
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined)
    throw new Error("useAppDispatch must be used within a AppDispatchProvider");
  return context;
};

export const useAppContext = () => {
  return [useAppState(), useAppDispatch()];
};
