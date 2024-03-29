import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInfoDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import Comment from '../SocialPlugin/Comment';
require('dotenv').config();

class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId:id
            })
            let res = await getDetailInfoDoctor(id);
            // console.log('data doctor: ', res);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(preprops, prestate, snapshot) {

    }


    render() {
        // console.log('id doctor: ', this.props.match.params.id)
        // console.log('check state: ', this.state)
        let { detailDoctor } = this.state;
        let { language } = this.props;
        let nameVi = '';
        let nameEn = '';
        if (detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 0 ? 'https://nodomain.com' : window.location.href;

        // console.log('info doctor: ', detailDoctor, nameVi, nameEn)
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <div className='image' style={{ backgroundImage: `url(${detailDoctor.image})` }} >

                            </div>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor.Markdown &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                                <div className='like-share-plugin'>
                                    <LikeAndShare
                                        dataHref={currentURL}
                                    />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule 
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>  
                        <div className='content-right'>
                            <DoctorExtraInfo
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>                        
                    </div>
                    <div className='detail-info-doctor'>
                        {detailDoctor.Markdown &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className='comment-doctor'>
                        <Comment
                            dataHref={currentURL}
                            width={"100%"}
                        />
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
