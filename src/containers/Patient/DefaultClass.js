import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

class DefaultClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    async componentDidMount() {
        
    }

    componentDidUpdate(preprops, prestate, snapshot) {

    }


    render() {

        return (
            <React.Fragment>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
