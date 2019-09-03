import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../../actions/alert';
// components
import Navbar from '../../layout/Navbar';
import Alert from '../../layout/common/Alert';
// actions
import {register, login} from '../../../actions/s_auth';
// css
import '../../../css/solver_login.css'
import '../../../css/stuck.css'
// images
import StuckCoder_Lying_Original_White_BG from '../../../img/official/StuckCoder_Lying_Original_White_BG.svg';
// Utils
// const jwtDecode = require('jwt-decode');

const Solver_login = ({ setAlert, register, login, isAuthenticated }) => {

    // Login Form
    const [loginFormData, setLoginFormData] = useState({
        loginemail: '',
        loginpassword: ''
    })
    const {loginemail, loginpassword} = loginFormData;
    const loginOnChange = e => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value});

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        login(loginemail, loginpassword);
    }

    // Registration Form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
     const {name,email,password,password2} = formData;
     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

     const onSubmit = async (e) => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match', 'red')
        } else{
            register({name,email,password})
        }
     }
    
    // Redirects you to dashboard if logged in
        if(isAuthenticated){
            return <Redirect to="s_dashboard" />
        }
    return (
        <div className="container-login">

            <Navbar />

            <main className="main-login-solver">

                <div className="left-solver">

                    <div className="st-card-login">
                        <div className="st-image-2">
                            <img src={StuckCoder_Lying_Original_White_BG} alt="StuckCoder Logo" className="st-image-3"></img>
                        </div>
                        <div className="st-card-el-h2">Solver Login</div>

                        <form className="st-form" onSubmit={onSubmitLogin}>

                        <input 
                            className="st-input-field" 
                            type='text' 
                            placeholder='Email' 
                            name='loginemail' 
                            value={loginemail} 
                            onChange={e => loginOnChange(e)}
                            required
                        ></input>
                        
                        <input 
                            className="st-input-field" 
                            type='password' 
                            placeholder='Password' 
                            name='loginpassword' 
                            value={loginpassword} 
                            onChange={e => loginOnChange(e)}
                            required
                        ></input>

                                <button type="submit" className="st-button-secondary">Enter</button>
                        </form>

                        <div className="st-card-el-h2">Or</div>
                        <div className="st-card-el-p">Register as a new Solver</div>

                        <div className="st-card-el-h2">Solver Registration</div>

                        <form className="st-form" onSubmit={onSubmit}>

                        <input 
                            className="st-input-field" 
                            type='text' 
                            placeholder='Name' 
                            name='name' 
                            value={name} 
                            onChange={e => onChange(e)}
                            required
                        ></input>

                        <input 
                            className="st-input-field" 
                            type='text' 
                            placeholder='Email' 
                            name='email' 
                            value={email} 
                            onChange={e => onChange(e)}
                            required
                        ></input>

                        <input
                            className="st-input-field" 
                            type='password' 
                            placeholder='Password' 
                            name='password' 
                            value={password} 
                            onChange={e => onChange(e)}
                            required
                        ></input>

                        <input
                            className="st-input-field" 
                            type='password' 
                            placeholder='Confirm Password' 
                            name='password2' 
                            value={password2} 
                            onChange={e => onChange(e)}
                            required
                        ></input>
                        
                            <button type="submit" className="st-button-secondary">Create</button>
                        </form>

                        <Alert />
                        
                    </div>

                </div>


                <div className="right-solver"></div>


            </main>

            <div className="footer-solver">
                <div className="st-card-el-p">Copyright &copy; Stuckcoder AS 2019 - All Rights Reserved</div>
            </div>
    </div>
    )
}

Solver_login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

// connect(<state, <{actions}>)
export default connect(mapStateToProps, { setAlert, register, login })(Solver_login);
