import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGE } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import Home from '../../../routes/Home';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor'
import ProfileDoctor from '../Doctor/ProfileDoctor'
import { getAllDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            DetailSpecialty: {},
            listProvince: []
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })
            let resProvince = await getAllCodeService('PROVINCE')
            console.log('res', res)
            if (res && res.errCode === 0 && resProvince.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data

                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: "ALL",
                        valueVi: "Toàn quốc"
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []

                })
                console.log('arrDoctorID', arrDoctorId)
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: event.target.value
            })
            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }
    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state
        console.log('this.state', this.state)
        let { language } = this.props
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>
                            </div>
                        }

                    </div>
                    <div className='search-sp-doctor'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index}
                                            value={item.keyMap}
                                        >{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    {
                        arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
