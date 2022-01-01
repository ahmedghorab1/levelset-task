import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CTRL, useAppDispatch, useAppState } from "../../context";
import { parseDate, stringfyDate } from "../../utils";
import closeBtn from "../../assets/images/close.png";
import { getCats } from "../../api";
const EditPopup = ({ close, selectedIndex }) => {
  const { cats } = useAppState();
  const dispatch = useAppDispatch();
  const { thumbnail_URL, name, bdate, owner_name } = cats[selectedIndex] || {};
  const [nameTxt, setNameTxt] = useState(name);
  const [nameError, setNameError] = useState(false);
  const [bdateTxt, setBDateTxt] = useState(bdate);
  const [thumbnailTxt, setThumbnailTxt] = useState(thumbnail_URL);
  const [urlError, setUrlError] = useState(false);
  const [ownerNameTxt, setOwnerNameTxt] = useState(owner_name);
  const ownerNames = [
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Doe", label: "Jane Doe" },
    { value: "Kate Debarros", label: "Kate Debarros" },
  ];
  const updateLocalStorage = (
    cat,
    { nameTxt, bdateTxt, thumbnailTxt, ownerNameTxt }
  ) => {
    let cats_ = getCats();
    for (var i = 0; i < cats_.length; i++) {
      if (cats_[i].id === cat.id) {
        cats_[i].name = nameTxt;
        cats_[i].thumbnail_URL = thumbnailTxt;
        cats_[i].bdate = bdateTxt;
        cats_[i].owner_name = ownerNameTxt;
        break;
      }
    }
    window.localStorage.setItem("cats", JSON.stringify(cats_));
  };
  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      fontSize: "1rem",
    }),
    option: (provided, state) => ({
      ...provided,
    }),
    control: (provided, state) => ({
      // none of react-select's styles are passed to <Control />
      ...provided,
      width: "12.5rem",
      height: "1rem",
      border: "1px solid",
      borderColor: "rgb(118, 118, 118)",
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
    }),
    placeholder: (provided, state) => ({
      ...provided,
    }),
    singleValue: (provided, state) => ({
      ...provided,
    }),
    input: (provided, state) => ({
      ...provided,
    }),
  };
  const validURL = (s) => {
    var regexp =
      /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/gmu;
    return regexp.test(s);
  };
  return (
    <>
      <div className="edit-popup-container">
        <div className="popup-header">
          <h2>Edit Cat</h2>
          <div className="close-btn-container">
            <img
              src={closeBtn}
              alt=""
              className="popup-close-btn"
              onClick={() => {
                close();
              }}
            />
          </div>
        </div>
        <div className="edit-inputs">
          <div className="input-container">
            <span>Thumbnail URL</span>
            <div className="field-container">
              <input
                name="thumbnail_URL"
                type="text"
                value={thumbnailTxt}
                onChange={(e) => setThumbnailTxt(e.target.value)}
                className={`input-area ${urlError && "error"}`}
              />
              {urlError && (
                <span className="error-msg">Please Enter a Valid URL</span>
              )}
            </div>
          </div>
          <div className="input-container">
            <span>Name</span>
            <div className="field-container">
              <input
                name="name"
                type="text"
                value={nameTxt}
                onChange={(e) => {
                  setNameError(false);
                  setNameTxt(e.target.value);
                }}
                className={`input-area ${nameError && "error"}`}
              />
              {nameError && (
                <span className="error-msg">Please Enter a Valid Name</span>
              )}
            </div>
          </div>
          <div className="input-container">
            <span>Birth Date</span>
            <div className="field-container">
              <DatePicker
                name="bdate"
                selected={parseDate(bdateTxt)}
                onChange={(date) => setBDateTxt(stringfyDate(date))}
                dateFormat="dd MMM yyyy"
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className="input-container">
            <span>Owner</span>
            <div className="field-container">
              <Select
                name="owner"
                onChange={(e) => {
                  setOwnerNameTxt(e.value);
                }}
                defaultValue={{ value: ownerNameTxt, label: ownerNameTxt }}
                options={ownerNames}
                styles={customStyles}
              />
            </div>
          </div>
        </div>
        <div className="edit-options-btns">
          <button
            onClick={() => {
              if (nameTxt === "") {
                setNameError(true);
                return;
              }
              if (!isNaN(nameTxt)) {
                setNameError(true);
                return;
              }
              if (!validURL(thumbnailTxt)) {
                setUrlError(true);
                return;
              }
              updateLocalStorage(cats[selectedIndex], {
                thumbnailTxt,
                nameTxt,
                bdateTxt,
                ownerNameTxt,
              });
              const cats_ = JSON.parse(JSON.stringify(cats));
              cats_[selectedIndex].thumbnail_URL = thumbnailTxt;
              cats_[selectedIndex].name = nameTxt;
              cats_[selectedIndex].bdate = bdateTxt;
              cats_[selectedIndex].owner_name = ownerNameTxt;
              CTRL.setCats(dispatch, cats_);
              close();
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              close();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPopup;
