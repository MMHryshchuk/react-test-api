import React, {Component} from 'react';
import '../App.css';
import {Button, FormGroup, ControlLabel, FormControl, Col, HelpBlock} from 'react-bootstrap'
import axios from 'axios';
class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        };
    }

    handleSubmit = () => {
        axios.post("http://blog.test:8088/api/users", {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        })
            .then(response =>  this.props.history.push('/'));
    };

    getValidationState() {
        const length = this.state.name.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChangeName = (event) => {
        this.setState({name: event.target.value});

    };
    handleChangeEmail = (event) => {
        this.setState({email: event.target.value});
    };
    handleChangePassword = (event) => {
        this.setState({password: event.target.value});
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
                            label="Name"
                            placeholder="Enter name"
                            onChange={this.handleChangeName}
                        />
                        <FieldGroup
                            id="formEmail"
                            type="email"
                            label="Email"
                            placeholder="Enter email"
                            onChange={this.handleChangeEmail}

                        />
                        <FieldGroup
                            id="formPassword"
                            type="password"
                            label="Password"
                            placeholder="Enter password"
                            onChange={this.handleChangePassword}
                        />
                    </form>
                </Col>
                <Col xs={2} xsOffset={5}>
                    <Button bsStyle="primary" block onClick={this.handleSubmit}>
                        Add
                    </Button>
                </Col>
            </div>


        );
    }
}

export default AddUser;
