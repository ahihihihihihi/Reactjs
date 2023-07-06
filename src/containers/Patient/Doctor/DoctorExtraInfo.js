import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
        }
    }

    async componentDidMount() {
        
    }

    componentDidUpdate(preprops, prestate, snapshot) {

    }

    showHideDetailInfo = (isShowDetailInfo) => {
        this.setState({
            isShowDetailInfo:!isShowDetailInfo,
        })
        
    }

    render() {
        let {isShowDetailInfo} = this.state;
        return (
            <React.Fragment>
                <div className='doctor-extra-info-container'>
                    <div className='content-up'>
                        <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                        <div className='name-clinic'>Phòng khám Bệnh viện Đại học Y Dược 1</div>
                        <div className='detail-address'>20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM</div>
                    </div>
                    <div className='content-down'>
                        {isShowDetailInfo === false &&
                            <div className='short-info'>
                                GIÁ KHÁM: 250.000đ.
                                <span onClick={()=>this.showHideDetailInfo(isShowDetailInfo)}>
                                    xem chi tiết
                                </span>
                            </div>
                        }
                        {isShowDetailInfo === true &&
                            <>
                                <div className='title-price'>GIÁ KHÁM:</div>
                                <div className='detail-info'>
                                    <div className='price'>
                                        <span className='left'>Giá khám</span>
                                        <span className='right'>250.000đ</span>
                                    </div>
                                    <div className='note'>Được ưu tiên khám khi đặt khám qua Booking care</div>
                                </div>
                                <div className='payment'>
                                    Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ
                                </div>
                                <div className='hide-price'>
                                <span onClick={()=>this.showHideDetailInfo(isShowDetailInfo)}>
                                    Ẩn bảng giá
                                </span>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
