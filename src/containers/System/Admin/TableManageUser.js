import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';



const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        }
    }

    async componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(preprops, prestate, snapshot) {
        if (preprops.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers,
            })
        }
    }

    handleDeleteUser = (user) => {
        // console.log('user: ', user)
        this.props.deleteUserRedux(user.id);
    }

    handleUpdateUser = (user) => {
        // console.log('Update user: ', user);
        this.props.handleEditUserFromParentKey(user);
    }

    render() {
        // console.log('check list users from redux: ', this.props.listUsers);
        // console.log('check state usersRedux: ', this.state.usersRedux);
        let arrUsers = this.state.usersRedux;
        return (
            <React.Fragment>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' ><i className="fas fa-pencil-alt" onClick={() => this.handleUpdateUser(item)}></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)} ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
