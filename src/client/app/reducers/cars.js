import {
    handleActions
} from 'redux-actions';

import {
    deleteCarReducer,
    addCarReducer,
    setIsNewCar,
    closeWindowDispatch,
    InfoCarReducer
} from '../actions/cars';
import {
    deletePathReducer,
    addPathReducer,
    setIsNewPath,
    infoPathReducer
} from '../actions/pathLists';

const initialState = {
    cars: [{
            name: 'test1',
            fuel: 'ai',
            constFuelChange: 15
        },
        {
            name: 'test2',
            fuel: 'dt',
            constFuelChange: 12
        }
    ],
    pathLists: [{
        name: 'test1',
        fuel: 'ai',
        constFuelChange: 15,
        dateBegin: '01/02/2018',
        pathBegin: 10,
        pathEnd: 110,
        milleage: 100,
        fuelBegin: 5,
        fuelEnd: 10,
        addFuel: 20,
        deltaFuel: 15,
        ConsumptionFactoryFuel: 10,
    }],
    isNewCar: false,
    isNewPath: false,
    selectedCar: '',
    selectPathList:'',
}

export const reducer = handleActions({
    [InfoCarReducer]: (state, action) => {
        return {
            ...state,
            selectedCar: action.payload,
            pathLists: state.pathLists.slice().sort((a, b) => {
                if (action.payload === b.name) {
                    return 1
                } else if(action.payload === a.name){
                    return -1
                }
            }),
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
}, initialState);