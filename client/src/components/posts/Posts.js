import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Sidebar from '../dashboard/Sidebar';


 class Posts extends Component {
  render() {
    return (
      <div className="site-wrapper">
      
      <Sidebar />

      <div className="main-wrapper">
      
      <PostForm />

      </div>
      
      </div>
    )
  }
}

export default Posts;
