import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profileActions';
// TextFields
import TextFieldGroup from '../common/TextFieldGroup';
//import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
//import InputGroup from '../common/InputGroup';
//import SelectListGroup from '../common/SelectListGroup';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            company: '',
            phone: '',
            country: '',
            website: '',
            avatar: '',
            errors: {}

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(event) {
        event.preventDefault();
        console.log('submit');

        const profileData = {
            company: this.state.company,
            phone: this.state.phone,
            country: this.state.country,
            website: this.state.website,
            avatar: this.state.avatar,
        }
        this.props.createProfile(profileData, this.props.history)
    }
    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


  render() {
      const { errors } = this.state;

      
    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 mt-4 text-center">Create Your Profile</h1>
                <p className="lead text-center">Please add detailes to complete you profile </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>

                    <TextFieldGroup
                        placeholder="* Company Name"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                        info="TO DO: Field information"
                    ></TextFieldGroup>

                    <TextFieldGroup
                        placeholder="* Phone"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.onChange}
                        error={errors.phone}
                        info="TO DO: Field information"
                    ></TextFieldGroup>

                    <TextFieldGroup
                        placeholder="* Country"
                        name="country"
                        value={this.state.country}
                        onChange={this.onChange}
                        error={errors.country}
                        info="TO DO: Field information"
                    ></TextFieldGroup>

                    <TextFieldGroup
                        placeholder="Website"
                        name="website"
                        value={this.state.website}
                        onChange={this.onChange}
                        error={errors.website}
                        info="TO DO: Field information"
                    ></TextFieldGroup>

                    <input type="submit" value="submit" className="btn btn-info btn-block mt-4"></input>
                    


                </form>
                </div>
            </div>
        </div>  
      </div>
    )
  }
}
CreateProfile.propTypes ={
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})
export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));