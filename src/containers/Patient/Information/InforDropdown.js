import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGE } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import './InforDropdown.scss'
import * as actions from '../../../store/actions'
import { withRouter } from 'react-router-dom';
import { getPatientById } from '../../../services/userService';
class InforDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientDropDown: '',
        }
    }
    async componentDidMount() {
        let res = await getPatientById(this.props.patientInfo.id)
        this.setState({
            patientDropDown: res.patient,
        })
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleInfoPatient = (patient) => {
        this.props.history.push(`/detail-patient/${patient.id}`)
    }
    handleBookingHistory = (patient) => {
        this.props.history.push(`/booking-history/${patient.id}`)
    }
    handlePatientLogout = () => {
        this.props.patientLogout()
        this.props.history.push(`/home`)

    }

    render() {
        let { patientDropDown } = this.state
        return (

            <ul className="dropdown-info-container">
                <div className="header-patient-info">
                    <div className='infor-left'>
                        <div className='infor-image' style={{ backgroundImage: `url(${patientDropDown.image})` }}></div>
                    </div>
                    <div className='infor-right'>
                        <div>Tên người dùng: {patientDropDown.firstName}</div>
                        <div>Email: {patientDropDown.email}</div>
                    </div>
                    {/* Thêm các thông tin khác của người dùng nếu cần */}
                </div>
                <li onClick={() => this.handleInfoPatient(patientDropDown)}><a>Thông tin cá nhân</a></li>
                <li onClick={() => this.handleBookingHistory(patientDropDown)}><a>Lịch sử khám bệnh</a></li>
                <li><a>Đổi mật khẩu</a></li>
                <li onClick={() => this.handlePatientLogout()}><a>Đăng xuất</a></li>

            </ul>


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InforDropdown));
