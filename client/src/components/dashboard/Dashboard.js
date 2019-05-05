import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
// Components
import Sidebar from './Sidebar';
import BetaTestingAlert from './BetaTestingAlert';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if(profile === null || loading) {
      dashboardContent = <h4>Loading...</h4>
    } else {
      // Check if logged in user has profile data
      if(Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="alert alert-primary" role="alert">
            <p className="font-weight-bold m-1">Welcome <Link to={`/profile/${profile.company}`}>{user.name}</Link></p>
          </div>
        )
      } else {
        // User has no profile yet
        dashboardContent = (
          <div className="col-lg-3">
          <div className="card mb-5 mb-lg-0">
            <div className="card-body">
              <h5 className="card-title text-muted text-uppercase text-center">Please Create a</h5>
              <h6 className="card-price text-center">Profile</h6>
              <hr></hr>
              <ul className="fa-ul">
                <p></p>
              </ul>
              <Link to="/create-profile" className="btn btn-block btn-success text-uppercase">Create Profile</Link>
            </div>
          </div>
        </div>
        )
      }
    }

    return (
    <div className="site-wrapper">

        <Sidebar />
        
        <main className="main-wrapper">
           
            <header className="site-header">
              <div className="searchbar">
                <span className="fa fa-search"></span>
                <input type="text" name="" placeholder="Filter..."></input>
              </div>
              <div className="d-flex align-items-center">
                <div className="notification-bell">
                    <span className="fa fa-bell"></span>
                </div>
                <div className="user-info">
                    <span className="user-avatar"> JC </span>
                    <span className="user-name">{user.name}</span>
                </div>
              </div>
            </header>
            {dashboardContent}
            <BetaTestingAlert />
            
        
        </main>
        
    </div>
    )
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);