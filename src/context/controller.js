import { ACTIONS } from "../constants";
export default {
  setSearchTxt: (dispatch, txt) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TXT, payload: txt });
  },
  setSelected: (dispatch, i) => {
    dispatch({ type: ACTIONS.SET_SELECTED_CAT, payload: i });
  },
  setCats: (dispatch, cats) => {
    dispatch({ type: ACTIONS.SET_CATS, payload: cats });
  },
};
