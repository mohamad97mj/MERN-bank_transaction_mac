import React, {Component} from 'react';

import Spinner from '../../../components/UI/Spinner/Spinner';

import {Grid, Button, Container, Box, TextField, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

import * as XLSX from 'xlsx';


// import Form from "react-bootstrap/Form";
// import Grid from "react-bootstrap/Grid";
// import Grid from "react-bootstrap/Grid";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";


import {connect} from 'react-redux';
import * as actions from '../../../api/index';

import {Redirect} from "react-router-dom";

const styles = {
    root: {
        backgroundColor: 'red',
    },

    centerText: {
        textAlign: "center"
    }

};

class Transaction extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedFile: null,
        loaded: 0,
        formIsValid: false,
        loading: false,
    };

    componentDidMount() {
        // this.props.onSetAuthRedirectPath();
    }


    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }


    onUploadHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        this.props.onUpload(data);

    }


    inputOnChangeHandler = (e, control) => {

        this.props.onChangeHandler({control: control, value: e.target.value});
    };

    render() {

        let form = (
            <div style={{padding: "50px 0 50px 0"}}>
                <form>

                    <div style={{textAlign: "center", marginTop: "50px"}}>
                        <h5>ابتدا قالب فایل اطلاعات حساب ها را از لینک دانلود کنید </h5>

                        <a href="account-template.xlsx" download>دانلود</a>

                    </div>


                    <div style={{textAlign: "center", marginTop: "50px"}}>
                        <h5>فایل اطلاعات حساب ها را آپلود کنید </h5>

                        <div>
                            <input type="file" name="file" onChange={this.onChangeHandler}/>
                        </div>
                        <div>
                            <button type="button" className="btn btn-success" onClick={this.onUploadHandler}
                                    disabled={this.props.uploaded}> آپلود
                            </button>

                        </div>

                    </div>

                    <div style={{textAlign: "center", marginTop: "50px"}}>
                        <h5>اطلاعات پرداخت را وارد کنید</h5>

                        <div>
                            <label>شماره حساب مبدا</label>
                            <input type="text"
                                   onChange={(e) => this.inputOnChangeHandler(e, "originAccount")}
                            />
                        </div>

                        <div>
                            <label>شماره حساب مقصد</label>
                            <input type="text"
                                   onChange={(e) => this.inputOnChangeHandler(e, "destinationAccount")}
                            />

                        </div>

                        <div>
                            <label>مبلغ</label>
                            <input type="text"
                                   onChange={(e) => this.inputOnChangeHandler(e, "amount")}
                            />

                        </div>

                        <div>
                            <button type="button" className="btn btn-success" disabled={!this.props.uploaded}
                                    onClick={() => {
                                        // alert(this.props.transactionData)
                                        this.props.onPostTransaction(this.props.transactionData)
                                    }}>پرداخت
                            </button>
                        </div>

                    </div>


                    <div style={{textAlign: "center", marginTop: "50px"}}>
                        <h5>فایل اطلاعات به روز شده حساب ها را دانلود کنید </h5>

                        <a id="download-link" href="updated-accounts.xlsx" download >دانلود</a>
                    </div>

                </form>
            </div>
        );

        if (this.state.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }


        return (

            <div>
                {errorMessage}
                <div>
                    {form}
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        // username: state.auth.username,
        transactionData: state.transaction.data,
        uploaded: state.transaction.uploaded,
        isDone: state.transaction.isDone,
        // loading: state.profile.loading,
        // counter: state.profile.counter,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpload: (formData) => {
            dispatch(actions.upload(formData))
        },

        onChangeHandler: (state) => dispatch(actions.transactionOnChangeHandler(state)),
        onPostTransaction: (transactionData) => dispatch(actions.postTransaction(transactionData))

    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Transaction));

