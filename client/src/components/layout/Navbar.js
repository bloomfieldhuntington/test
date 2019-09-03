import React from 'react'
import { Link } from 'react-router-dom';
// Images
import stuckcoder_header_logo from '../../img/official/stuckcoder_header_logo.png'

const Navbar = () => {
    return (
        <header className="header">
                <div className="header-image-container">
                    <Link to="/"><img src={stuckcoder_header_logo} alt="StuckCoder" className="header-image"></img></Link>
                </div>
                <div className="header-links-container">
                    <ul className="header-links-left">
                        <li className="st-li"><Link to="/company_login" className="st-a">Business</Link></li>
                        <li className="st-li"><Link to="/solver_login" className="st-a">Solver</Link></li>
                    </ul>
                    <ul className="header-links-right st-list">
                        <li className="st-li"><Link to="/whatwedo" className="st-a">What we do</Link></li>
                    </ul>
                </div>
        </header>
    )
}

export default Navbar
