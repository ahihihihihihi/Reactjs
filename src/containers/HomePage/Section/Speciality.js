import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';



class Speciality extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty:[],
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty:res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }

    componentDidUpdate(preprops, prestate, snapshot) {

    }


    render() {
        let {dataSpecialty} = this.state;
        // console.log('check state: ',this.state);
        return (
            <div className='section-share section-speciality'>
                <div className='section-content'>
                    <div className='section-header'>
                        <div className='section-header-title'>
                            <h2><FormattedMessage id='homepage.specialty-popular' /></h2>
                        </div>
                        <div className=''>
                            <button className='section-header-button'><FormattedMessage id='homepage.more-info' /></button>
                        </div>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item,index) => {
                                    return (
                                        <div className='section-slide' key={index}
                                            onClick={()=>this.handleViewDetailSpecialty(item)}
                                        >
                                            <div className='section-img' style={{ backgroundImage: `url(${item.image})` }}></div>
                                            <div className='section-slide-title'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Speciality));
