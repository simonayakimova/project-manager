import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom';
import './App.css';
import Public from './components/Public';
// import Private from './components/Private';
// import Tasks from './components/Tasks'
import Task from './components/MainScreen'


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      redirectToPreviousRoute: false,
      currentUser: ''
    }
    this.login=this.login.bind(this)
    
  }

 
  
  login(ev) {
    ev.preventDefault()

    fetch('/api/users', {
      method: 'get',
      
  })
  .then(function (response){
      return response.json()
  })
  .then(user => {
    for (let i = 0; i <user.length; i++) {
      if (user[i].userEmail === this.state.email && user[i].password === this.state.password) {
        this.setState({ currentUser: this.state.email})
          AuthService.authenticate(() => {
            this.setState({ redirectToPreviousRoute: true });
          });
      }
      else {
        console.log("wrong")

      }
    }
  })

  
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToPreviousRoute } = this.state;

    if (redirectToPreviousRoute) {
      return <Redirect to={from} />;
    }

    return (
      <div className="form-group">
        <p>You must log in to view this page</p>
        <form onSubmit={this.login} >
        Email: <input
          className="form-control"
          id="userEmail"
          type="email"
          placeholder="email"
          onChange={event => this.setState({ email: event.target.value })}
        /><br></br>
        Password: <input
          className="form-control"
          id="userPassword"
          type="password"
          placeholder="password"
          onChange={event => this.setState({ password: event.target.value })}
        /><br></br>
        <input type="submit"/>
        </form>
      </div>
    );
  }
}


const SecretRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthService.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
);

const AuthService = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  logout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}


const AuthStatus = withRouter(({ history }) => (
  AuthService.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        AuthService.logout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    )
));

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false
    }
  }
  
  render() {
    return (
      <div className="App">
        <Router>
          <div className="Navigation">
            <AuthStatus />
            <nav>
              <ul className="navUl">
                <li><Link to='/home'> Home </Link></li>
                <li><Link to='/private'> Board </Link></li>
              </ul>
            </nav>
            <hr />

            <Route path='/home' component={Public} />
            <Route path="/login" component={Login} />
            {/* <Route path="/login" component={() => <Login currentUser={this.props.currentUser} />} */}
            
            <SecretRoute path='/private' component={Task} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;