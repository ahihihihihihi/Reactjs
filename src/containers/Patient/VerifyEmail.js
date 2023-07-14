import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './VerifyEmail.scss';
import HomeHeader from '../HomePage/HomeHeader';
import { postVerifyBookAppointment } from '../../services/userService';

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify:false,
            errCode:0,
        }
    }

    async componentDidMount() {
       if (this.props.location && this.props.location.search) {
        let urlParams = new URLSearchParams(this.props.location.search);
        let token = urlParams.get('token');
        let doctorId = urlParams.get('doctorId');
        let res = await postVerifyBookAppointment({
            token:token,
            doctorId:doctorId
        })
        
        if (res.errCode === 0 && res) {
            this.setState({
                statusVerify:true,
                errCode:res.errCode
            })
        } else {
            this.setState({
                statusVerify:true,
                errCode:res.errCode && res ? res.errCode : -1
            })
        }
        
       } 
    }

    componentDidUpdate(preprops, prestate, snapshot) {

    }


    render() {
        let {statusVerify,errCode} = this.state;
        // console.log('check state: ',this.state);
        return (
            <React.Fragment>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>
                            Loading data...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ? 
                                 <div className='info-booking'>Xác nhận lịch hẹn thành công</div>
                                 :
                                 <div className='info-booking'>Lịch hẹn đã được xác nhận hoặc không tồn tại</div>    
                            }
                        </div>    
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
