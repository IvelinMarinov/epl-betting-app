import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import AuthService from '../services/auth-service';
import { UserConsumer } from '../components/contexts/user-context.js';

const SuccessMsg = 'Thank you for registerring';

class Register extends Component {
    static authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            error: '',
            dateOfBirth: '',
            hasRegisterred: false
        }
    }

    showError = () => {
        const {error} = this.state;        
        if(error) {
            toast.error(error);            
        }
    }

    showSuccess = (message) => {
        toast.success(message);
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit = async (event) => {

        event.preventDefault();
        const { username, email, password, dateOfBirth } = this.state;
        const body = { username, email, password, dateOfBirth }

        try {
            let response = await Register.authService.register(body);
            console.log(response)
            if (!response.success) {
                if(response.errors) {
                    let errorsStr = Object.values(response.errors).join('\n')
                    throw new Error(errorsStr);
                } else {
                    throw new Error(response.message);                    
                }
            }

            this.setState({
                hasRegisterred: true
            });

            this.showSuccess(SuccessMsg);

        } catch (err) {

            this.setState({
                error: err.message
            });
            this.showError();
        }

    }

    render() {
        const { username, email, password, hasRegisterred, dateOfBirth } = this.state;
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {
            return (
                <Redirect to="/" />
            );
        }

        if (hasRegisterred) {
            return (
                <Redirect to="/login" />
            );
        }

        return (
            <div className="container-fluid">
                <div className="col-sm-6">
                    <br />
                    <h1>Register</h1>
                    <br />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={this.handleChange}
                            />
                            <br />

                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="Choose your username"
                                value={username}
                                onChange={this.handleChange}
                            />
                            <br />

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Choose your password"
                                value={password}
                                onChange={this.handleChange}
                            />
                            <br />

                            <label htmlFor="dateOfBirth">Date of birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                className="form-control"
                                placeholder="Enter your date of birth"
                                value={dateOfBirth}
                                onChange={this.handleChange}
                            />
                            <br />

                            <button type="submit" className="btn btn-lg btn-outline-success">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const RegisterWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ user }) => (
                    <Register
                        {...props}
                        isLoggedIn={user.isLoggedIn}
                    />
                )
            }
        </UserConsumer>
    );
}

export default RegisterWithContext;