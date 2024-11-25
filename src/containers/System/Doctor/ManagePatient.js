import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGE } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy, postCancelBookAppointment } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay'
import { io } from "socket.io-client"
class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
            notification: [],
            socket: null,
            user: '',
            isOpenNotifi: false,
        }
    }
    async componentDidMount() {
        const { user } = this.props
        const socketInstance = io("http://localhost:5000")
        await this.setState({
            socket: socketInstance,
            user: this.props.user.id
        })
        await this.createNewMsg()
        console.log('state', this.state)
        await this.getDataPatient()
        await this.createNewMsg()
        await this.listenNewMsg()
        // await this.sendNewMsg()
    }
    // async componentDidUpdate(prevProps, prevState) {
    //     if (this.state.socket && this.state.user) {
    //         const { socket } = this.state;
    //         await this.createNewMsg();
    //         socket.on('getNotification', data => {
    //             this.setState(prevState => ({
    //                 notification: prevState.notification.concat(data)
    //             }));
    //         });

    //     }
    //     if (prevState.user !== this.props.userInfo) {
    //         this.setState({
    //             user: this.props.userInfo,
    //             // socket: io("http://localhost:5000")
    //         })
    //     }
    // }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevState.notification !== this.state.notification) {
            console.log('notification', this.state.notification)
        }
    }
    createNewMsg = () => {
        const { socket, user } = this.state;
        socket?.emit('newUser', user)
        console.log('CreateSuccess')
    }
    listenNewMsg = () => {
        const { socket, user } = this.state;
        socket.on('getNotification', data => {
            this.setState(prevState => ({
                notification: prevState.notification.concat(data).reverse()
            }));
        });
    }
    sendNewMsg = () => {
        const { socket, user } = this.state;
        socket?.emit('sendNotification',
            {
                senderName: 'Tran Van',
                receivedId: 37,
                date: '11/10/2024'
            }, (response) => {
                this.disconnect();
            })
    }
    displayNotification = (name, date, key) => {
        return <span className='notification' key={key}><i className="fa fa-arrow-right" aria-hidden="true"></i> {`  Khách hàng ${name} vừa xác nhận lịch hẹn ngày ${date} qua email`}</span>
    }
    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,

        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        })
    }
    handleBtnCancel = async (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            timeType: item.timeType,

        }
        let infor = await postCancelBookAppointment(data)
        if (infor) {
            console.log('infor', infor)
            toast.success('Cancel successfully')
        } else {
            toast.error('Cancel failed')
        }
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }
    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true,
        })
        let res = await postSendRemedy({
            ...dataChild, //email, imgBase64, doctorId
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        })
        console.log('res', res)
        if (res && (res.infor.errCode === 0 || res.errCode === 0)) {
            this.setState({
                isShowLoading: false
            })
            this.closeRemedyModal()
            toast.success('Send Remedy succeeds: ')
            await this.getDataPatient()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Something wrongs....')
            console.log('send remedy error', res)
        }
    }
    changeDateForm = (InputDate) => {


        // Định dạng thành chuỗi DD/MM/YYYY
        return moment(parseInt(InputDate)).format('DD/MM/YYYY')
    }
    handleNotifi = () => {
        this.setState({
            isOpenNotifi: !this.state.isOpenNotifi
        })
    }
    clearNotifi = () => {
        this.setState({
            notification: [],
            isOpenNotifi: false
        })
    }
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal, notification, isOpenNotifi } = this.state


        let { language } = this.props
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading ...'
                >
                    <div className='navbar'>
                        <div className='icon' onClick={() => this.handleNotifi()}>
                            <div className='bellimg'><i className="fa fa-bell " aria-hidden="true"></i></div>
                            {notification.length > 0 && <div className='counter'>{notification.length}</div>}
                        </div>
                    </div>

                    {isOpenNotifi &&
                        <div className='notifications'>
                            <div className='title'><span>Thông báo</span></div>
                            {notification.length > 0 ?
                                notification.map((item, key) => this.displayNotification(item.senderName, item.date, key))
                                :
                                <span className='noInfor'>Chưa có thông tin mới</span>
                            }
                            <button className='notiButton' onClick={() => this.clearNotifi()}>Đánh dấu là đã đọc</button>
                        </div>
                    }
                    < div className='manage-patient-container'>
                        <div className='m-p-title'>
                            Danh sách lịch khám bệnh
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label>Chọn thời gian khám</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className='form-control'
                                    value={this.state.currentDate}
                                // minDate={yesterday}
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table style={{ width: '100%' }} >
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian khám</th>
                                            <th>Khung giờ</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Dấu hiệu bệnh</th>
                                            <th>Trạng thái lịch</th>
                                            <th>Action</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGE.VI ?
                                                    item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                                let gender = language === LANGUAGE.VI ?
                                                    item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{this.changeDateForm(item.date)}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.statusAppointment.valueVi}</td>
                                                        {item.statusId === "S4" ?
                                                            <td>Hủy thành công</td>
                                                            :
                                                            <td>
                                                                <button className='mp-btn-confirm'
                                                                    onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>
                                                                <button className='mp-btn-cancel'
                                                                    onClick={() => this.handleBtnCancel(item)}>Hủy bỏ</button>
                                                            </td>}
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan={"9"} style={{ textAlign: 'center' }}>no data</td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div >
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />

                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
