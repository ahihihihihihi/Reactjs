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
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: '',
            hasOldData:false,
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctorsRedux();
    }

    componentDidUpdate(preprops, prestate, snapshot) {
        let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        if (preprops.allDoctors !== this.props.allDoctors) {
            this.setState({
                listDoctors: dataSelect,
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
        }, this.setState({hasOldData:true,}))
    }

    handleChangeSelect = async(selectedOption) => {
        this.setState({ selectedOption });
        let res = await getDetailInfoDoctor(selectedOption.value);
        // console.log('handleChangeSelect: ',res)
        if (res && res.errCode === 0 && res.data && res.data.Markdown && (res.data.Markdown.contentMarkdown || res.data.Markdown.description)) {
            this.setState({
                contentMarkdown: res.data.Markdown.contentMarkdown,
                description: res.data.Markdown.description,
                contentHTML:res.data.Markdown.contentHTML,
                hasOldData:true,
            })
        } else {
            this.setState({
                contentMarkdown: '',
                description: '',
                contentHTML:'',
                hasOldData:false,
        })
        }  
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }

        return result;
    }

    render() {
        // console.log('list doctors from redux: ', this.state);
        let {hasOldData} = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin bác sĩ
                </div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>

                    <div className='content-right form-group'>
                        <label>Thông tin giới thiệu</label>
                        <textarea
                            className='form-control' rows='4'
                            value={this.state.description}
                            onChange={(event) => this.handleOnChangeDesc(event)}
                        >

                        </textarea>
                    </div>
                </div>
                <div className='manager-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === false ? 'update-content-doctor' : 'save-content-doctor'}>
                    {hasOldData === false ? 'Lưu thông tin' : 'Update thông tin'}
                </button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
