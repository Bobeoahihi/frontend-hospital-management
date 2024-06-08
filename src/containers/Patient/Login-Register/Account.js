import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGE } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions'
class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {
        let session = sessionStorage.getItem('account')
        if (!session) {
            this.props.patientLogout()
            this.props.history.push('/home')
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        return (
            < div >
                Account
            </div >

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        patientLogout: () => dispatch(actions.processPatientLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));
