const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};
const months = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};
const parseDate = (d) => {
  const parts = d.split(" ");
  const year = parts[2];
  const month = months[parts[1]];
  const day = parts[0];
  return new Date(year, month, day);
};
const stringfyDate = (d) => {
  const year = d.getFullYear();
  const month = getKeyByValue(months, d.getMonth());
  const day = d.getDate();
  return `${day} ${month} ${year}`;
};

export { parseDate, stringfyDate };
