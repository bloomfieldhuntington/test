import React, {Fragment} from 'react'
// import PropTypes from 'prop-types'

const CardStandardSkill = props => {
    return (
        <Fragment>
            <div className="st-card-dash">
                    <img src="" alt="" className="st-card-el-img"></img>
                    <div className="st-card-el-h1">C++ Certificate</div>
                    <div className="st-card-el-h2">Level One</div>
                    <div className="st-card-el-p">Complete course to access more complex jobs</div>
                    <div>
                        
                        <span><i className="far fa-star"></i></span>
                        <span><i className="far fa-star"></i></span>
                        <span><i className="far fa-star"></i></span>
                        <span><i className="far fa-star"></i></span>
                        
                </div>
            </div>
        </Fragment>
    )
}

CardStandardSkill.propTypes = {

}

export default CardStandardSkill
