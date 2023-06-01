import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils'

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService("gender");
            if (res.errCode === 0) {
                this.setState({
                    genderArr: res.data,
                })
            } else {

            }
            // console.log("allcode check res: ", res);
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        // console.log('allcode check state: ', this.state);
        let genders = this.state.genderArr;
        let language = this.props.language;
        return (
            <div className='user-redux-container'>
                <div className="user-redux-title text-center title" >
                    Dùng React-Redux thay cho việc gọi api
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input type='email' className='form-control' />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input type='password' className='form-control' />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input type='number' className='form-control' />
                            </div>
                            <div className='col-9'>
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input type='text' className='form-control' />
                            </div>
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select class="form-control">
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                < option key={index} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select class="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.role" /> </label>
                                <select class="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary btn-save'><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
