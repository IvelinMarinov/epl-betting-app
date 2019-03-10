import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { UserConsumer } from './contexts/user-context';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { username, isLoggedIn } = this.props;

        return (
            <header>
                <nav className="navbar navbar-light bg-faded">
                    <NavLink to="/das" activeClassName="active">NavLink 2</NavLink>
                    <NavLink to="/" activeClassName="active">NavLink 3</NavLink>
                    <NavLink to="/standings/premier-league" activeClassName="active">EPL Standings</NavLink>
                    <NavLink to="/standings/betting" activeClassName="active">Bet Standings</NavLink>
                    <NavLink to="/admin/setup-round" activeClassName="active">Setup Round</NavLink>
                    {
                        isLoggedIn
                            ? (
                                <Fragment>
                                    <NavLink to="/logout" activeClassName="active">Logout</NavLink>
                                    <span>Hello, {username}!</span>
                                </Fragment>
                            )
                            : (
                                <Fragment>
                                    <NavLink to="/login" activeClassName="active">Login</NavLink>
                                    <NavLink to="/register" activeClassName="active">Register</NavLink>
                                </Fragment>
                            )
                    }
                </nav>
            </header>
        );
    }
}

const HeaderWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ user }) => (
                    <Header
                        {...props}
                        username={user.username}
                        isLoggedIn={user.isLoggedIn}
                    />
                )
            }
        </UserConsumer>
    );
}

export default HeaderWithContext;