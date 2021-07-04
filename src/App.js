import "./App.css";
import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./components/history";
import NavMenu from "./components/NavMenu";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SingleTask from "./pages/SingleTask";
import NotFound from "./pages/NotFound";
import ProcessSpinner from "./components/ProcessSpinner";
import { connect } from "react-redux";


function App({ inProcess }) {
    return (
        <div className="App">
            <Router history={history}>
                <NavMenu />
                <Switch>
                    <Route
                        path="/"
                        component={Home}
                        exact={true}
                    />
                    <Route
                        path="/home"
                        component={Home}
                        exact={true}
                    />
                    <Route
                        path="/about"
                        component={About}
                        exact={true}
                    />
                    <Route
                        path="/contact"
                        component={Contact}
                        exact={true}
                    />
                    <Route
                        path="/task/:taskId"
                        component={SingleTask}
                        exact={true}
                    />
                    <Route
                        path="/not-found"
                        component={NotFound}
                        exact={true}
                    />
                    <Redirect
                        to="/not-found"
                    />
                </Switch>
            </Router>
            {inProcess && <ProcessSpinner />}
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        inProcess: state.inProcess
    }
}

export default connect(mapStateToProps)(App);