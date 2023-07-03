import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss';
import localization from 'moment/locale/vi';
import moment from 'moment';
import { getScheduleDoctorByDate } from '../../../services/userService';

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
        this.setArrDays(language);
    }

    setArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = (object.label).charAt(0).toUpperCase() + (object.label).slice(1);
                object.label = (object.label).substring(0,4) + (object.label).charAt(4).toUpperCase() + (object.label).slice(5);
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays:allDays
        })
    }

    componentDidUpdate(preprops, prestate, snapshot) {
        if (preprops.language !== this.props.language) {
            this.setArrDays(this.props.language);
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
                        <i className='fas fa-calendar-alt'><span>Lịch khám</span></i>
                    </div>
                    <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length > 0 ?
                        allAvailableTime.map((item,index)=>{
                            let timeDisplay = language === LANGUAGES.VI ?
                            item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                            return(
                                <button key={index}>{timeDisplay}</button>
                            )
                        })
                        :
                        <div className='no-calendar'>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác</div>
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
