import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { setCurrentSolverUser } from './actions/authActionsSolver';
import { clearCurrentSolverProfile} from './actions/profileActionsSolver';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import './Dashboard.css';
// Common components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import WhoWeAre from './components/layout/whoWeAre';
//import setAccessControl from './utils/setAccessControl';
// Company (Business)
import BusinessLogin from './components/auth/BusinessLogin';
import BusinessRegistration from './components/auth/BusinessRegistration';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Posts from './components/posts/Posts';
//Solver
import Solver_login from './components/auth/Solver_login';
import Solver_registration from './components/auth/Solver_registration';
import DashboardSolver from './components/dashboard/DashboardSolver';
import CreateProfileSolver from './components/create-profile/CreateProfileSolver';
import EditProfileSolver from './components/edit-profile/EditProfileSolver';



// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expo
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  if(decoded.iscompany) {
    store.dispatch(setCurrentUser(decoded))
    console.log("if")
  } else {
    store.dispatch(setCurrentSolverUser(decoded))
    console.log("else")
  }
  
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser);
    // TODO: Clear current Profile
    (decoded.iscompany) ? store.dispatch(clearCurrentProfile()) : store.dispatch(clearCurrentSolverProfile());
    // Redirect to login
    (decoded.iscompany) ? window.location.href = '/business_login' : window.location.href = '/solver_login';
  }
}
class App extends Component {
  render() {
    function isAuthenticated() {
      if(!localStorage.jwtToken) {
        console.log("No token")
        return
      } else {
        const decoded = jwt_decode(localStorage.jwtToken)
        console.log("Token exists")
        return (decoded.iscompany) ? true : false;
      }
    }
      return (
     <Provider store={ store }>
      <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/business_login" component={ BusinessLogin } />
        <Route exact path="/business_register" component={ BusinessRegistration} />
        <Route exact path="/whoweare" component={ WhoWeAre } />

        {/* COMPANY */}
        <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/active-projects" component={Posts} />
        </Switch>

        {/* SOLVER */}
        <Switch>
        <PrivateRoute exact path="/dashboard_solver" component={DashboardSolver} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/create-profile-solver" component={CreateProfileSolver} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/edit-profile-solver" component={EditProfileSolver} />
        </Switch>

        <Route exact path="/solver_login" component={Solver_login} />
        <Route exact path="/solver_register" component={Solver_registration} />
        <Footer />
      </div>
     </Router>
     </Provider>
    );
  }
}

export default App;
