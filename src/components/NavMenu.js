import "./NavMenu.css"
import React from "react";
import { NavLink } from "react-router-dom";


class NavMenu extends React.Component {
  render() {
    return (
      <div className="NavMenu">
        <div className="n-logo">
          <NavLink
            to="/"
            exact={true}
          >To-Do</NavLink>
        </div>
        <NavLink
          className="n-link"
          activeClassName="n-link-active"
          to="/"
          exact={true}
        >Home</NavLink>
        <NavLink
          className="n-link"
          activeClassName="n-link-active"
          to="/about"
          exact={true}
        >About</NavLink>
        <NavLink
          className="n-link"
          activeClassName="n-link-active"
          to="/contact"
          exact={true}
        >Contact</NavLink>
      </div>
    )
  }
}

export default NavMenu;