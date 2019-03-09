import React, { Component } from 'react';
import { Redirect } from 'react-router'
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
                    //const errors = Object.values(result.errors).join(' ')
                    throw new Error(result.message);
                }

                window.localStorage.setItem('auth_token', result.token);
                window.localStorage.setItem('user', JSON.stringify({
                    ...result.user,
                    isLoggedIn: true
                }))

                updateUser({
                    isLoggedIn: true,
                    updateUser,
                    ...result.user
                });

            } catch (err) {
                console.log(err)
                this.setState({
                    error: err.message
                })
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
            <div className="col-sm-6">
                <div className="container-fluid">
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit} className="form-group">
                        <div className="form-control">
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

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={this.handleChange}
                            />
                            <br />

                            <button type="submit" className="btn btn-success">Login</button>
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