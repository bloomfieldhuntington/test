import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
        <header>
            <nav className="menu">
                <ul>
                    <li><Link to="/active-projects" className="menu-item"> <span className="menu-icon fa fa-plus-circle"></span> <span className="menu-label"> Create Project </span></Link></li>
                    <li><Link to="/dashboard" className="menu-item"> <span className="menu-icon fa fa-exclamation-triangle"></span> <span className="menu-label"> Active Projects </span></Link></li>
                    <li><Link to="/dashboard" className="menu-item"> <span className="menu-icon fa fa-check-circle"></span> <span className="menu-label"> Solved Projects </span></Link></li>
                    <li><Link to="/edit-profile" className="menu-item"> <span className="menu-icon fa fa-user-cog"></span> <span className="menu-label"> Edit Profile </span></Link></li>
                  </ul>
            </nav>
        </header>
    </aside>
  )
}

export default Sidebar;
