import * as actionTypes from './actionTypes';
import axios from '../../my-axios';
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {getProfile} from "./profile";
import {getForm} from "./main";

export const uploadStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const uploadSuccess = (user) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        user: user,

    };
};

export const uploadFail = (error) => {
    alert("upload Failed");

    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};



export const upload = (formData) => dispatch => {

    alert("entered upload function")
    dispatch(uploadStart());
    axios
        .post("/upload", formData, {})
        .then(res => {
            alert("The file is successfully uploaded");
            console.log("here in upload action" + formData)


            dispatch(uploadSuccess(formData));

        })
        .catch(err =>
            dispatch(uploadFail(err))
        );
};



