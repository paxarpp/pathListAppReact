import fildNamePathList from './fildNamePathList';

const prepareNullstringForTable = (newArr, stringOnPage) => {
  const newObj = {};
  for (const field in fildNamePathList) {
    newObj[field] = null;
  }
  return newArr.concat(Array(stringOnPage - newArr.length).fill(newObj));
};
export default prepareNullstringForTable;
