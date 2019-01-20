const checkCorrectData = (cars, pathLists) => {
  return cars
    .map(car => pathLists[car.name])
    .map(el => el.sort((a, b) => (a.dateBegin < b.dateBegin ? -1 : 1)))
    .map(el =>
      el.map(path => {
        path.errorPath = false;
        path.errorFuel = false;
        path.first = false;
        path.last = false;
        return path;
      })
    )
    .map(el =>
      el.map((path, indx) => {
        if (el[indx + 1]) {
          if (path.pathEnd != el[indx + 1].pathBegin) {
            path.errorPath = true;
            path.last = true;
            el[indx + 1].errorPath = true;
            el[indx + 1].first = true;
          }
          if (path.fuelEnd != el[indx + 1].fuelBegin) {
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
