import React, { useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import { getCats } from "../../api";
import { CTRL, useAppDispatch, useAppState } from "../../context";

const SearchSection = () => {
  const dispatch = useAppDispatch();
  const { searchTxt } = useAppState();

  useEffect(() => {
    const cats = getCats();
    const filteredCats = cats.filter((cat) => {
      return cat.name.toLowerCase().includes(searchTxt.toLowerCase());
    });
    CTRL.setCats(dispatch, filteredCats);
    CTRL.setSelected(dispatch, -1);
  }, [dispatch, searchTxt]);
  return (
    <>
      <div className="search-section-container card">
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          placeholder="Search for a cat by name"
          onChange={(event) => {
            CTRL.setSearchTxt(dispatch, event.target.value);
          }}
        ></DebounceInput>
      </div>
    </>
  );
};

export default SearchSection;
