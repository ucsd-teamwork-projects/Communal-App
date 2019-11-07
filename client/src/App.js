import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from './pages/SignUp'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/TestApp'
import NoMatch from './pages/NoMatch'

class App extends Component {
  state = {
    loggedIn: false,
    username: null
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser = (userObject) => {
    this.setState(userObject)
  }

  getUser = () => {
    axios.get('/api/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          {/* greet user if logged in: */}
          {this.state.loggedIn && <p>Join the party, {this.state.username}!</p>}

          {/* Routes to different components */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" render={() =>
              <div className="container">
                <Login
                  updateUser={this.updateUser}
                />
              </div>}
            />
            <Route path="/signup" render={() =>
              <Signup />}
            />
            <Route component={NoMatch} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
