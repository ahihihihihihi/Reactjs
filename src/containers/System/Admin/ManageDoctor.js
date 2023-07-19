import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: '',
            hasOldData:false,

            //save to doctor_info table
            listPrice:[],
            listPayment:[],
            listProvince:[],
            listClinic:[],
            listSpecialty:[],

            selectedPrice:'',
            selectedPayment:'',
            selectedProvince:'',
            selectedClinic:'',
            selectedSpecialty:'',

            nameClinic:'',
            addressClinic:'',
            note:'',

        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchRequiredDoctorInfo();
    }

    componentDidUpdate(preprops, prestate, snapshot) {
        let dataSelect = this.buildDataInputSelect(this.props.allDoctors,'USERS');
        let {resPrice, resPayment, resProvince, resSpecialty} = this.props.allRequiredDoctorInfo;
        let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
        let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
        let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
        let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');

        if (preprops.allDoctors !== this.props.allDoctors) {
            this.setState({
                listDoctors: dataSelect,
            })
        }

        if (preprops.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let {resPrice, resPayment, resProvince} = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');

            // console.log('data required doctor info: ', dataSelectPrice, dataSelectPayment,dataSelectProvince);

            this.setState({
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince:dataSelectProvince,
                listSpecialty:dataSelectSpecialty,
            })
        }

        if (preprops.language !== this.props.language) {
            for (let i = 0; i < dataSelect.length; i++) {
                if (dataSelect[i].value === this.state.selectedOption.value) {
                    let label = dataSelect[i].label;
                    let value = dataSelect[i].value;
                    this.setState({
                        selectedOption: { label, value }
                    })
                    break;
                }
            }
            
            this.setState({
                listDoctors: dataSelect,
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince:dataSelectProvince,
                listSpecialty:dataSelectSpecialty,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
        // console.log('handleEditorChange', html, text);
    }

    handleSaveContentMarkdown = () => {
        // console.log(`check state after click button:`, this.state)
        let {hasOldData} = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action:hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice:this.state.selectedPrice.value,
            selectedPayment:this.state.selectedPayment.value,
            selectedProvince:this.state.selectedProvince.value,
            nameClinic:this.state.nameClinic,
            addressClinic:this.state.addressClinic,
            note:this.state.note,
            clinicId:this.state.selectedClinic ? this.state.selectedClinic.value : 0,
            specialtyId:this.state.selectedSpecialty.value,

        }, this.setState({hasOldData:true,}))
    }

    handleChangeSelect = async(selectedOption) => {
        this.setState({ selectedOption });
        let {listPrice, listPayment,listProvince, listSpecialty} = this.state;
        let res = await getDetailInfoDoctor(selectedOption.value);
        // console.log('handleChangeSelect: ',res)
        if (res && res.errCode === 0 && res.data && res.data.Markdown && (res.data.Markdown.contentMarkdown || res.data.Markdown.description)) {
            let 
            addressClinic = '', 
            nameClinic = '', 
            note = '', 
            paymentId = '', 
            priceId = '',
            provinceId = '',
            specialtyId = '',
            selectedPrice = '',
            selectedPayment = '',
            selectedProvince = '',
            selectedSpecialty = ''
            ;


            if (res.data.Doctor_info) {
                addressClinic = res.data.Doctor_info.addressClinic;
                nameClinic = res.data.Doctor_info.nameClinic;
                note = res.data.Doctor_info.note;
                paymentId = res.data.Doctor_info.paymentId;
                priceId = res.data.Doctor_info.priceId;
                provinceId = res.data.Doctor_info.provinceId;
                specialtyId = res.data.Doctor_info.specialtyId;
                
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })

                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
            }

            this.setState({
                contentMarkdown: res.data.Markdown.contentMarkdown,
                description: res.data.Markdown.description,
                contentHTML:res.data.Markdown.contentHTML,
                hasOldData:true,
                addressClinic:addressClinic,
                nameClinic:nameClinic,
                note:note,
                selectedPrice:selectedPrice,
                selectedPayment:selectedPayment,
                selectedProvince:selectedProvince,
                selectedSpecialty:selectedSpecialty
            })
        } else {
            this.setState({
                contentMarkdown: '',
                description: '',
                contentHTML:'',
                hasOldData:false,
                addressClinic:'',
                nameClinic:'',
                note:'',
                selectedPrice:'',
                selectedPayment:'',
                selectedProvince:'',
                selectedSpecialty:''
        })
        }  
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleChangeSelectedDoctorInfo = (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        })
    }

    handleOnChangeText = (event,id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        })
    }

    buildDataInputSelect = (inputData,type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE' || type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = item.valueVi;
                    let labelEn = item.valueEn;
                    if (type === 'PRICE') {
                        labelVi += ' VNĐ';
                        labelEn += ' USD'
                    }
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
            
        }

        return result;
    }

    render() {
        // console.log('check state: ', this.state);
        let {hasOldData} = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id='admin.manage-doctor.title' />
                </div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label><FormattedMessage id='admin.manage-doctor.select-doctor' /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id='admin.manage-doctor.select-doctor' />}
                        />
                    </div>

                    <div className='content-right form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                        <textarea
                            className='form-control'
                            value={this.state.description}
                            onChange={(event) => this.handleOnChangeText(event,'description')}
                        >

                        </textarea>
                    </div>
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.price' /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listPrice}
                            placeholder={
                                <>
                                <FormattedMessage id='patient.detail-doctor.choose' />
                                <FormattedMessage id='admin.manage-doctor.price' />
                                </>
                            }
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.payment' /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listPayment}
                            placeholder={
                                <>
                                    <FormattedMessage id='patient.detail-doctor.choose' />
                                    <FormattedMessage id='admin.manage-doctor.payment' />
                                </>
                            }
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.province' /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listProvince}
                            placeholder={
                                <>
                                    <FormattedMessage id='patient.detail-doctor.choose' />
                                    <FormattedMessage id='admin.manage-doctor.province' />
                                </>
                            }
                            name="selectedProvince"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.nameClinic' /></label>
                        <input className='form-control' 
                        onChange={(event) => this.handleOnChangeText(event,'nameClinic')}
                        value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.addressClinic' /></label>
                        <input className='form-control' 
                        onChange={(event) => this.handleOnChangeText(event,'addressClinic')}
                        value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input className='form-control' 
                        onChange={(event) => this.handleOnChangeText(event,'note')}
                        value={this.state.note}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.specialty' /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listSpecialty}
                            placeholder={
                                <>
                                    <FormattedMessage id='patient.detail-doctor.choose' />
                                    <FormattedMessage id='admin.manage-doctor.specialty' />
                                </>
                            }
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.clinic' /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listClinic}
                            placeholder={
                                <>
                                    <FormattedMessage id='patient.detail-doctor.choose' />
                                    <FormattedMessage id='admin.manage-doctor.clinic' />
                                </>
                            }
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className='manager-doctor-editor'>
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === false ? 'update-content-doctor' : 'save-content-doctor'}>
                    {hasOldData === false ? 
                    <FormattedMessage id='admin.manage-doctor.add' />
                    : 
                     <FormattedMessage id='admin.manage-doctor.save' />
                     }
                </button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchRequiredDoctorInfo: () => dispatch(actions.fetchRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
