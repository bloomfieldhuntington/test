import React, { useEffect, Fragment } from 'react';
// import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/c_profile';
import {logout} from '../../../actions/auth';
// components
// import Earth from '../../layout/common/Earth';
import CardStandard from '../../layout/CardStandard';
// css
import '../../../css/business_dashboard.css';
import '../../../css/stuck.css';
// images
import StuckCoder_Standing_Original_Dark_BG from '../../../img/official/StuckCoder_Standing_Original_Dark_BG.svg';
// icons
import plusIcon from '../../../img/icons/baseline_add_circle_outline_black_48pt_3x.png';
import doneIcon from '../../../img/icons/baseline_done_all_black_48pt_3x.png';
import flareIcon from '../../../img/icons/baseline_flare_black_48pt_3x.png';
import doorIcon from '../../../img/icons/baseline_meeting_room_black_48pt_3x.png';
import userIcon from '../../../img/icons/baseline_person_black_48pt_3x.png';

const C_dashboard = ({getCurrentProfile, auth, profile, logout}) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    // Check for username, Placeholders if not
    var username = "";
    try {
        username = auth.user.name;
    } catch (err) {
        username = "Username"
    }

    return (
        <Fragment>
            <div className="container-dashboard">

<div className="dashboard-header-content">

    <div className="dashboard-header-content-left">
        <h1 className="st-h1">Dashboard</h1>
    </div>

    <div className="dashboard-header-content-right">
        <a onClick={logout} href="#!" className="st-button-header-icon">
        <div className="icon-container">
        <img src={doorIcon} className="st-icon-image" alt=""></img>
        </div>
        </a>
    </div>

</div>



<div className="dashboard-main-content">

    <CardStandard />
    <CardStandard />
    <CardStandard />

</div>
<aside className="dashboard-sidenav">

    <div className="dashboard-image-container">
        <img src={StuckCoder_Standing_Original_Dark_BG} alt="Stuckcoder" className="sidenav-logo"></img>
    </div>

    <ul className="sidenav-list">
        <li className="sidenav-list-item">
            <div className="list-item-container">
                <span className="list-item-icon"><img src={plusIcon} className="st-icon-image" alt=""></img></span>
                <a href="./create_project_business.html"><span className="list-item-title">Create Project</span></a>
            </div>
        </li>
        <li className="sidenav-list-item">
            <div className="list-item-container">
                <span className="list-item-icon"><img src={flareIcon} className="st-icon-image" alt=""></img></span>
                <span className="list-item-title">Active Projects</span>
            </div>
        </li>
        <li className="sidenav-list-item">
            <div className="list-item-container">
                <span className="list-item-icon"><img src={doneIcon} className="st-icon-image" alt=""></img></span>
                <span className="list-item-title">Solved Projects</span>
            </div>
        </li>
        <li className="sidenav-list-item">
            <div className="list-item-container">
                <span className="list-item-icon"><img src={userIcon} className="st-icon-image" alt=""></img></span>
                <span className="list-item-title">Edit Profile</span>
            </div>
        </li>
    </ul>

    <div className="sidenav-profile-area">
            <img className="sidenav-profile-image" src="" alt=""></img>
        <h3 className="st-card-el-h2">{username}</h3>
    </div>

</aside>
<footer className="footer">
    <p className="footer-text">All rights reserved &copy; 2019 Stuckcoder AS</p>
</footer>

</div>
        </Fragment>
    )
}

C_dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, logout})(C_dashboard);
