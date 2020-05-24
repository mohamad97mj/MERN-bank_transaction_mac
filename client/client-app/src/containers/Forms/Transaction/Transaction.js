import React, {Component} from 'react';

import Spinner from '../../../components/UI/Spinner/Spinner';

import {Grid, Button, Container, Box, TextField, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';


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


    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }


    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        this.props.onUpload(data);

    }

    render() {

        let form = (
            <div style={{padding: "50px 0 50px 0"}}>
                <h5>فایل مورد نظر را آپلود کنید </h5>
                <form>

                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                    <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload
                    </button>
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

        let authRedirect = null;
        if (this.props.isAuthenticated) {

            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (

            <div>
                {authRedirect}
                {errorMessage}
                <div>
                    {form}
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => {
    // return {
    //     isAuthenticated: state.auth.username !== null,
    //     authRedirectPath: state.auth.authRedirectPath,
    //     loading: state.auth.loading,
    //     error: state.auth.error,
    // }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpload: (formData) => {
            dispatch(actions.upload(formData))
        },
    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Transaction));