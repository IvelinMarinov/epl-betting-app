import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Home from './views/home';
import NotFound from './views/not-found';
import Login from './views/login';
import Register from './views/register'
import Logout from './views/logout';
import { UserProvider, defaultUserState } from './components/contexts/user-context';
import { AuthorizedRouteWithContext } from './components/authorized-route.jsx';
import ClubStandings from './views/club-standings';
import BetStandings from './views/bet-standings';

class App extends Component {
  constructor(props) {
    super(props);

    const userFromStorage = window.localStorage.getItem('user');
    const parsedUser = userFromStorage
      ? JSON.parse(userFromStorage)
      : {}

    this.state = {
      user: {
        ...defaultUserState,
        ...parsedUser        
      },
      updateUser: this.updateUser
    }
  }

  updateUser = (user) => {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <Router>
          <Fragment>
            <UserProvider value={this.state}>
              <Header />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/standings/premier-league" component={ClubStandings} />
                <Route exact path="/standings/betting" component={BetStandings} />
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </UserProvider>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
