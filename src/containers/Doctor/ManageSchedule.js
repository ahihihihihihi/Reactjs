import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';

class Doctor extends Component {
    render() {
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
                                <input className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>
                                    Chọn ngày
                                </label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
