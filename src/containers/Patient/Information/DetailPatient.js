import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGE, CommonUtils } from '../../../utils';
import './DetailPatient.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import * as actions from "../../../store/actions";
import { getPatientById, postEditPatient } from '../../../services/userService';
class DetailPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            avatar: '',
            previewImgUrl: '',
            isOpen: false,
            currentPatientId: '',
            patientDetail: '',
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentPatientId: id
            })
            let res = await getPatientById(id)
            console.log('res', res)
            if (res && res.errCode === 0) {
                this.setState({
                    patientDetail: res.patient,
                })
            }
            this.handleOnChangePatientInfo(this.state.patientDetail)
        }

        await this.props.getGenderStart();

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.patientInfo !== this.props.patientInfo) {
            // let { patientInfo } = this.props
            // this.handleOnChangePatientInfo(patientInfo)
        }
    }
    handleOnChangePatientInfo = (patient) => {
        this.setState({
            email: patient.email ? patient.email : '',
            firstName: patient.firstName ? patient.firstName : '',
            lastName: patient.lastName,
            phoneNumber: patient.phonenumber,
            address: patient.address,
            gender: patient.gender,
            avatar: '',
            previewImgUrl: patient.image ? patient.image : '',
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgUrl) {
            return
        }
        this.setState({
            isOpen: true
        })
    }
    handleEditPatient = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        //fire redux create user
        //fire redux edit user
        let res = this.props.editAPatient({
            id: this.state.currentPatientId,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            avatar: this.state.avatar
        })
        console.log('res', res)
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['firstName', 'lastName', 'phoneNumber',
            'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing required parameter: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }


    render() {
        let genders = this.state.genderArr
        let { language, patientInfo } = this.props
        let { email, firstName, lastName, phoneNumber,
            address, gender, avatar } = this.state
        return (
            <>
                <HomeHeader
                    isShowBanner={false} />
                <div className='patient-infor-container'>
                    <div className="container ">
                        <div className="row">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <div className="image-patient" style={{
                                        backgroundImage: `url(${this.state.previewImgUrl})`
                                    }}>
                                    </div>
                                    <span className="font-weight-bold">{`${lastName} ${firstName}`}</span>
                                    <span className="text-black-50">{`${email}`}</span>
                                    <span> </span>
                                </div>
                            </div>
                            <div className="col-md-12 border-right">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Thông tin người dùng</h4>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6"><label className="labels">Tên</label><input
                                            value={firstName}
                                            onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                            type="text" className="form-control" placeholder="first name" /></div>
                                        <div className="col-md-6"><label className="labels">Họ</label><input type="text" className="form-control"
                                            placeholder="surname"
                                            value={lastName}
                                            onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                        /></div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6"><label className="labels">Số điện thoại</label>
                                            <input
                                                type="text" className="form-control"
                                                placeholder="enter phone number"
                                                value={phoneNumber}
                                                onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                            /></div>
                                        <div className="col-md-12"><label className="labels">Địa chỉ</label>
                                            <input type="text" className="form-control"
                                                placeholder="enter address "
                                                value={address}
                                                onChange={(event) => { this.onChangeInput(event, 'address') }}
                                            /></div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label className="labels">Giới tính</label>
                                            <select className='form-control'
                                                onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                                value={gender}>
                                                {genders && genders.length > 0 &&
                                                    genders.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.keyMap}>
                                                                {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                                            </option>
                                                        )

                                                    })
                                                }

                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Ảnh đại diện</label>
                                            <div className='preview-img-container'>
                                                <input id="previewImg" type='file' hidden
                                                    onChange={(event) => this.handleOnChangeImage(event)} />
                                                <label className="label-upload" htmlFor="previewImg">Tải ảnh<i className='fas fa-upload'></i></label>
                                                <div className='preview-image'
                                                    style={{
                                                        backgroundImage: `url(${this.state.previewImgUrl})`
                                                    }}
                                                    onClick={() => this.openPreviewImage()}>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 text-center">
                                        <button className="btn btn-primary profile-button" type="button"
                                            onClick={() => this.handleEditPatient()}
                                        >
                                            Lưu thông tin
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        patientInfo: state.patient.patientInfo,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        editAPatient: (data) => dispatch(actions.editAPatient(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPatient);
