import React, {Component} from 'react';
import logo from '../logo.svg';
import 'react-table/react-table.css';
import {connect} from 'react-redux';

import {Button, Table, DropdownButton, MenuItem, Col, Grid, Row} from 'react-bootstrap'

import '../App.css';
import {
    Link
} from 'react-router-dom';
import {actionChoseActiveUser} from '../actions'
import axios from "axios/index";

const LINK = "http://blog.test:8088/api/users/";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userTypeId: '',
            userName: 'Choose user',
        };
    }

    componentDidMount() {
        this.handleDataFromServer();
    }


    handleDataFromServer = () => {
        fetch(LINK)
            .then(response => response.json())
            .then(data => this.setState({users: data.users}));
    };

    handleAddTask = (id) => {
        this.props.history.push({
            pathname: '/task',
            state: {id: id}
        });

    };

    handleOpen = (id) => {
        this.props.history.push({
            pathname: '/user',
            state: {id: id}
        });
    };

    handleEdit = (id) => {
        this.props.history.push({
            pathname: '/edit',
            state: {
                id: id,
                userId: this.props.user.userId
            }
        });
    };

    handleDelete = (id) => {
        axios.post("http://blog.test:8088/api/users/delete",{
            id: id,
            userId: this.props.user.userId
        })
            .then(response => {
                this.handleDataFromServer()
            });
    };


    handleUserType = (type) => {
        switch (type) {
            case "1" :
                return 'user';
            case "2" :
                return 'moderator';
            case "3":
                return 'admin';
            default :
                return 'user'
        }
    };

    handleChooseUser = (event) => {
        console.log(event);
        this.props.dispatch(actionChoseActiveUser(event.id, event.name));
    };

    render() {

        const {users} = this.state;

        const isUser = this.props.user.isUser;

        return (
            <div className="App">
                <header className="App-header">
                    <div className="App-type">
                        <DropdownButton
                            title={this.props.user.userName}
                        >
                            <MenuItem eventKey={{
                                'id': '',
                                'name': '',
                            }} onSelect={this.handleChooseUser}>None</MenuItem>
                            <MenuItem divider/>

                            {users.map(user =>
                                <MenuItem
                                    eventKey={{
                                        'id': user.id,
                                        'name': user.name,
                                    }}
                                    onSelect={ this.handleChooseUser}
                                >
                                    {user.name}
                                </MenuItem>
                            )}
                        </DropdownButton>
                    </div>
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>

                <div>
                    <Table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>type</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody align="left">

                        {users.map(user =>
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{this.handleUserType(user.type)}</td>
                                {isUser ?
                                    <td>
                                        <DropdownButton>
                                            <MenuItem eventKey={user.id} onSelect={this.handleOpen}>Open</MenuItem>
                                            <MenuItem eventKey={user.id} onSelect={this.handleAddTask}>Add
                                                task</MenuItem>
                                            <MenuItem divider/>
                                            <MenuItem eventKey={user.id} onSelect={this.handleEdit}>Edit</MenuItem>
                                            <MenuItem eventKey={user.id} onSelect={this.handleDelete}>Delete</MenuItem>
                                        </DropdownButton>
                                    </td> :
                                    <td>

                                    </td>
                                }
                            </tr>
                        )}

                        </tbody>
                    </Table>
                    <Col xs={1} xsOffset={10}>

                        <Link to={'/add'}>
                            <Button bsStyle="primary" block> Add </Button>
                        </Link>
                    </Col>


                </div>

            </div>
        );
    }
}


function mapStateToProps(state) {
    console.log(state);
    return {
        user: state.userReducer,
    }
}

export default connect(mapStateToProps)(Home);

