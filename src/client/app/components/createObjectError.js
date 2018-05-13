const createObjectError = (path, error) => {
  const matchNames = Object.assign({}, {
    first: false
  }, {
    fuel: false
  }, {
    path: false
  });
  error.forEach(elem => {
    if (elem.name === path.name && elem.dateBegin === path.dateBegin) {
      if (!(elem.first) && elem.errorPath) {
        matchNames.path = true;
        matchNames.first = false;
      }
      if (elem.first && elem.errorPath) {
        matchNames.path = true;
        matchNames.first = true;
      }
      if (elem.first && elem.errorFuel) {
        matchNames.fuel = true;
        matchNames.first = true;
      }
      if (!(elem.first) && elem.errorFuel) {
        matchNames.fuel = true;
        matchNames.first = false;
      }
    }
  });
  return matchNames;
}
export default createObjectError;