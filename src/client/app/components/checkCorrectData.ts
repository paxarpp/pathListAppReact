import { IPath, ICar, IError } from './interfaces';

const checkCorrectData = (cars: ICar, pathLists: IPath[]):IError[] => {
  return Object.keys(pathLists)
    .map(el => (!pathLists[el] ? [] : pathLists[el].sort((a, b) => (a.dateBegin < b.dateBegin ? -1 : 1))))
    .map(el =>
      el.map((path: IError) => {
        path.errorPath = false;
        path.errorFuel = false;
        path.first = false;
        path.last = false;
        return path;
      })
    )
    .map(el =>
      el.map((path: IError, indx) => {
        if (el[indx + 1]) {
          if (path.pathEnd !== el[indx + 1].pathBegin) {
            path.errorPath = true;
            path.last = true;
            el[indx + 1].errorPath = true;
            el[indx + 1].first = true;
          }
          if (path.fuelEnd !== el[indx + 1].fuelBegin) {
            path.errorFuel = true;
            path.last = true;
            el[indx + 1].errorFuel = true;
            el[indx + 1].first = true;
          }
        }
        return path;
      })
    );
};
export default checkCorrectData;
