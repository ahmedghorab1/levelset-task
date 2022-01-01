import data from "../data/cats.json";
const getCats = () => {
  if (window.localStorage.getItem("cats"))
    return JSON.parse(window.localStorage.getItem("cats"));
  window.localStorage.setItem("cats", JSON.stringify(data));
  return data;
};
export { getCats };
