import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";

import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class OutstandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDortors: [],
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(preprops, prestate, snapshot) {
        if (preprops.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDortors: this.props.topDoctorsRedux
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        // console.log('view detail doctor: ', doctor)
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        // console.log('check top doctors redux: ', this.props.topDoctorsRedux)
        let arrDortors = this.state.arrDortors;
        let { language } = this.props;
        // console.log('check array top doctors loop: ', arrDortors);
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-content'>
                    <div className='section-header'>
                        <div className='section-header-title'>
                            <h2><FormattedMessage id="homepage.outstanding-doctor" /></h2>
                        </div>
                        <div className=''>
                            <button className='section-header-button'><FormattedMessage id="homepage.more-info" /></button>
                        </div>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDortors && arrDortors.length > 0 &&
                                arrDortors.map((item, index) => {
                                    // if (index === 0) {
                                    //     console.log('check item: ', item);
                                    // }
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div className='section-slide' key={index}
                                            onClick={() => this.handleViewDetailDoctor(item)}
                                        >
                                            <div className='outer-bg'>
                                                <div className='section-img' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                <div className='section-text text-center'>
                                                    <div className='section-slide-title'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div className='section-slide-name'>Cơ Xương Khớp {index}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
