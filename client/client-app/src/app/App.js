import React, {Component} from 'react';
import styles from './App.module.css';
import Layout from '../hoc/Layout/Layout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Transaction from "../containers/Forms/Transaction/Transaction";
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

    componentDidMount() {
        // this.props.onTryAutoSignup();
    }

    render() {


        let routes = (
            <Switch>

                <Route path="/transaction" exact component={Transaction}/>
                <Route path="/" exact component={Transaction}/>
                <Redirect to="/"/>
            </Switch>
        );

        return (

            <div className={styles.App}
                 style={{
                     position: "relative",
                     height: "100%",
                 }} id="bootstrap-overwrite">
                <Layout style={{
                    position: "relative",
                    height: "100%"}}>
                    {routes}
                </Layout>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
