import React, {Fragment} from 'react'
// import PropTypes from 'prop-types'

const CardStandard = props => {
    return (
        <Fragment>
            
            <div id="buildachatbot_id" className="st-card-main">

        <div className="st-card-top">
            <div className="title-container">
                <h3>Build a chatbot</h3>
            </div>
            <div className="title-icon-container">
                <i className="fab fa-python st-icon-2"></i>
                <i className="fab fa-java st-icon-2"></i>
            </div>
        </div>

        <div className="st-card-bottom">

                <div><img className="st-card-el-img" src="" alt=""></img></div>
                <div className="st-card-el-h1">Secondary Title</div>
                <div className="st-card-el-h2">Some detailes about stuff</div>
                <div className="st-card-el-p">More deailes about this project and what is is about. This could be the</div>

            <div className="st-card-el-container">
                <span className="st-card-el-icon"><i className="fas fa-money-bill-wave"></i></span>
                <span className="st-card-el-text">$ 1,500</span>
                <span className="st-vertical-bar">|</span>
                <span className="st-card-el-icon"><i className="fas fa-stopwatch"></i></span>
                <span className="st-card-el-text">7d 14h 24m</span>
            </div>

            <div className="st-card-solvers-container">
                <div className="st-card-el-solver">
                    <i className="fas fa-user st-icon-3"></i>
                </div>
                <div className="st-card-el-solver">
                        <i className="fas fa-user st-icon-3"></i>
                </div>
                <div className="st-card-el-solver">
                        <i className="fas fa-user st-icon-3"></i>
                </div>
                <div className="st-card-el-solver">
                        <i className="fas fa-user st-icon-3"></i>
                </div>
                <div className="st-card-el-solver">
                        <i className="fas fa-user st-icon-3"></i>
                </div>
            </div>

        </div>

    </div>

        </Fragment>
    )
}

CardStandard.propTypes = {

}

export default CardStandard
