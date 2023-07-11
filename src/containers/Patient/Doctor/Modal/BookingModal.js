import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { Toast } from 'react-toastify';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName:'',
            phoneNumber:'',
            email:'',
            address:'',
            reason:'',
            birthday:'',
            selectedGender:'',
            doctorId:'',
            genders:'',
            timeType:'',
        }
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.lenghth > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(preprops, prestate, snapshot) {
        if (preprops.language !== this.props.language || preprops.genders !== this.props.genders) {
            this.setState({
                genders:this.buildDataGender(this.props.genders),
            })
        }

        if (preprops.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId:doctorId,
                    timeType:timeType
                })
            }
        }
    }

    handleOnchangeInput = (event,id) => {
        let valueInput = event.target.value;
        let copyState = {...this.state};
        copyState[id] = valueInput;
        this.setState({
            ...copyState
        })
    } 

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday:date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({selectedGender:selectedOption})
    }

    handleConfirmBooking = async () => {
        
    }


    render() {
        let {isOpenModal, closeBookingClose, dataTime} = this.props;
        // let doctorId = '';
        // if (dataTime && !_.isEmpty(dataTime)) {
        //     doctorId = dataTime.doctorId;
        // }
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        // console.log('dataTime: ',dataTime);
        return (
            <React.Fragment>
                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size='lg'
                    centered
                
                >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lệnh khám bệnh</span>
                        <span 
                            className='right'
                            onClick={closeBookingClose}
                        >
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ & tên</label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ email</label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lý do khám</label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Đặt cho ai</label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <input className='form-control'/>
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                        onClick={closeBookingClose}
                        >
                           Xác nhận     
                        </button>
                        <button className='btn-booking-cancel'
                        onClick={closeBookingClose}
                        >
                            Cancel
                        </button>    
                    </div>
                </div>
            </Modal>
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
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
