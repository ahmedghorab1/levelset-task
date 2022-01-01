import React from "react";
const CatCard = ({
  data: { thumbnail_URL, name, bdate, owner_name, views_count },
  selected,
  onClick,
}) => {
  return (
    <>
      <div
        onClick={onClick}
        className={`card cat-card-container ${selected ? "active" : ""}`}
      >
        <div className="cat-card-top-section">
          <div className="cat-img-container">
            <img src={thumbnail_URL} alt={`${name} cat name`} />
          </div>
          <h3>{name}</h3>
        </div>
        <div className="cat-card-bottom-section">
          <span>{bdate}</span>
        </div>
      </div>
    </>
  );
};

export default CatCard;
