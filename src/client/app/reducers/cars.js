import { handleActions } from 'redux-actions';

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
    infoPathReducer
} from '../actions/pathLists';

const initialState = {
    cars: [],
    pathLists: [],
    isNewCar: false,
    isNewPath: false,
    selectedCar: '',
    selectPathList:'',
}

export const reducer = handleActions({
    [InfoCarReducer]: (state, action) => {
        return {
            ...state,
            selectedCar: state.selectedCar === action.payload ? null : action.payload,
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
    [loadLocalStorageDispatch]: (state, action) => {
        return {
            ...state,
          cars: action.payload.cars,
          pathLists: action.payload.pathLists,  
        }
    },
}, initialState);