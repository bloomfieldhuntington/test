import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentSolverProfile } from '../../actions/profileActionsSolver';

class DashboardSolver extends Component {
    componentDidMount() {
        this.props.getCurrentSolverProfile();
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
        dashboardContent = <h1>Solver has profile</h1>
      } else {
        // User as no profile yet
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
              <Link to="/create-profile-solver" className="btn btn-block btn-success text-uppercase">Create Profile</Link>
            </div>
          </div>
        </div>
        )
      }
    }

    return (
      <div className="site-wrapper">
        <aside className="sidebar">
          <header>
            <nav className="menu">
                <ul>
                    <li><a href="createproject.html" className="menu-item"> <span className="menu-icon fa fa-plus-circle"></span> <span className="menu-label"> Browse Projects </span></a></li>
                    <li><a href="" className="menu-item"> <span className="menu-icon fa fa-exclamation-triangle"></span> <span className="menu-label"> Active Projects </span></a></li>
                    <li><a href="" className="menu-item"> <span className="menu-icon fa fa-check-circle"></span> <span className="menu-label"> Solved Projects </span></a></li>
                    <li><a href="" className="menu-item"> <span className="menu-icon fa fa-user-cog"></span> <span className="menu-label"> Edit Profile </span></a></li>
                  </ul>
            </nav>
          </header>
        </aside>
        
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
            

            
            <section className="pricing py-5">
                <div className="container">
                  <div className="row">

                  {dashboardContent}

                    
                    <div className="col-lg-3">
                      <div className="card mb-5 mb-lg-0">
                        <div className="card-body">
                          <h5 className="card-title text-muted text-uppercase text-center">Project Name</h5>
                          <h6 className="card-price text-center">Title</h6>
                          <hr></hr>
                          <ul className="fa-ul">
                            <li><span className="fa-li"><i className="fas fa-clock"></i></span>Deadline</li>
                            <li><span className="fa-li"><i className="fas fa-money-bill-alt"></i></span>$ Budget</li>
                            <li><span className="fa-li"><i className="fas fa-info-circle"></i></span>Text</li>
                          </ul>
                          <a href="#" className="btn btn-block btn-primary text-uppercase">Accept</a>
                        </div>
                      </div>
                    </div>
                    

                  </div>
                </div>
              </section>
            
        </main>
        
    </div>
    )
  }
}
DashboardSolver.propTypes ={
  getCurrentSolverProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getCurrentSolverProfile })(DashboardSolver);
