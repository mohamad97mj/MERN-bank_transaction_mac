import React, {Component} from "react";
import {connect} from 'react-redux';


import Aux from '../Aux/Aux';

class Layout extends Component {

    render() {

        return (
            <Aux>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps)(Layout);