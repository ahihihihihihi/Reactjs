import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: ''
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(preprops, prestate, snapshot) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
        // console.log('handleEditorChange', html, text);
    }

    handleSaveContentMarkdown = () => {
        console.log(`check state after click button:`, this.state)
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin bác sĩ
                </div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selecteddoctor}
                            onChange={this.handleChange}
                            options={options}
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
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className='save-content-doctor'>
                    Lưu thông tin
                </button>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
