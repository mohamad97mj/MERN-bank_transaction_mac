import * as actionTypes from './actionTypes';
import axios from '../../my-axios';

export const uploadStart = () => {
    return {
        type: actionTypes.UPLOAD_START
    };
};

export const uploadSuccess = () => {

    return {
        type: actionTypes.UPLOAD_SUCCESS,
        // user: user,

    };
};

export const transactionSuccess = () => {

    return {
        type: actionTypes.TRANSACTION_SUCCESS,
        // user: user,

    };
};

export const uploadFail = (error) => {
    alert("transaction Failed");

    return {
        type: actionTypes.UPLOAD_FAIL,
        error: error
    };
};


export const upload = (file) => dispatch => {

    // dispatch(uploadStart());
    axios
        .post("/upload", file, {})
        .then(res => {

            if (res.status === 200) {
                dispatch(uploadSuccess());
                alert("فایل مورد نظر آپلود شد")
            } else if (res.status === 201) {
                alert(res.data.message)
            }

        })
        .catch(err => {
                console.log(err)
                alert("upload failed")
            }

            // dispatch(uploadFail(err))
        );
};


export const postTransaction = (transactionData) => dispatch => {


    const d = new Date();

    transactionData.date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay() + "-" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();

    const tempTransactionData =
        {
            ...transactionData,
        };


    axios.post(`/transaction`, tempTransactionData)
        // ;
        .then(res => {

            if (res.status === 200) {
                transactionSuccess();
                // document.getElementById("download-link").innerHTML = "hello"
                alert("تراکنش  با موفقیت انجام شد")
            } else if (res.status === 201) {
                alert(res.data.message)
            }

        })
        .catch(err => {
            alert("تراکنش انجام نشد! لطفا بعدا دوباره امتحان کنید")
        });

};


export const transactionOnChangeHandlerStart = (state) => {
    return {
        type: actionTypes.TRANSACTION_ON_CHANGE_HANDLER,
        payload: state
    };
};


export const transactionOnChangeHandler = (state) => dispatch => {

    dispatch(transactionOnChangeHandlerStart(state));
};



