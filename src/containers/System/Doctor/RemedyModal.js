import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import Select from 'react-select'
import { toast } from 'react-toastify';
import moment from 'moment';
import { CommonUtils } from '../../../utils';
class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: '',
        }
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.language !== prevProps.language) {
        //     this.setState({
        //         genders: this.buildDataGender(this.props.genders)
        //     })
        // }
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
        // if (this.props.dataTime !== prevProps.dataTime) {
        //     if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        //         let doctorId = this.props.dataTime.doctorId;
        //         let timeType = this.props.dataTime.timeType
        //         this.setState({
        //             doctorId: doctorId,
        //             timeType: timeType,
        //         })
        //     }
        // }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {
        let { isOpenModal, dataModal, closeRemedyModal, sendRemedy } = this.props
        return (

            <Modal
                isOpen={isOpenModal}
                className='booking-modal-container'
                centered
                size='md'>
                <div className='modal-header'>
                    <h5 className='modal-title'>Gui hoa don kham benh thanh cong</h5>
                    <button type='button' className='close' aria-label='Close' onClick={closeRemedyModal}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email benh nhan</label>
                            <input type='email' className='form-control' value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)} />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chon file hoa don</label>
                            <input type='file' className='form-control-file'
                                onChange={(event) => this.handleOnChangeImage(event)} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={() => this.handleSendRemedy()}>Send</Button>
                    <Button color='secondary' onClick={closeRemedyModal}>Cancel</Button>
                </ModalFooter>


            </Modal>


        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
