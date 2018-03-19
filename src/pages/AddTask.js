import React, {Component} from 'react';
import '../App.css';
import {Button, FormGroup, ControlLabel, FormControl, Col, HelpBlock} from 'react-bootstrap'
import axios from 'axios';


class AddTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: '',
        };
    }

    handleSubmit = () => {
        axios.post("http://blog.test:8088/api/tasks",{
            id: this.props.location.state.id,
            task: this.state.task,
        })
            .then(response => {
                this.props.history.push({
                    pathname: '/user',
                    state: {id : this.props.location.state.id}
                });
            });
    };


    handleChangeTask = (event) => {
        this.setState({task: event.target.value});

    };


    FieldGroup = ({id, label, help, ...props}) => {
        return (
            <FormGroup controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl {...props} />
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        );
    };


    render() {
        const FieldGroup = this.FieldGroup;
        return (
            <div className="App-add-container">
                <Col xs={6} xsOffset={3}>
                    <form>
                        <FieldGroup
                            id="formName"
                            type="text"
                            label="Add task"
                            placeholder="Enter task"
                            onChange={this.handleChangeTask}
                        />

                    </form>
                </Col>
                <Col xs={2} xsOffset={5}>
                    <Button bsStyle="primary" block onClick={this.handleSubmit}>
                        Add Task
                    </Button>
                </Col>
            </div>


        );
    }
}

export default AddTask;
