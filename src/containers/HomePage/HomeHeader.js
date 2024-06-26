import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/images/logo.svg'
import { LANGUAGE } from "../../utils"
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';
import LoginPatient from '../Patient/Login-Register/LoginPatient';
import InforDropdown from '../Patient/Information/InforDropdown';
class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenLogin: false,
            openPatientInfor: false,
        }

    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.patientInfo !== prevProps.patientInfo) {
            this.setState({
                openPatientInfor: false,
            })
        }
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event: actions
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
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
    handleAvatarClick = () => {
        this.setState({
            openPatientInfor: !this.state.openPatientInfor
        })
    }


    render() {
        let { language, patientLoggined, patientInfo } = this.props;
        // let { openLogin } = this.props
        let { isOpenLogin, openPatientInfor } = this.state
        console.log('patientInfo', this.props.patientInfo)
        console.log('patientLoggined', this.props.patientLoggined)
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo}
                                onClick={() => this.returnToHome()} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.speciality" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.search-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.health-facility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.fee" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.check-health" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"> <FormattedMessage id="home-header.support" /></i>
                            </div>
                            {!patientLoggined ?
                                <div className='loginHome'>
                                    <button onClick={() => this.openLogin(true)}>Đăng nhập</button>
                                </div>
                                :
                                <div className='patient-avatar'>
                                    <div className='patient-img'
                                        onClick={() => this.handleAvatarClick()}
                                    ><i className="fa fa-user" aria-hidden="true"></i></div>
                                    {openPatientInfor && <InforDropdown
                                        patientInfo={patientInfo}
                                    />}
                                </div>
                            }
                            <div className={language === LANGUAGE.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => { this.changeLanguage(LANGUAGE.VI) }}>VN</span></div>
                            <div className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}><span onClick={() => { this.changeLanguage(LANGUAGE.EN) }}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id="banner.title1" /></div>
                            <div className='title2'><FormattedMessage id="banner.title2" /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.child2" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-procedures"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.child3" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fa fa-medkit" aria-hidden="true"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.child4" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fa fa-child" aria-hidden="true"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.child5" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-stethoscope"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.child6" /></div>
                                </div>
                            </div>
                        </div>


                    </div>
                }
                <LoginPatient
                    isOpenLogin={isOpenLogin}
                    closeLogin={this.closeLogin}
                // getUserInfor={(data) => this.getUserInfor(data)}
                />

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        patientLoggined: state.patient.patientLoggined,
        patientInfo: state.patient.patientInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
