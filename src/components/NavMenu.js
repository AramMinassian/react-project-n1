import styles from "../styles/NavMenu.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { signOut } from "../reduxStore/actions";


class NavMenu extends React.Component {


  render() {

    const { loggedIn, signOut } = this.props;
    const token = JSON.parse(localStorage.getItem("token"));

    return (
      <div className={styles.navMenu}>
        <div className={styles.navMenuLogo}>
          <NavLink
            to={`${loggedIn ? "/" : "/signin"}`}
            exact={true}
          >To <FontAwesomeIcon icon={faCheckCircle} /> Do</NavLink>
        </div>
        <NavLink
          className={styles.navMenuLink}
          activeClassName={styles.navMenuLinkActive}
          to={`${loggedIn ? "/" : "/signin"}`}
          exact={true}
        >Home</NavLink>
        <NavLink
          className={styles.navMenuLink}
          activeClassName={styles.navMenuLinkActive}
          to="/about"
          exact={true}
        >About</NavLink>
        <NavLink
          className={styles.navMenuLink}
          activeClassName={styles.navMenuLinkActive}
          to="/contact"
          exact={true}
        >Contact</NavLink>
        {loggedIn ?
          <>
            <NavLink
              className={`${styles.navMenuLink} ${styles.userLink}`}
              activeClassName={styles.navMenuLinkActive}
              activeStyle={{ "color": "#ffc107" }}
              to="/user"
              exact={true}
            ><FontAwesomeIcon icon={faUser} /></NavLink>
            <Button
              variant="light"
              onClick={() => signOut(token.jwt)}
            >Logout</Button>
          </>
          :
          <NavLink
            className={`${styles.navMenuLink} ${styles.signInLink}`}
            activeClassName={styles.navMenuLinkActive}
            to="/signin"
            exact={true}
          >Sign In</NavLink>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = {
  signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);