import {
    handleActions
} from 'redux-actions';

import checkCorrectData from '../components/checkCorrectData';

import {
    deleteCarReducer,
    addCarReducer,
    setIsNewCar,
    closeWindowDispatch,
    InfoCarReducer,
    loadLocalStorageDispatch
} from '../actions/cars';
import {
    deletePathReducer,
    addPathReducer,
    setIsNewPath,
    infoPathReducer,
    checkErrorPath,
    saveUpdateDataR
} from '../actions/pathLists';

const initialState = {
    cars: [],
    pathLists: [],
    error: [],
    isNewCar: false,
    isNewPath: false,
    selectedCar: '',
    selectPathList: '',
}

export const reducer = handleActions({
    [saveUpdateDataR]: (state, action) => {
        return {
            ...state,
            pathLists: state.pathLists.map(path => {
                if (path.name === state.selectPathList.name && path.dateBegin === state.selectPathList.dateBegin) {
                    const nextPath = Object.assign(path, action.payload)
                    nextPath.milleage = Math.round((+nextPath.pathEnd - +nextPath.pathBegin) * 100) / 100
                    nextPath.ConsumptionFactoryFuel = Math.round(+nextPath.milleage * +nextPath.constFuelChange / 100 * 100) / 100
                    nextPath.fuelEnd = Math.round((+nextPath.fuelBegin +
                        +nextPath.addFuel +
                        +nextPath.addFuelWinter -
                        +nextPath.ConsumptionFactoryFuel) * 100) / 100
                    nextPath.deltaFuel = Math.round((+nextPath.fuelBegin +
                        +nextPath.addFuel +
                        +nextPath.addFuelWinter -
                        +nextPath.fuelEnd) * 100) / 100
                    return nextPath
                } else return path
            })
        }
    },
    [checkErrorPath]: (state) => {
        return {
            ...state,
            error: checkCorrectData(state.cars, state.pathLists)
        }
    },
    [InfoCarReducer]: (state, action) => {
        return {
            ...state,
            selectedCar: state.selectedCar === action.payload ? null : action.payload,
            pathLists: state.pathLists.filter(path => {
                return (
                    path.name === action.payload
                )
            }).sort((a, b) => {
                if (a.dateBegin < b.dateBegin) {
                    return -1
                } else if (a.dateBegin > b.dateBegin) {
                    return 1
                } else return 0
            }).concat(state.pathLists.filter(path => {
                return (
                    path.name !== action.payload
                )
            }))
        }
    },
    [infoPathReducer]: (state, action) => {
        return {
            ...state,
            selectPathList: action.payload,
        }
    },
    [deleteCarReducer]: (state, action) => {
        return {
            ...state,
            cars: state.cars.filter(car => {
                return (
                    car.name !== action.payload
                )
            }),
            pathLists: state.pathLists.filter(path => {
                return (
                    path.name !== action.payload
                )
            }),
        }
    },
    [addCarReducer]: (state, action) => {
        return {
            ...state,
            cars: state.cars.concat(action.payload)
        }
    },
    [setIsNewCar]: (state) => {
        return {
            ...state,
            isNewCar: true,
        }
    },
    [deletePathReducer]: (state, action) => {

        return {
            ...state,
            pathLists: state.pathLists.filter(path => {
                return (
                    path.name !== action.payload.name || path.dateBegin !== action.payload.dateBegin
                )
            }),
        }
    },
    [addPathReducer]: (state, action) => {
        return {
            ...state,
            pathLists: state.pathLists.concat(action.payload)
        }
    },
    [setIsNewPath]: (state) => {
        return {
            ...state,
            isNewPath: !(state.isNewPath),
        }
    },
    [closeWindowDispatch]: (state, action) => {
        return {
            ...state,
            [action.payload]: false
        }
    },
    [loadLocalStorageDispatch]: (state, action) => {
        return {
            ...state,
            cars: action.payload.cars,
            pathLists: action.payload.pathLists
        }
    },
}, initialState);