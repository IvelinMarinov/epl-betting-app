import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from './contexts/user-context';

class AuthorizedRoute extends Component {

    render() {
        const { isLoggedIn } = this.props;
        console.log(isLoggedIn)

        if (!isLoggedIn) {
            return <Redirect to="/login" />;
        }
        return <Route {...this.props} />
    }
}

const AuthorizedRouteWithContext = (props) => {
    return (
        <UserConsumer>            
            {
                ({ isLoggedIn }) => (
                    <AuthorizedRoute {...props} />
                )
            }
        </UserConsumer>
    )
}

export { AuthorizedRoute, AuthorizedRouteWithContext };
export default AuthorizedRouteWithContext;