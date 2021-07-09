import styles from "../styles/NavMenu.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";


class NavMenu extends React.Component {

  state = {
    isOpened: false
  }

  toggleMenu = () => {
    this.setState({
      isOpened: !this.state.isOpened
    })
  }

  render() {

    const { isOpened } = this.state;

    return (
      <>
        <div className={styles.navToggle}>
          {isOpened ? <FontAwesomeIcon onClick={this.toggleMenu} icon={faTimes} /> : <FontAwesomeIcon onClick={this.toggleMenu} icon={faBars} />}
        </div>
        <div className={`${styles.navMenu} ${isOpened ? styles.opened : styles.closed}`}>
          <div className={styles.navMenuLogo}>
            <NavLink
              to="/"
              exact={true}
            >To-Do</NavLink>
          </div>
          <NavLink
            className={styles.navMenuLink}
            activeClassName={styles.navMenuLinkActive}
            to="/"
            exact={true}
            onClick={this.toggleMenu}
          >Home</NavLink>
          <NavLink
            className={styles.navMenuLink}
            activeClassName={styles.navMenuLinkActive}
            to="/about"
            exact={true}
            onClick={this.toggleMenu}
          >About</NavLink>
          <NavLink
            className={styles.navMenuLink}
            activeClassName={styles.navMenuLinkActive}
            to="/contact"
            exact={true}
            onClick={this.toggleMenu}
          >Contact</NavLink>
        </div>
      </>
    )
  }
}

export default NavMenu;