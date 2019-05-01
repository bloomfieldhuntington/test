import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import TextFieldGroup from '../common/TextFieldGroup';

class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        }
    }


  render() {
    return (
      <div className="card-deck">

      <div className="card m-5">
          <div className="card-body">
            <h4 className="card-title">Start A Project</h4>
            <p className="card-text">Some description text</p>

            <TextFieldGroup
                    placeholder="* Title"
                    name="company"
                    value=""
                    onChange=""
                    error=""
                    info="TO DO: Field information"
            ></TextFieldGroup>

            <TextFieldGroup
                    placeholder="* Budget"
                    name="company"
                    value=""
                    onChange=""
                    error=""
                    info="TO DO: Field information"
            ></TextFieldGroup>

            <div className="form-group row">
                <label className="col-2 col-form-label">Start</label>
                <div className="col-10">
                    <input className="form-control" type="date" value={Date.now()}></input>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-2 col-form-label">Deadline</label>
                <div className="col-10">
                    <input className="form-control" type="date" value={Date.now()}></input>
                </div>
            </div>

            <TextAreaFieldGroup
                    placeholder="Project Description"
                    name="discription"
                    value=""
                    onChange=""
                    error=""
                    info="TODO"
            ></TextAreaFieldGroup>


            <button type="submit" className="btn btn-primary">Ready</button>
          </div>
      </div>

      </div>
    )
  }
}

export default PostForm;