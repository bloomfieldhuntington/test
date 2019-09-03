import React from 'react';
import { Redirect } from 'react-router-dom';
import StuckCoder_Standing_Original_Dark_BG from '../../img/official/../../img/official/StuckCoder_Standing_Original_Dark_BG.svg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
// css
import '../../css/stuck.css';
import '../../css/landing.css';
// Utils
const jwtDecode = require('jwt-decode');


const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated && localStorage.token){
        const decoded = jwtDecode(localStorage.token);
        if(decoded.user.role === 1) {
            return <Redirect to="/c_dashboard" />
        } else if(decoded.user.role === 2) {
            return <Redirect to="/s_dashboard" />
        }
    }
    return (
        <div className="container-landing">

        <Navbar />

            <main className="main">
                <div className="main-content">
                    <h1 className="main-title">Welcome to</h1>
                    <img src={StuckCoder_Standing_Original_Dark_BG} alt="Stuckcoder" className="main-logo"></img>
                    <div className="main-text-container">
                        <p className="main-text">Online Hub for Businesses and I.T Talents.
                                    Efficient, Fair and Safe outsourcing of I.T projects.</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps)(Landing);
