import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';

import stuckcoderbusiness_logo from '../../img/stuckcoderbusiness_logo.png';

class BusinessLogin extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    // Stop users from reaching login after auth is success
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value});
    }
    onSubmit(event) {
        event.preventDefault();
        const businessUserData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(businessUserData)
    }
  render() {
      const { errors } = this.state;


    return (
      <div id="wrapper">
        <div id="left">
            <div id="signin">
                <div className="logo">
                    <img src={stuckcoderbusiness_logo} alt="stuckcoder logo"></img>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Email</label>
                        <input 
                        type="email" 
                        className={classnames('text-input form-control', {'is-invalid': errors.email})}
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}></input>
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                        type="password" 
                        className={classnames('text-input form-control', {'is-invalid': errors.password})}
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}></input>
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <button type="submit" className="primary-btn">Sign In</button>
                </form>
                <div className="links">
                    <Link to="/">Forgot Password</Link>
                    <Link to="/solver_login">Sign in as Solver</Link>
                </div>
                <div className="or">
                    <hr className="bar"></hr>
                    <span>OR</span>
                    <hr className="bar"></hr>
                </div>
                <Link to="/business_register" className="secondary-button">Register</Link>
            </div>
            <footer id="main-footer">
                <p>Copyright &copy; 2019 Stuckcoder AS - All Rights Reserved</p>
                <div>
                    <Link to="/">terms of use</Link> | <Link to="/">Privacy Policy</Link>
                </div>
            </footer>
        </div>
        <div id="right">
            <div id="showcase-signin" className="business">
                <div className="showcase-content">
                    <h1 className="showcase-text">Get it done quickly with <strong>StuckCoder</strong></h1>
                </div>
            </div>

        </div>
    </div>
    )
  }
}
loginUser.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(BusinessLogin);