import React, {Component} from 'react';
import logo from '../logo.svg';
import 'react-table/react-table.css';
import axios from 'axios';
import {connect} from 'react-redux';


import {Button, Table, DropdownButton, Checkbox, MenuItem, Col, Grid, Row} from 'react-bootstrap'

import '../App.css';
import {
    Link
} from 'react-router-dom';
import {actionUnCheck, actionCheck,actionClear} from '../actions'

class UserTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };
    }

    componentDidMount() {
        this.handleDataFromServer();
    }

    handleAddTask = () => {
        this.props.history.push({
            pathname: '/task',
            state: {id: this.props.location.state.id}
        });
    };

    handleOnChange = (event) => {
        if (event.target.checked) {
            this.props.dispatch(actionCheck(event.target.name));
            console.log(event.target.checked + " / " + event.target.name + " ---- check")
        } else {
            this.props.dispatch(actionUnCheck(event.target.name));
            console.log(event.target.checked + " / " + event.target.name + " ---- UNCHECK")

        }
    };

    handleDelete = () => {
        axios.post("http://blog.test:8088/api/tasks/delete", {
            ids: this.props.check
        })
            .then(response => {
                this.handleDataFromServer();
            });
    };

    handleDataFromServer = () => {
        axios.get("http://blog.test:8088/api/users/"+this.props.location.state.id)
            .then(response => {
                this.props.dispatch(actionClear());
                    this.setState({tasks: response.data.tasks})
                // console.log(response);
                }
            )
    };


    render() {

        const {tasks} = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>

                <div >
                    <Table >
                        <thead>
                        <tr>
                            <th width={100}>id</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody align="left">
                        {tasks.map(task =>
                            <tr>
                                <td>{task.id}</td>
                                <td>{task.name}</td>
                                <td>
                                    <Checkbox name={task.id} cheked={false} onClick={this.handleOnChange}/>
                                </td>

                            </tr>
                        )}
                        </tbody>
                    </Table>
                    <Col xs={1} xsOffset={10}>

                        <Link to={'/task'}>

                        </Link>
                        <Button bsStyle="primary" block onClick={this.handleAddTask}> Add Task</Button>
                        <Button bsStyle="danger" block onClick={this.handleDelete}> DELETE</Button>
                        <Button bsStyle="success" block onClick={() => {
                            this.props.history.push('/')
                        }
                        }> BACK</Button>

                    </Col>


                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        check: state
    }
}

export default connect(mapStateToProps)(UserTasks);
