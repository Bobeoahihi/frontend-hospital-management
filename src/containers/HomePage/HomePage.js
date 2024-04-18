import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty'
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor'
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss'
//Import css files
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import LoginPatient from '../Patient/Login-Register/LoginPatient';
class HomePage extends Component {
    // handleAfterChange = (index, dontAnimate) => {
    //     console.log('currentslide', index)
    // }
    constructor(props) {
        super(props);
        this.state = {
            // isOpenLogin: false,
        }

    }

    // openLogin = (openLogin) => {
    //     this.setState({
    //         isOpenLogin: openLogin
    //     })
    // }
    // closeLogin = () => {
    //     this.setState({
    //         isOpenLogin: false
    //     })
    // }
    render() {
        // let { isOpenLogin } = this.state
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            // slickGoto: this.handleAfterChange
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        }
        return (
            <>
                <HomeHeader isShowBanner={true}
                // openLogin={this.openLogin}
                />
                <Specialty
                    settings={settings} />
                <MedicalFacility
                    settings={settings} />
                <OutStandingDoctor settings={settings} />
                <HandBook settings={settings} />
                <About />
                <HomeFooter />
                {/* <LoginPatient
                    isOpenLogin={isOpenLogin}
                    closeLogin={this.closeLogin}
                /> */}
            </ >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
