import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";


class Doctor extends Component {
    render() {
        const {isLoggedIn } = this.props;
        return (
            <React.Fragment>
                <div className='manage-schedule'>
                    manage schedule.
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
