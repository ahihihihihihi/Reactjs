import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
        // console.log(event.target.value);
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
        //console.log(event.target.value);
    }

    handleLogin = async () => {
        //console.log('Username: ', this.state.username, " Password: ", this.state.password);
        //console.log('All state: ', this.state);
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                //todo
                this.props.userLoginSuccess(data.user);
                console.log('login successfully!');
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }

        //alert('login successfully!');
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        console.log('check key code, key down: ',event);
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }

    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input className='form-control' type='text' placeholder='Enter your username...' value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input 
                                className='form-control' 
                                type={this.state.isShowPassword ? 'text' : 'password'} placeholder='Enter your password...' 
                                onChange={(event) => this.handleOnChangePassword(event)} 
                                onKeyDown={(event)=>this.handleKeyDown(event)}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }} ><i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i></span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }} >Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span>or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google" ></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
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
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
