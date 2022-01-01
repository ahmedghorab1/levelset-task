import React from "react";
import { CTRL, useAppDispatch, useAppState } from "../../context";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import EditPopup from "../EditPopup/EditPopup";
import { getCats } from "../../api";

const DisplayArea = () => {
  const { selectedIndex, cats } = useAppState();
  const dispatch = useAppDispatch();
  const { thumbnail_URL, name, bdate, owner_name, views_count } =
    cats[selectedIndex] || {};
  const deleteFromLocalStorage = (cat) => {
    let cats_ = getCats();
    for (var i = 0; i < cats_.length; i++) {
      if (cats_[i].id === cat.id) {
        cats_.splice(i, 1);
        break;
      }
    }
    window.localStorage.setItem("cats", JSON.stringify(cats_));
  };
  const handleDelete = () => {
    const result = window.confirm("Are you sure you want to delete this cat?");
    if (result) {
      deleteFromLocalStorage(cats[selectedIndex]);
      const cats_ = JSON.parse(JSON.stringify(cats));
      cats_.splice(selectedIndex, 1);
      CTRL.setCats(dispatch, cats_);
      CTRL.setSelected(dispatch, -1);
    } else console.log("no");
  };
  return (
    <>
      {selectedIndex > -1 ? (
        <div className="display-area-container">
          <div className="cat-info">
            <div className="cat-img-container">
              <img src={thumbnail_URL} alt={`${name} cat name`} />
            </div>
            <h1>{name}</h1>
            <div className="cat-info-container">

            <span>{bdate}</span>
            <span>{owner_name}</span>
            <span>Number of Views: {views_count + 1} times</span>
            </div>
          </div>
          <div className="options-container">
            <Popup
              trigger={<button> Edit</button>}
              modal
              lockScroll={true}
              closeOnDocumentClick
              closeOnEscape
              className=""
            >
              {(close) => (
                <>
                  <EditPopup selectedIndex={selectedIndex} close={close} />
                </>
              )}
            </Popup>
            <button
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="display-area-container">
          <h2>Please choose a cat from the list</h2>
        </div>
      )}
    </>
  );
};

export default DisplayArea;
