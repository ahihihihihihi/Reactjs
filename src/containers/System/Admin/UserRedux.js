import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        // try {
        //     let res = await getAllCodeService("gender");
        //     if (res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         })
        //     } else {

        //     }
        //     // console.log("allcode check res: ", res);
        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(preprops, prestate, snapshot) {
        //render --> didupdate
        //now(this) vs past(previous)

        if (preprops.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
            // console.log('didupdate: ', this.props.genderRedux);
        } else {
            // console.log('didupdate: no update!');
        }

        if (preprops.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        } else {

        }

        if (preprops.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        } else {

        }
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl
            })
        }
        // console.log('Onchange image: ', objectUrl)
    }

    openImagePreview = () => {
        if (!this.state.previewImgURL) {
            return;
        }
        this.setState({
            isOpen: true
        })
    }

    render() {
        // console.log('allcode check state: ', this.state);
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGenders = this.props.isGetGendersRedux;
        // console.log('check gender from redux props: ', this.props.isGetGendersRedux);
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
                            <div className='col-12'>
                                {isGetGenders ? 'Loading genders...' : ''}
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
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select class="form-control">
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                < option key={index} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.role" /> </label>
                                <select class="form-control">
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                < option key={index} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden onChange={(event) => this.handleOnchangeImage(event)} />
                                    <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="manage-user.upload-image" /> <i className='fas fa-upload'></i></label>
                                    <div className='border-image' onClick={() => this.openImagePreview()}>
                                        <div className='preview-image' style={{ backgroundImage: `url(${this.state.previewImgURL})` }} ></div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary btn-save'><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isGetGendersRedux: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
