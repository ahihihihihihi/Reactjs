import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic:[],
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic:res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }

    render() {
        let {dataClinic} = this.state;
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-content'>
                    <div className='section-header'>
                        <div className='section-header-title'>
                            <h2>Cơ sở y tế nổi bật</h2>
                        </div>
                        <div className=''>
                            <button className='section-header-button'>xem thêm</button>
                        </div>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item,index) => {
                                    return (
                                        <div className='section-slide' key={index}
                                            onClick={()=>this.handleViewDetailClinic(item)}
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
