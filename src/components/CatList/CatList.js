import CatCard from "../CatCard/CatCard";
import { useAppDispatch, useAppState } from "../../context";
import { CTRL } from "../../context";
import { getCats } from "../../api";

const CatList = () => {
  const { cats, selectedIndex } = useAppState();
  const dispatch = useAppDispatch();
  const incrementViewsInLocalStorage = (cat) => {
    let cats_ = getCats();
    for (var i = 0; i < cats_.length; i++) {
      if (cats_[i].id === cat.id) {
        cats_[i].views_count++;
      }
    }
    window.localStorage.setItem("cats", JSON.stringify(cats_));
  };
  return (
    <>
      <div className="cat-list-container">
        {cats.map((obj, i) => {
          return (
            <CatCard
              onClick={() => {
                if (selectedIndex !== i) {
                  CTRL.setSelected(dispatch, i);
                  const cats_ = JSON.parse(JSON.stringify(cats));
                  cats_[i].views_count++;
                  incrementViewsInLocalStorage(cats_[i]);
                  CTRL.setCats(dispatch, cats_);
                }
              }}
              selected={selectedIndex === i}
              data={obj}
              key={`cat${i}`}
            />
          );
        })}
      </div>
    </>
  );
};

export default CatList;
