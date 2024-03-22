import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGE } from '../../../utils'
import { getScheduleDoctorByDate } from '../../../services/userService'
class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDay: [],
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        console.log('monent vie: ', moment(new Date()).format('dddd - DD/MM'))
        console.log('monent en: ', moment(new Date()).locale('en').format('ddd - DD/MM'))
        this.setArrays(language)

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrays(this.props.language)
        }
    }
    setArrays = (language) => {
        let arrDay = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (this.props.language === LANGUAGE.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

            arrDay.push(object)
        }
        this.setState({
            allDay: arrDay,
        })
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log('check schedule from react', res)
        }
    }

    render() {
        let { allDay } = this.state
        return (
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
                </div>
                <div className='all-available-time'>

                </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
