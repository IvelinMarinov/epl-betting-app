import React, { Component } from 'react';
import { Redirect } from 'react-router'
import AuthService from '../services/auth-service';
import { UserConsumer } from '../components/contexts/user-context.js';

class Register extends Component {
    static authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            error: '',
            hasRegisterred: false
        }
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit = async (event) => {

        event.preventDefault();
        const { username, email, password } = this.state;

        try {
            let response = await Register.authService.register({username, email, password});
            if (!response.success) {
                //const errors = Object.values(result.errors).join(' ')
                throw new Error(response.message);
            }

            this.setState({
                hasRegisterred: true
            })
        } catch(err) {

        }

    }

    render() {
        const { username, email, password, hasRegisterred } = this.state;
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
                <h1>Register</h1>
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
                        <br/>

                        <button type="submit" className="btn btn-success">Register</button>
                    </div>
                </form>
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