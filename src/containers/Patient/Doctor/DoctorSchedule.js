import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss'
import moment, { lang } from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGE } from '../../../utils'
import { getScheduleDoctorByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
import LoginPatient from '../Login-Register/LoginPatient'
class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDay: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
            //Check login
            isOpenLogin: false,
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDay = this.getArrayDays(language)

        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDay[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
        this.setState({
            allDay: allDay,
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDay = this.getArrayDays(this.props.language)
            this.setState({
                allDay: allDay
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDay = this.getArrayDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDay[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }
    openLogin = (openLogin) => {
        this.setState({
            isOpenLogin: openLogin
        })
    }
    closeLogin = () => {
        this.setState({
            isOpenLogin: false
        })
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    getArrayDays = (language) => {
        let allDay = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGE.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(labelVi)
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                }

            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

            allDay.push(object)
        }
        return allDay;
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }

            console.log('check schedule from react', res)
        }
    }
    handleClickScheduleTime = (time) => {
        if (this.props.patientInfo) {
            this.setState({
                isOpenModalBooking: true,
                dataScheduleTimeModal: time,
            })
        } else {
            this.setState({
                isOpenLogin: true
            })
        }
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false,
        })
    }

    render() {
        let { allDay, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal, isOpenLogin } = this.state
        let { language, patientInfo } = this.props;
        return (
            <>
                < div className='doctor-schedule-container' >
                    <div className='all-schedule'>

                        <select
                            onChange={(event) => this.handleOnChangeSelect(event)}
                        >
                            {allDay && allDay.length > 0 &&
                                allDay.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })}
                        </select>
                        <div className='all-schedule-intro'>
                            (Lựa chọn ngày khám bệnh.)
                        </div>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'><span><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGE.VI ?
                                                item.timeTypeDate.valueVi : item.timeTypeDate.valueEn;
                                            return (
                                                <button key={index}
                                                    className={language === LANGUAGE.VI ? 'btn-vie' : 'btn-en'}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >
                                                    {timeDisplay}
                                                </button>
                                            )
                                        })
                                        }
                                    </div>

                                    <div className='book-free'>
                                        <span><FormattedMessage id="patient.detail-doctor.choose" /> <i className='far fa-hand-point-up'></i> <FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                    </div>
                                </>
                                :
                                <div className='no-schedule'>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            }

                        </div>
                    </div>
                </div >

                {patientInfo ?
                    <BookingModal
                        isOpenModal={isOpenModalBooking}
                        closeBookingModal={this.closeBookingModal}
                        dataTime={dataScheduleTimeModal}
                        patient={patientInfo}
                    />
                    :
                    <LoginPatient
                        isOpenLogin={isOpenLogin}
                        closeLogin={this.closeLogin}
                    // getUserInfor={(data) => this.getUserInfor(data)}
                    />
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        patientInfo: state.patient.patientInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
