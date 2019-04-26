import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Stuckcoder_logo_landing from '../../img/stuckcoder_logo_landing2x.png';
import PropTypes from 'prop-types';
//import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions'
import setAccessControl from '../../utils/setAccessControl';

class Navbar extends Component {

  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

    render() {
      const { isAuthenticated, user} = this.props.auth;
      //const decoded = true;
      
      const logoImageLinkAuth = (
        <Link className="navbar-brand" to={(setAccessControl(localStorage.jwtToken) ? "/" : "/dashboard_solver")}>
          <img src={Stuckcoder_logo_landing} alt="StuckCoder"></img>
        </Link>
      )
      const logoImageLinkGuest = (
        <Link className="navbar-brand" to="/">
          <img src={Stuckcoder_logo_landing} alt="StuckCoder"></img>
        </Link>
      )
      const authLinks = (
        <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to={(setAccessControl(localStorage.jwtToken)) ? "/" : "/dashboard_solver"}>Dashboard</Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link" ><img src={user.avatar} alt={user.name} style={{width: '25px', marginRight: '5px'}} title="Image feature not connected"></img>{' '}Logout</a>
                </li>
              </ul>

            </div>
      );
      const guestLinks = (
        <div className="collapse navbar-collapse" id="navbarNav">

              <ul className="navbar-nav">

                <li className="nav-item">
                  <Link className="nav-link" to="/business_login">Business</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/solver_login">Solver</Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/whoweare" className="nav-link">Who We Are</Link>
                </li>

              </ul>

            </div>
      );
        return(
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {isAuthenticated ? logoImageLinkAuth : logoImageLinkGuest}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          {isAuthenticated ? authLinks : guestLinks}
          </nav>
        )
    }
}
Navbar.propTypes ={
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
