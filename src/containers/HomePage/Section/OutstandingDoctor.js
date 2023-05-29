import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";

class OutstandingDoctor extends Component {

    render() {

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-content'>
                    <div className='section-header'>
                        <div className='section-header-title'>
                            <h2>Bác sĩ nổi bật tuần qua</h2>
                        </div>
                        <div className=''>
                            <button className='section-header-button'>xem thêm</button>
                        </div>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-slide'>
                                <div className='outer-bg'>
                                    <div className='section-img'></div>
                                    <div className='section-text text-center'>
                                        <div className='section-slide-title'>PGS.TS.BS Hỏi Dân IT</div>
                                        <div className='section-slide-name'>Cơ Xương Khớp 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-slide'>
                                <div className='outer-bg'>
                                    <div className='section-img'></div>
                                    <div className='section-text text-center'>
                                        <div className='section-slide-title'>PGS.TS.BS Hỏi Dân IT</div>
                                        <div className='section-slide-name'>Cơ Xương Khớp 2</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-slide'>
                                <div className='outer-bg'>
                                    <div className='section-img'></div>
                                    <div className='section-text text-center'>
                                        <div className='section-slide-title'>PGS.TS.BS Hỏi Dân IT</div>
                                        <div className='section-slide-name'>Cơ Xương Khớp 3</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-slide'>
                                <div className='outer-bg'>
                                    <div className='section-img'></div>
                                    <div className='section-text text-center'>
                                        <div className='section-slide-title'>PGS.TS.BS Hỏi Dân IT</div>
                                        <div className='section-slide-name'>Cơ Xương Khớp 4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-slide'>
                                <div className='outer-bg'>
                                    <div className='section-img'></div>
                                    <div className='section-text text-center'>
                                        <div className='section-slide-title'>PGS.TS.BS Hỏi Dân IT</div>
                                        <div className='section-slide-name'>Cơ Xương Khớp 5</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-slide'>
                                <div className='outer-bg'>
                                    <div className='section-img'></div>
                                    <div className='section-text text-center'>
                                        <div className='section-slide-title'>PGS.TS.BS Hỏi Dân IT</div>
                                        <div className='section-slide-name'>Cơ Xương Khớp 6</div>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
