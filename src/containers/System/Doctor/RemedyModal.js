import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            imgBase64:''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email:this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(preprops, prestate, snapshot) {
        if (preprops.dataModal !== this.props.dataModal) {
            this.setState({
                email:this.props.dataModal.email
            })
        }
    }

    handleOnchangeEmail = (event) => {
        this.setState({
            email:event.target.value
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log('read file to base 64: ', base64);
            this.setState({
                imgBase64:base64
            })
        }
        // console.log('Onchange image: ', objectUrl)
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }


    render() {
        let {isOpenModal, closeRemedyModal,sendRemedy,dataModal} = this.props;
        return (
            <React.Fragment>
                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size='md'
                    centered
                >
                    <ModalHeader toggle={closeRemedyModal}>Gởi hóa đơn khám bệnh thành công</ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email bệnh nhân</label>
                                <input className='form-control' type='email' value={this.state.email} onChange={(event) => this.handleOnchangeEmail(event)} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Chọn file đơn thuốc</label>
                                <input className='form-control-file' type='file' onChange={(event) => this.handleOnchangeImage(event)} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>
                        Send
                    </Button>{' '}
                    <Button color="secondary" onClick={closeRemedyModal}>
                        Cancel
                    </Button>
                    </ModalFooter>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
