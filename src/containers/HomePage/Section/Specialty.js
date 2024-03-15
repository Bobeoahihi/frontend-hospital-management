import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Specialty.scss'
import Slider from 'react-slick';


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

    render() {
        let language = this.props.language;
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>Cơ xương khớp 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>Cơ xương khớp </div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>Cơ xương khớp 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>Cơ xương khớp 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>Cơ xương khớp 6</div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
