import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser';


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
            arrCheck: { email: 'Email', password: 'Mật khẩu', firstName: 'Tên', lastName: 'Họ', phoneNumber: 'Số điện thoại', address: 'Địa chỉ' },

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            positionId: '',
            roleId: '',
            avatar: '',
            action: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(preprops, prestate, snapshot) {
        //render --> didupdate
        //now(this) vs past(previous)

        if (preprops.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
            // console.log('didupdate: ', this.props.genderRedux);
        } else {
            // console.log('didupdate: no update!');
        }

        if (preprops.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                positionId: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        } else {

        }

        if (preprops.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: arrRole,
                roleId: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })
        } else {

        }

        if (preprops.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrPosition = this.props.positionRedux;
            let arrRole = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                positionId: '',
                roleId: '',
                avatar: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                positionId: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '',
                roleId: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            })
        } else {

        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log('read file to base 64: ', base64);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
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

    handleSaveUser = () => {
        // console.log('check state before submit: ', this.state);
        let isValid = this.checkValidInput();
        if (isValid === false) {
            return
        }
        let { action } = this.state;
        // let action = this.state.action;
        if (action === CRUD_ACTIONS.CREATE) {
            // fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.roleId,
                positionId: this.state.positionId,
                avatar: this.state.avatar,
            })
        }

        if (action === CRUD_ACTIONS.EDIT) {
            // fire redux update user
            this.props.updateUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.roleId,
                positionId: this.state.positionId,
                avatar: this.state.avatar,
            })
        }


    }

    checkValidInput = () => {
        let isValid = true;
        if (this.props.language === 'en') {
            this.setState({
                arrCheck: { email: 'Email', password: 'Password', firstName: 'First name', lastName: 'Last name', phoneNumber: 'Phone number', address: 'Address' }
            })
        } else {
            this.setState({
                arrCheck: { email: 'Email', password: 'Mật khẩu', firstName: 'Tên', lastName: 'Họ', phoneNumber: 'Số điện thoại', address: 'Địa chỉ' }
            })
        }
        // console.log('check state: ', this.state);
        for (let i = 0; i < Object.keys(this.state.arrCheck).length; i++) {
            let key = Object.keys(this.state.arrCheck)[i];
            // console.log('key: ', key);
            if (!this.state[key]) {
                isValid = false;
                if (this.props.language === 'en') {
                    alert('This input is required: ' + this.state.arrCheck[key]);
                } else {
                    alert('Ô dữ liệu cần phải nhập vào: ' + this.state.arrCheck[key]);
                }
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            // console.log('check input onchange: ', this.state);
        })

    }

    handleEditUserFromParent = (user) => {
        // console.log('info user from child: ', user)
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            positionId: user.positionId,
            roleId: user.roleId,
            avatar: user.avatar,
            gender: user.gender,
            positionId: user.positionId,
            roleId: user.roleId,
            userEditId: user.id,
            action: CRUD_ACTIONS.EDIT,
            previewImgURL: imageBase64,
        })
    }

    render() {
        // console.log('allcode check state: ', this.state);
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGenders = this.props.isGetGendersRedux;
        let { email, password, firstName, lastName, phoneNumber, address, gender, positionId, roleId, avatar } = this.state;
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
                                <input type='email' disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} className='form-control' value={email} onChange={(event) => { this.onChangeInput(event, 'email') }} />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input type='password' disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} className='form-control' value={password} onChange={(event) => { this.onChangeInput(event, 'password') }} />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input type='text' className='form-control' value={firstName} onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input type='text' className='form-control' value={lastName} onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input type='number' className='form-control' value={phoneNumber} onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                            </div>
                            <div className='col-9'>
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input type='text' className='form-control' value={address} onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select class="form-control" value={gender} onChange={(event) => { this.onChangeInput(event, 'gender') }}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                < option key={index} value={item.key} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select class="form-control" value={positionId} onChange={(event) => { this.onChangeInput(event, 'positionId') }}>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                < option key={index} value={item.key} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.role" /> </label>
                                <select class="form-control" value={roleId} onChange={(event) => { this.onChangeInput(event, 'roleId') }}>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                < option key={index} value={item.key} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
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
                            <div className='col-12 my-3'>
                                <button onClick={() => this.handleSaveUser()} className={this.state.action === CRUD_ACTIONS.EDIT ? `btn btn-warning btn-save` : `btn btn-primary btn-save`}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}</button>
                            </div>
                            <div className='col-12'>
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
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
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        updateUserRedux: (data) => dispatch(actions.updateUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
