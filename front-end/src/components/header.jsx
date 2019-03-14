import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { UserConsumer } from './contexts/user-context';
import CustomNavLink from './common/custom-navlink';

const EplLogo = require.context('../static/images/content', true);

class Header extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { username, isLoggedIn, isAdmin } = this.props;

        let adminLinks, authLinks

        if (isAdmin) {
            adminLinks =
                <Fragment>
                    <CustomNavLink to="/admin/setup-round" text="Setup Round" />
                    <CustomNavLink to="/admin/complete-round" text="Complete Round" />
                </Fragment>
        }

        if (isLoggedIn) {
            authLinks =
                <Fragment>
                    <CustomNavLink to="/bet" text="Place Bets" />
                    <CustomNavLink to="/logout" text="Logout" />
                    <span>Hello, {username}!</span>
                </Fragment>
        } else {
            authLinks =
                <Fragment>
                    <CustomNavLink to="/login" text="Login" />
                    <CustomNavLink to="/register" text="Register" />
                </Fragment>
        }

        return (
            <header>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <Link to="/" className="navbar-brand">
                        <img src={EplLogo('./premier-league-logo-header.png')}  alt="EPL Betting" height="50" />
                    </Link>

                    <ul className="navbar-nav">
                        <CustomNavLink to="/standings/premier-league" text="EPL Standings" />
                        <CustomNavLink to="/standings/betting" text="Bet Standings" />
                        {adminLinks}
                        {authLinks}
                    </ul>
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
                        isAdmin={user.isAdmin}
                    />
                )
            }
        </UserConsumer>
    );
}

export default HeaderWithContext;