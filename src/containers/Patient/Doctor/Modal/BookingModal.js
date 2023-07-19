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
import { toast } from 'react-toastify';
import moment from 'moment';


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

    componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
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

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildTimeBooking = (dataTime) => {
        let {language} = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
            dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ?
            this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY'))
            :
            moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return `${time} - ${date}`;
        }
        return``;
    }

    buildDoctorName = (dataTime) => {
        let {language} = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
            `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` 
            : 
            `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name;
        }
        return``;
    }

    handleConfirmBooking = async () => {
        //validate input
        // console.log('check state: ',this.state);
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);

        let res = await postPatientBookAppointment({
            fullName:this.state.fullName,
            phoneNumber:this.state.phoneNumber,
            email:this.state.email,
            address:this.state.address,
            reason:this.state.reason,
            date:date,
            selectedGender:this.state.selectedGender.value,
            doctorId:this.state.doctorId,
            timeType:this.state.timeType,
            language:this.props.language,
            timeString:timeString,
            doctorName:doctorName
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment successfully!');
            this.props.closeBookingClose();
        } else {
            toast.error('Booking a new appointment error!');
        }
    }


    render() {
        let {isOpenModal, closeBookingClose, dataTime} = this.props;
        // let doctorId = '';
        // if (dataTime && !_.isEmpty(dataTime)) {
        //     doctorId = dataTime.doctorId;
        // }
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        // console.log('dataTime: ',dataTime);
        // console.log('check state: ',this.state);
        // console.log('check props: ',this.props);
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
                        <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
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
                                isShowLinkDetail={false}
                                isShowPrice={true}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.fullName' /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event,'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.phoneNumber' /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event,'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event,'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event,'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event,'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                <DatePicker 
                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.gender' /></label>
                                <Select 
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                        onClick={()=>this.handleConfirmBooking()}
                        >
                           <FormattedMessage id='patient.booking-modal.btnConfirm' />     
                        </button>
                        <button className='btn-booking-cancel'
                        onClick={closeBookingClose}
                        >
                            <FormattedMessage id='patient.booking-modal.btnCancel' />
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
        genders:state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
