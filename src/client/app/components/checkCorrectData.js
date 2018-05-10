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
                    if (path.fuelEnd === arr[indx + 1].fuelBegin &&
                        path.pathEnd === arr[indx + 1].pathBegin) {
                    } else {
                        error.push(path);
                        error.push( arr[indx + 1]);
                    }
                }
            });
        });
    }
    return error;
}
export default checkCorrectData;