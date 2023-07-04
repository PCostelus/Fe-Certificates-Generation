export const aniStudiu = () => {
  const currentYear = new Date().getFullYear();
  let arr = [{}];
  for (let i = 1900; i < currentYear + 10; i++) {
    arr.push({ label: i, value: i });
  }
  return arr;
};

export const getListForDropDown = (arr) => {
  const returnedArr = [];
  for (let item of arr) {
    returnedArr.push({ value: item, label: item });
  }

  return returnedArr;
};
