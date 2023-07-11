import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            dataProfile:data,
        })
    }

    getInfoDoctor= async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }

        return result;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderTimeBooking = (dataTime) => {
        let {language} = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
            dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ?
            this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY'))
            :
            moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return(
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id='patient.booking-modal.priceBooking' /></div>
                </>
            )
        }
    }

    componentDidUpdate(preprops, prestate, snapshot) {

    }


    render() {
        let {dataProfile} = this.state;
        let {language, isShowDescriptionDoctor, dataTime} = this.props;

        let nameVi = '';
        let nameEn = '';
        if (dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }

        // console.log('check props dataTime: ',dataTime);
        return (
            <div className='profile-doctor-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <div className='image' style={{ backgroundImage: `url(${dataProfile.image})` }} >

                            </div>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                { isShowDescriptionDoctor === true ?
                                    <>
                                        {dataProfile.Markdown &&
                                            <span>
                                                {dataProfile.Markdown.description}
                                            </span>
                                        }
                                    </>
                                    :
                                    <>
                                        {this.renderTimeBooking(dataTime)}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='price'>
                    <FormattedMessage id='patient.booking-modal.price' /> 
                                {dataProfile.Doctor_info && dataProfile.Doctor_info.priceTypeData && language === LANGUAGES.VI &&
                                    <NumberFormat
                                        className='currency'
                                        value={dataProfile.Doctor_info.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                }
                                {dataProfile.Doctor_info && dataProfile.Doctor_info.priceTypeData && language === LANGUAGES.EN &&
                                    <NumberFormat
                                        className='currency'
                                        value={dataProfile.Doctor_info.priceTypeData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />
                                }
                    </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
