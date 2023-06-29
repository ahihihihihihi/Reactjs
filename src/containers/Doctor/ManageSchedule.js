import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from '../../store/actions'
import { CRUD_ACTIONS, LANGUAGES } from '../../utils';
import DatePicker from '../../components/Input/DatePicker';


class Doctor extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            listDoctors:[],
            selectedDoctor:{},
            selectedOption:{},
            currentDate:'',        
        }
    }
   
   
    async componentDidMount() {
        this.props.fetchAllDoctorsRedux();
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

    render() {
        // console.log('check state: ', this.state);
        return (
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <label>
                                    Chọn Bác sĩ
                                </label>
                                <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                            </div>
                            <div className='col-6'>
                                <label>
                                    Chọn ngày
                                </label>
                                <DatePicker 
                                onChange = {this.handleOnChangeDatePicker}
                                className = 'form-control'
                                value = {this.state.currentDate}
                                minDate = {new Date()}
                                />
                            </div>
                            <div className='col-12 pick-hour-container my-3'>
                                
                            </div>
                            <button className='btn btn-primary btn-m-s'>Lưu thông tin</button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
