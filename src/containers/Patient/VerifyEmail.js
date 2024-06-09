import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'
import { postVerifyBookAppointment } from '../../services/userService';
import { io } from "socket.io-client"
import moment from 'moment';

class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: 0,
            socket: null,
            user: null,
            doctorId: '',
            date: '',
        }
    }
    async componentDidMount() {
        const socketInstance = io("http://localhost:5000")
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorId')

            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            })
            console.log('rees', res)
            if (res && res.errCode === 0) {
                let fullname = ''
                let date = ''
                if (res.infor.fullname && res.infor.date) {
                    fullname = res.infor.fullname
                    date = moment(parseInt(res.infor.date)).format('DD/MM/YYYY')
                }
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                    socket: socketInstance,
                    user: fullname,
                    doctorId: res.infor.doctorId,
                    date: date,
                })
                await this.createNewMsg()
                await this.sendNewMsg()


            } else {

                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                    socket: socketInstance,
                })
            }

        }
    }
    // async componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.state.socket && this.state.user) {
    //         const { socket } = this.state;
    //         await this.createNewMsg();
    //         await this.sendNewMsg();
    //     }
    // }
    createNewMsg = () => {
        const { socket, user } = this.state;
        socket?.emit('newUser', user)
        socket.on('error', (error) => {
            console.error('Socket error:', error);
            socket.disconnect();  // Tự động ngắt kết nối khi có lỗi
        });
        console.log('CreateSuccess')
    }
    sendNewMsg = () => {
        const { socket, user, doctorId, date } = this.state;
        let data = {
            senderName: user,
            receivedId: doctorId,
            date: date
        }
        socket?.emit('sendNotification', data, (response) => {
            this.disconnect();
        })
    }


    render() {
        let { statusVerify, errCode } = this.state
        console.log('this.state', this.state)
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        < div >
                            Loading data...
                        </div >
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='infor-booking'>Xác nhận lịch hẹn thành công.</div>
                                :
                                <div className='infor-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận.</div>
                            }
                        </div>
                    }
                </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.patient.patientInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
