import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import AuthService from '../services/auth-service';
import { UserConsumer } from '../components/contexts/user-context.js';

class Login extends Component {
    static authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    showError = () => {
        const {error} = this.state;        
        if(error) {
            toast.error(error);            
        }
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = (event) => {

        event.preventDefault();
        const { email, password } = this.state;
        let { updateUser } = this.props;
        updateUser = updateUser.bind(this);

        this.setState({
            error: ''
        }, async () => {
            try {
                const result = await Login.authService.login({ email, password });
                if (!result.success) {
                    throw new Error(result.message);
                }

                window.localStorage.setItem('auth_token', result.token);
                window.localStorage.setItem('user', JSON.stringify({
                    ...result.user,
                    isLoggedIn: true
                }))

                let isAdmin = result.user.roles.includes('Admin');

                updateUser({
                    isLoggedIn: true,
                    isAdmin: isAdmin,
                    updateUser,
                    ...result.user
                });

            } catch (err) {
                this.setState({
                    error: err.message
                });
                this.showError();
            }
        });


    }

    render() {
        const { email, password } = this.state;
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div className="container-fluid">
                <div className="col-sm-6">
                    <br />
                    <h1>Login</h1>
                    <br />
                    <form onSubmit={this.handleSubmit} className="form-group">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={this.handleChange}
                                required
                            />
                            <br />

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={this.handleChange}
                                required
                            />
                            <br />

                            <button type="submit" className="btn btn-lg btn-outline-success">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const LoginWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ user, updateUser }) => (
                    <Login
                        {...props}
                        isLoggedIn={user.isLoggedIn}
                        updateUser={updateUser}
                    />
                )
            }
        </UserConsumer>
    );
}

export default LoginWithContext;