import { ACTIONS } from "../constants";

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_SELECTED_CAT:
      return { ...state, selectedIndex: action.payload };
    case ACTIONS.SET_CATS:
      return { ...state, cats: action.payload };
    case ACTIONS.SET_SEARCH_TXT:
      return { ...state, searchTxt: action.payload };
    default:
      return state;
  }
};
