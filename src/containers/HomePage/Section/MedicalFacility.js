import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";

class MedicalFacility extends Component {

    render() {

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-content'>
                    <div className='section-header'>
                        <div className='section-header-title'>
                            <h2>Cơ sở y tế nổi bật</h2>
                        </div>
                        <div className=''>
                            <button className='section-header-button'>xem thêm</button>
                        </div>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-slide'>
                                <div className='section-img'></div>
                                <div className='section-slide-title'>Bệnh viện Chợ Rẫy 1</div>
                            </div>
                            <div className='section-slide'>
                                <div className='section-img'></div>
                                <div className='section-slide-title'>Bệnh viện Chợ Rẫy 2</div>
                            </div>
                            <div className='section-slide'>
                                <div className='section-img'></div>
                                <div className='section-slide-title'>Bệnh viện Chợ Rẫy 3</div>
                            </div>
                            <div className='section-slide'>
                                <div className='section-img'></div>
                                <div className='section-slide-title'>Cơ Xương Khớp 4</div>
                            </div>
                            <div className='section-slide'>
                                <div className='section-img'></div>
                                <div className='section-slide-title'>Bệnh viện Chợ Rẫy 5</div>
                            </div>
                            <div className='section-slide'>
                                <div className='section-img'></div>
                                <div className='section-slide-title'>Bệnh viện Chợ Rẫy 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
