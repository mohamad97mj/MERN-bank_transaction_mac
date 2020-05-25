import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    counter: 0,
    data: {},
    selectedFile: null,
    uploaded: false,
    isDone: false,

};

const clone = require('rfdc')();


const transactionOnChangeHandler = (state, action) => {

    const dataCopy = {...clone(state.data)};
    dataCopy[action.payload.control] = action.payload.value;


    return updateObject(state, {
        counter: state.counter + 1,
        data: dataCopy,
    })
};

const uploadSuccess = (state, action) => {
    return updateObject(state, {
        uploaded: true,
    })
}

const transactionSuccess = (state, action) => {
    return updateObject(state, {
        isDone: true,
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.TRANSACTION_ON_CHANGE_HANDLER:
            return transactionOnChangeHandler(state, action);

        case actionTypes.UPLOAD_SUCCESS:
            return uploadSuccess(state, action);

        case actionTypes.TRANSACTION_SUCCESS:
            return transactionSuccess(state, action);

        default:
            return state;
    }
};

export default reducer;