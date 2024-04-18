import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGE } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import './BookingHistory.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import moment from 'moment';
import { getAllAppointmentHistory } from '../../../services/userService';
class BookingHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            date: [],
        }
    }
    async componentDidMount() {
        await this.getDataPatient()
    }
    getDataPatient = async () => {
        let res = await getAllAppointmentHistory(this.props.match.params.id)
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
                date: res.data.date
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        let { dataPatient, date } = this.state
        let { language } = this.props
        let dateForm = moment(date).format('DD/MM/YYYY')
        console.log('date', dateForm)
        return (
            <>
                <HomeHeader
                    isShowBanner={false} />
                <div className='booking-history-container'>
                    <div className='booking-history-title'>
                        Lịch sử khám bệnh
                    </div>
                    <div className='col-12 table-manage-history-patient'>
                        <table style={{ width: '100%' }} >
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Ngày</th>
                                    <th>Bác sĩ khám</th>
                                    <th>Tên phòng khám</th>
                                    <th>Địa chỉ phòng khám</th>
                                    <th>Tình trạng khám</th>
                                    <th>Hồ sơ bệnh án</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        let time = language === LANGUAGE.VI ?
                                            item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                        let gender = language === LANGUAGE.VI ?
                                            item.doctorDataBooking.genderData.valueVi : item.doctorDataBooking.genderData.valueEn
                                        let status = language === LANGUAGE.VI ?
                                            item.statusAppointment.valueVi : item.statusAppointment.valueEn
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{time}</td>
                                                <td>{`${moment(item.date).format('DD/MM/YYYY')}`}</td>
                                                <td>{`${item.doctorDataBooking.lastName} ${item.doctorDataBooking.firstName}`}</td>
                                                <td>{item.doctorDataBooking.Doctor_infor.nameClinic}</td>
                                                <td>{item.doctorDataBooking.Doctor_infor.addressClinic}</td>
                                                <td>{status}</td>
                                                <td></td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan={"6"} style={{ textAlign: 'center' }}>no data</td>
                                    </tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </>

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingHistory);
