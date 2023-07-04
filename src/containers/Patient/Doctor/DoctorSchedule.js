import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss';
import localization from 'moment/locale/vi';
import moment from 'moment';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays:[],
            allAvailableTime:[],
        }
    }

    async componentDidMount() {
        let {language} = this.props;
        // console.log('moment vi: ', moment(new Date()).format('dddd - DD/MM'));
        // console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'));
        let allDays = this.getArrDays(language);
        this.setState({
            allDays:allDays
        })
        
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            // if (language === LANGUAGES.VI) {
            //     object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            //     object.label = (object.label).charAt(0).toUpperCase() + (object.label).slice(1);
            //     object.label = (object.label).substring(0,4) + (object.label).charAt(4).toUpperCase() + (object.label).slice(5);
            // } else {
            //     object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            // }
            // object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            // allDays.push(object);

            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }

    async componentDidUpdate(preprops, prestate, snapshot) {
        if (preprops.language !== this.props.language) {
            this.componentDidMount();
        }
        if (preprops.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent,allDays[0].value);
            this.setState({
                allAvailableTime:res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async(event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId,date);
            // console.log('check res schedule from react: ', res);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime:res.data ? res.data : []
                })
            }
            
        }
    }


    render() {
        let {allDays, allAvailableTime} = this.state;
        let {language} = this.props;
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                    {allDays && allDays.length > 0 &&
                        allDays.map((item, index)=>{
                            return (
                                <option
                                value={item.value}
                                key={index}
                                >
                                    {item.label}
                                </option>
                            )
                        })
                    }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i className='fas fa-calendar-alt'>
                            <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                        </i>
                    </div>
                    <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length > 0 ?
                        <>
                        <div className='time-content-btns'>
                        {allAvailableTime.map((item,index)=>{
                            let timeDisplay = language === LANGUAGES.VI ?
                            item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                            return(
                                <button key={index}
                                className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                >
                                    {timeDisplay}
                                </button>
                            )
                        })}
                        </div>
                        <div className='book-free'>
                            <span>
                            <FormattedMessage id="patient.detail-doctor.choose" />
                            <i className='far fa-hand-point-up'></i>
                            <FormattedMessage id="patient.detail-doctor.book-free" />
                            </span>
                        </div>    
                    </>
                        :
                        <div className='no-schedule'><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                        
                        
                        }
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
<FormattedMessage id="patient.detail-doctor." />