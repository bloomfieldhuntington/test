import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import stuckcoder_logo from '../../img/stuckcoder_logo.png';

class Landing extends Component {

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
                <h3>Marketplace & Community | Time Saver for Businesses</h3>
            </div>
        </section>
        

        )
    }
}
Landing.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);