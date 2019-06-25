import fildNamePathList from './fildNamePathList';

interface T {
  name: string;
}

const prepareNullstringForTable: (newArr: T[], stringOnPage: number) => T[] = (newArr, stringOnPage) => {
  const newObj = {};
  for (const field in fildNamePathList) {
    newObj[field] = null;
  }
  return newArr.concat(Array(stringOnPage - newArr.length).fill(newObj));
};
export default prepareNullstringForTable;
