import fildNamePathList from './fildNamePathList';

const prepareNullstringForTable = (newArr, stringOnPage) => {
    let newObj = {};
    for (let field in fildNamePathList) {
        newObj[field] = null;
    }
    return newArr.concat(Array(stringOnPage - newArr.length).fill(newObj))
}
export default prepareNullstringForTable;