import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createProfileSolver, getCurrentSolverProfile } from '../../actions/profileActionsSolver';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import isEmpty from '../../validation/is-empty';
//import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateProfileSolver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            country: '',
            skills: '',
            bio: '',
            githubusername: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentSolverProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        // Used when "Edit Profile"
        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            // Bring Skills array back to comma sep values
            const skillsToString = profile.skills.join(',');

            // if Profile field doesnt exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.country = !isEmpty(profile.country) ? profile.country : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';

            // Set component fields state
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                country: profile.country,
                skills: skillsToString,
                bio: profile.bio,
                githubusername: profile.githubusername
            })

        }
    }

    onSubmit(event) {
        event.preventDefault();
        console.log('submit');

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            country: this.state.country,
            skills: this.state.skills,
            bio: this.state.bio,
            githubusername: this.state.githubusername
        }
        this.props.createProfileSolver(profileData, this.props.history)
    }
    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

  render() {
      const { errors } = this.state
      // Select options for status
      const options = [
        { label: 'Select A Country', value: 0},
        { label: 'Norway', value: 'Norway'},
        { label: 'France', value: 'France' },
        { label: 'Nepal', value: 'Nepal'},
        { label: 'USA', value: 'USA'},
        { label: 'Other', value: 'Other'}
    ]
    return (
        <div className="create-profile-solver">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 mt-4 text-center">Edit Your Profile</h1>
                <p className="lead text-center">Add or change information to complete you profile </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>

                    <TextFieldGroup
                        placeholder="* Handle"
                        name="handle"
                        value={this.state.handle}
                        onChange={this.onChange}
                        error={errors.handle}
                        info="TO DO"
                    ></TextFieldGroup>

                    <TextFieldGroup
                        placeholder="* Company Name"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                        info="Name of the company you accociete with"
                    ></TextFieldGroup>

                    <TextFieldGroup
                        placeholder="Website"
                        name="website"
                        value={this.state.website}
                        onChange={this.onChange}
                        error={errors.website}
                        info="TO DO"
                    ></TextFieldGroup>

                    <SelectListGroup
                        name="country"
                        value={this.state.country}
                        onChange={this.onChange}
                        options={options}
                        error={errors.country}
                        info="To Do"
                    ></SelectListGroup>

                    <TextFieldGroup
                        placeholder="* Skills"
                        name="skills"
                        value={this.state.skills}
                        onChange={this.onChange}
                        error={errors.skills}
                        info="Please use comma separated values (eg. HTML,CSS,JavaScipt,PHP"
                    ></TextFieldGroup>

                    <TextAreaFieldGroup
                        placeholder="Bio"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.onChange}
                        error={errors.bio}
                        info="TODO"
                    ></TextAreaFieldGroup>

                    <TextFieldGroup
                        placeholder="GitHub Username"
                        name="githubusername"
                        value={this.state.githubusername}
                        onChange={this.onChange}
                        error={errors.githubusername}
                        info="TODO"
                    ></TextFieldGroup>

                    <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"></input>


                </form>
                </div>
            </div>
        </div>  
      </div>
    )
  }
}
CreateProfileSolver.propTypes = {
    createProfileSolver: PropTypes.func.isRequired,
    getCurrentSolverProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {createProfileSolver, getCurrentSolverProfile})(withRouter(CreateProfileSolver));