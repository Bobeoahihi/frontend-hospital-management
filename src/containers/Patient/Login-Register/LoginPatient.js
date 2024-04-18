import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './LoginPatient.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import { LANGUAGE, CRUD_ACTIONS } from '../../../utils';
import * as actions from '../../../store/actions'
class LoginPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            register: false,
            userInfor: '',
            genderArr: [],

            email: '',
            password: '',
            emailRegister: '',
            passwordRegister: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            gender: '',
            address: '',

            action: CRUD_ACTIONS.LOGIN,
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.setState({
            register: false
        })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    showRegisterComponent = () => {
        let register = !this.state.register
        this.setState({
            register: register
        })
        console.log('register', this.state.register)
        let action = register === true ? CRUD_ACTIONS.REGISTER : CRUD_ACTIONS.LOGIN
        this.setState({
            action: action
        })
    }
    closeLogin = () => {
        let register = false
        let action = CRUD_ACTIONS.LOGIN
        this.setState({
            register: register,
            action: action,
        })
        this.props.closeLogin()
    }
    checkValidateInput = (action) => {
        let isValid = true;
        if (action === CRUD_ACTIONS.REGISTER) {
            let arrCheck = ['emailRegister', 'passwordRegister', 'firstName', 'lastName', 'phoneNumber',
                'address']
            for (let i = 0; i < arrCheck.length; i++) {
                if (!this.state[arrCheck[i]]) {
                    isValid = false;
                    alert('Missing required parameter: ' + arrCheck[i])
                    break;
                }
            }
        }
        if (action === CRUD_ACTIONS.LOGIN) {
            let arrCheck = ['email', 'password']
            for (let i = 0; i < arrCheck.length; i++) {
                if (!this.state[arrCheck[i]]) {
                    isValid = false;
                    alert('Missing required parameter: ' + arrCheck[i])
                    break;
                }
            }
        }
        return isValid;
    }
    loginOrRegisterPatient = async () => {
        let { action } = this.state;
        let isValid = this.checkValidateInput(action)
        if (isValid === false) return;
        //fire redux create user
        if (action === CRUD_ACTIONS.LOGIN) {
            this.props.patientLogin({
                email: this.state.email,
                password: this.state.password,
            })
        }
        //fire redux edit user
        if (action === CRUD_ACTIONS.REGISTER) {
            this.props.createNewPatient({
                email: this.state.emailRegister,
                password: this.state.passwordRegister,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
            })
        }
        this.setState({
            userInfor: '',
            genderArr: [],

            email: '',
            password: '',
            emailRegister: '',
            passwordRegister: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            gender: '',
            address: '',
        })
        this.closeLogin()
    }
    render() {
        let { isOpenLogin, closeLogin, language, isShowRegister, patientInfo } = this.props
        let { register, gender, genderArr, email, password, emailRegister, passwordRegister, firstName, lastName, phoneNumber, address, action } = this.state
        let genders = this.state.genderArr
        return (
            <Modal
                isOpen={isOpenLogin}
                className='login-modal-container'
                centered
                size='md'>
                <div className='modal-header'>
                    <h5 className='modal-title'>{register === true ? 'Đăng kí' : 'Đăng nhập'}</h5>
                    <button type='button' className='close' aria-label='Close' onClick={this.closeLogin}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                <ModalBody>

                    {register === true ?
                        <div className='row register-container'>
                            <div className='col-12 register-title'>
                                Đăng ký tài khoản
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input type='email' className='form-control'
                                    value={emailRegister}
                                    onChange={(event) => this.onChangeInput(event, 'emailRegister')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Password</label>
                                <input type='password' className='form-control'
                                    value={passwordRegister}
                                    onChange={(event) => this.onChangeInput(event, 'passwordRegister')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Tên</label>
                                <input type='text' className='form-control'
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Họ</label>
                                <input type='text' className='form-control'
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input type='text' className='form-control'
                                    value={phoneNumber}
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
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
                            <div className='col-12 form-group'>
                                <label>Địa chỉ</label>
                                <input type='text' className='form-control'
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12'>
                                <span className="have-account">Quay lại <a onClick={() => this.showRegisterComponent()}>Đăng nhập</a>!</span>
                            </div>
                        </div>
                        :
                        <div className='row login-container'>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input type='email' className='form-control'
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Password</label>
                                <input type='password' className='form-control'
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                />
                            </div>
                            <div className='col-12'>
                                <span className="not-have-account">Bạn chưa có tài khoản? <a onClick={() => this.showRegisterComponent()}>Đăng ký</a> ngay !</span>
                            </div>
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={() => this.loginOrRegisterPatient()}>{register === true ? 'Đăng kí' : 'Đăng nhập'}</Button>
                    <Button color='secondary' onClick={closeLogin}>Hủy</Button>
                </ModalFooter>
            </Modal>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        genderRedux: state.admin.genders,
        patientInfo: state.patient.patientInfo,
        patientLoggined: state.patient.patientLoggined,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getGenders: () => dispatch(actions.fetchGenderStart())
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        patientLogin: (data) => dispatch(actions.patientLogin(data)),
        createNewPatient: (data) => dispatch(actions.createNewPatient(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPatient);
