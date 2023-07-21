import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        }
    }

    async componentDidMount() {
        
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate:date[0],
        })
    }

    componentDidUpdate(preprops, prestate, snapshot) {

    }


    render() {

        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>
                            Chọn ngày khám
                        </label>
                        <DatePicker 
                            onChange = {this.handleOnChangeDatePicker}
                            className = 'form-control'
                            value = {this.state.currentDate}
                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        Table Patient
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
