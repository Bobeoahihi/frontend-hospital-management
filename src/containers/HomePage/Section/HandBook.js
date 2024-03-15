import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
class HandBook extends Component {

    render() {
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook ' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư tiến sĩ Chinh Hoàng</div>
                                    <div>Cơ xương khớp 1</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook ' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư tiến sĩ Chinh Hoàng</div>
                                    <div>Cơ xương khớp 2</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook ' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư tiến sĩ Chinh Hoàng</div>
                                    <div>Cơ xương khớp 3</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook ' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư tiến sĩ Chinh Hoàng</div>
                                    <div>Cơ xương khớp 4</div>
                                </div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
