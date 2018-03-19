import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import {Button, FormGroup, ControlLabel, FormControl, Col, HelpBlock} from 'react-bootstrap'


class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        };
    }


    componentDidMount() {
        axios.get("http://blog.test:8088/api/users/" + this.props.location.state.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                });
            });
    };

    handleSubmit = () => {
        axios.put("http://blog.test:8088/api/users/" + this.props.location.state.id, {
            userId: this.props.location.state.userId,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        })
            .then(response => {
                this.props.history.push('/');
            })
            .catch(( error ) => {
                this.props.history.push('/');

            });
    };


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
                            value={this.state.name}
                            onChange={this.handleChangeName}
                        />
                        <FieldGroup
                            id="formEmail"
                            type="email"
                            label="Email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleChangeEmail}

                        />
                        <FieldGroup
                            id="formPassword"
                            type="password"
                            label="Password"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                        />
                    </form>
                </Col>
                <Col xs={2} xsOffset={5}>
                    <Button bsStyle="primary" block onClick={this.handleSubmit}>
                        Save
                    </Button>
                </Col>
            </div>


        );
    }
}

export
default
EditUser;
