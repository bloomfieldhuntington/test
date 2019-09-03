import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
// redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { s_loadUser } from './actions/s_auth';
// COMPONENTS
// common
import Landing from './components/layout/Landing';
import PrivateRoute from './components/routing/PrivateRoute';
// company
import Company_login from './components/company/auth/Company_login';
import C_dashboard from './components/company/dashboard/C_dashboard';
// solver
import Solver_login from './components/solver/auth/Solver_login';
import S_dashboard from './components/solver/dashboard/S_dashboard';
// Utils
const jwtDecode = require('jwt-decode');


// This is either "loadUser" OR "s_loadUser"
var loadUserAfterRoleCheck = () => {};

// Check the role of user to control correct access
if(localStorage.token) {
  const decoded = jwtDecode(localStorage.token);
  const accesscontrol = decoded.user.role;
  if(accesscontrol === 2) {
    loadUserAfterRoleCheck = s_loadUser();
  } else if(accesscontrol ===1) {
    loadUserAfterRoleCheck = loadUser()
  }
}

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUserAfterRoleCheck)
  }, []);

  return (
  <Provider store={store}>
    <Router>
      <Fragment>

  <Switch>
    <Route exact path='/' component={Landing} />
  
    <Route exact path="/company_login" component={Company_login} />
    <Route exact path="/solver_login" component={Solver_login} />

    <PrivateRoute exact path="/c_dashboard" component={C_dashboard} />
    <PrivateRoute exact path="/s_dashboard" component={S_dashboard} />

  </Switch>
  
      </Fragment>
    </Router>
  </Provider>
  )};
  

export default App;

