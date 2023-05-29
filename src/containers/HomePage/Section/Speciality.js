import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";



class Speciality extends Component {

    render() {

        return (
            <div className='section-share section-speciality'>
                <div className='section-content'>
                    <div className='section-header'>
                        <div className='section-header-title'>
                            <h2>Chuyên khoa phổ biến</h2>
                        </div>
                        <div className=''>
                            <button className='section-header-button'>xem thêm</button>
                        </div>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-slide'>
                                <div className='section-img'></div>
                                <div className='section-slide-title'>Cơ Xương Khớp 1</div>
                            </div>
                            <div className='section-slide'>
                                <div className='section-img'></div>
                                <div className='section-slide-title'>Cơ Xương Khớp 2</div>
                            </div>
                            <div className='section-slide'>
                                <div className='section-img'></div>
                                <div className='section-slide-title'>Cơ Xương Khớp 3</div>
                            </div>
                            <div className='section-slide'>
                                <div className='section-img'></div>
                                <div className='section-slide-title'>Cơ Xương Khớp 4</div>
                            </div>
                            <div className='section-slide'>
                                <div className='section-img'></div>
                                <div className='section-slide-title'>Cơ Xương Khớp 5</div>
                            </div>
                            <div className='section-slide'>
                                <div className='section-img'></div>
                                <div className='section-slide-title'>Cơ Xương Khớp 6</div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
