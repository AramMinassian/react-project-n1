import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

function AuthRoute(props) {
  const { path, component: Component, loggedIn, isPrivate } = props;
  return (
    <Route
      path={path}
      render={(props) => {
        if (loggedIn && !isPrivate) {
          return <Redirect to="/" />
        }
        if (!loggedIn && isPrivate) {
          return <Redirect to="/signin" />
        }
        return <Component {...props}/>
      }}
    />
  )
}

AuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  isPrivate: PropTypes.bool.isRequired
}


const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(AuthRoute);