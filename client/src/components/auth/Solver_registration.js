import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
// May change - from BusinessRegistration
import { registerUser } from '../../actions/authActionsSolver';
import stuckcodersolver_logo from '../../img/stuckcodersolver_logo2x.png';

class Solver_registration extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
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
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value});
    }
    onSubmit(event) {
        event.preventDefault();
        const newSolverUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(newSolverUser, this.props.history);
    }

  render() {
      const { errors } = this.state;
    return (
        <div id="wrapper">
        <div id="left">
            <div id="register">
                <div className="logo">
                    <img src={stuckcodersolver_logo} alt="stuckcoder logo"></img>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div>
                    <label>Name</label>
                        <input 
                        type="text"
                        className={classnames('text-input form-control', {'is-invalid': errors.name})}  
                        name="name" 
                        value={this.state.name}
                        onChange={this.onChange}></input>
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
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
                    <div>
                        <label>Confirm Password</label>
                        <input 
                        type="password" 
                        className={classnames('text-input form-control', {'is-invalid': errors.password2})}
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}></input>
                        {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                    </div>
                    <button type="submit" className="primary-btn">Finish</button>
                </form>
                <div className="links">
                    <Link to="/business_register">Register as a business</Link>
                </div>
                <div className="or">
                    <hr className="bar"></hr>
                    <span>OR</span>
                    <hr className="bar"></hr>
                </div>
                <Link to="/solver_login" className="secondary-button">Already have an account</Link>
            </div>
            <footer id="main-footer">
                <p>Copyright &copy; 2019 Stuckcoder AS - All Rights Reserved</p>
                <div>
                    <Link to="/">terms of use</Link> | <Link to="/">Privacy Policy</Link>
                </div>
            </footer>
        </div>
    </div>
    )
  }
}
Solver_registration.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, { registerUser })(withRouter(Solver_registration));