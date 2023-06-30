import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from '../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../utils';
import DatePicker from '../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import moment from 'moment';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../services/userService';


class Doctor extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            listDoctors:[],
            selectedDoctor:{},
            selectedOption:{},
            currentDate:'', 
            rangeTime:[],       
        }
    }
   
   
    async componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTime();
    }
 
    componentDidUpdate(preprops, prestate, snapshot) {
        let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        if (preprops.allDoctors !== this.props.allDoctors) {
            this.setState({
                listDoctors: dataSelect,
            })
        }

        if (preprops.language !== this.props.language) {
            for (let i = 0; i < dataSelect.length; i++) {
                if (dataSelect[i].value === this.state.selectedOption.value) {
                    let label = dataSelect[i].label;
                    let value = dataSelect[i].value;
                    this.setState({
                        selectedOption: { label, value }
                    })
                    break;
                }
            }
            this.setState({
                listDoctors: dataSelect,
            })
        }

        if (preprops.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item,
                    isSelected:false
                }))
            }
            // console.log('check data: ',data);
            this.setState({
                rangeTime: data,
            })
        }

    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }

        return result;
    }

    handleChangeSelect = async(selectedOption) => {
        this.setState({ 
            selectedDoctor:selectedOption,
            selectedOption:selectedOption
         });

        }  

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate:date[0],
        })
    }

    handleClickBtnTime = (time) => {
        
        let {rangeTime} = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item
            })
            // console.log('rangeTime update: ',rangeTime);
            this.setState({
                rangeTime:rangeTime,
            })
        }
    }

    handleSaveSchedule = () => {
        let {rangeTime,selectedDoctor,currentDate} = this.state;

        if (!currentDate) {
            toast.error('Invalid date!');
            return
        }

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid selected doctor!');
            return
        }

        let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let result = [];

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.time = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error('Invalid selected time!');
                return
            }

            console.log('Schedule: ',result)
        }

        saveBulkScheduleDoctor(result);


        // console.log('check state current date: ',moment(currentDate).format('DD/MM/YYYY'))
    }

    render() {
        // console.log('check state: ', this.state);
        // console.log('check props: ', this.props);
        let {rangeTime} = this.state;
        let {language} = this.props;
        return (
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                                </label>
                                <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                            </div>
                            <div className='col-6'>
                                <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                                </label>
                                <DatePicker 
                                onChange = {this.handleOnChangeDatePicker}
                                className = 'form-control'
                                value = {this.state.currentDate}
                                minDate = {new Date()}
                                disable = {[new Date()]}
                                />
                            </div>
                            <div className='col-12 pick-hour-container my-3'>
                            {rangeTime && rangeTime.length > 0 &&
                                        rangeTime.map((item, index) => {
                                            return (
                                                <button 
                                                className={item.isSelected === true ? 'btn btn-schedule active  ' : 'btn btn-schedule'} 
                                                key={index}
                                                onClick={()=>this.handleClickBtnTime(item)}
                                                >
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </button>
                                            )
                                        })
                                    }
                            </div>
                            <button 
                            className='btn btn-primary btn-m-s'
                            onClick={()=>this.handleSaveSchedule()}
                            ><FormattedMessage id="manage-schedule.save" /></button>
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
