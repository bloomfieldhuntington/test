import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import stuckcoder_logo from '../../img/stuckcoder_logo.png';

class whoWeAre extends Component {

    // Stop users from reaching login after auth is success
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        return (
        <section id="showcase">
            <div className="landing-text">
                <img id="showcase-logo" src={stuckcoder_logo} width="500" alt="logo"></img>
                <p className="lead text-muted m-3"><a href="https://www.instagram.com/stuckcoder/?hl=nb">StuckCoder @instagram</a></p>
            </div>            
        </section>

        )
    }
}
whoWeAre.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(whoWeAre);