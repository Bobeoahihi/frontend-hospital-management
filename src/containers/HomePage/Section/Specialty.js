import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Specialty.scss'
import Slider from 'react-slick';
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'red' }}
            onClick={onClick}
        />
    )
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'green' }}
            onClick={onClick}
        >Abc</div>
    )
}
class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }

    }
    handleVIewDetailSpecialty = (specialty) => {
        this.props.history.push(`detail-specialty/${specialty.id}`)
    }
    render() {
        let language = this.props.language;
        let { dataSpecialty } = this.state
        return (
            <div className='section-share section-child'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.popular-specialty" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize clinic-child' key={index}
                                            onClick={() => this.handleVIewDetailSpecialty(item)}
                                        >
                                            <div className='bg-image section-specialty'
                                                style={{ backgroundImage: `url(${item.image})` }} />
                                            <div className='specialty-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
