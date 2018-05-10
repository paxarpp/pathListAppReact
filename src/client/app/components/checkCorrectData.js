const checkCorrectData = (cars, pathLists) => {
    let error = [];
    if(pathLists.length !== 0){
        cars.forEach(car => {
            let arrPath = [];
            arrPath = pathLists.filter(path => {
                return (
                    path.name === car.name
                )          
            }).sort((a, b) =>{
                return(
                    a.dateBegin < b.dateBegin ? -1 : 1
                )
            })
            arrPath.forEach((path, indx, arr) => {
                if(arr[indx + 1]){
                    if (path.fuelEnd !== arr[indx + 1].fuelBegin){
                        error.push(Object.assign({}, path, {first: true}, {errorFuel: true}));
                        error.push(Object.assign({}, arr[indx + 1], {first: false}, {errorFuel: true}));
                    } else if (path.pathEnd !== arr[indx + 1].pathBegin){
                        error.push(Object.assign({}, path, {first: true},  {errorFuel: false}));
                        error.push(Object.assign({}, arr[indx + 1], {errorFuel: false}));
                    }
                }
            });
        });
    }
    return error;
}
export default checkCorrectData;