import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu, managerMenu } from './menuApp';
import './Header.scss';
import { LANGUAGE, USER_ROLE } from '../../utils';
import _ from 'lodash';
import { push } from "connected-react-router";
import { withRouter } from 'react-router';
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: [],
        }

    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);

    }
    componentDidMount() {
        let { userInfo } = this.props;
        const currentPath = this.props.location.pathname;
        const { navigate } = this.props;
        let menu = []
        //Phan quyen nguoi dung: 4 roles: admin, manager, doctor, patient
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if (role === USER_ROLE.ADMIN) {
                if (currentPath === '/doctor/manage-schedule' || currentPath === '/doctor/manage-patient') {
                    const redirectPath = '/system/user-redux';
                    navigate(`${redirectPath}`);
                }
                console.log('menu', adminMenu[0].menus[0].link)
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                if (currentPath !== '/doctor/manage-schedule' || currentPath !== '/doctor/manage-patient') {
                    const redirectPath = '/doctor/manage-schedule';
                    navigate(`${redirectPath}`);
                }
                menu = doctorMenu;
            }
            if (role === USER_ROLE.MANAGER) {
                if (currentPath !== '/system/user-redux' || currentPath !== '/system/manage-specialty' || currentPath !== '/system/choose-specialties') {
                    const redirectPath = '/system/user-redux';
                    navigate(`${redirectPath}`);
                }
                menu = managerMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log(userInfo)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='languages'>
                    <span className='welcome'><FormattedMessage id='home-header.welcome' />
                        , {userInfo && userInfo.firstName ? userInfo.firstName : ""}</span>
                    <span className={language === LANGUAGE.VI ? 'language-vi active' : 'language-vi'}
                        onClick={() => this.handleChangeLanguage(LANGUAGE.VI)}>
                        VN
                    </span>
                    <span className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}
                        onClick={() => this.handleChangeLanguage(LANGUAGE.EN)}>
                        EN
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout"
                        onClick={processLogout}
                        title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        navigate: (path) => dispatch(push(path)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
