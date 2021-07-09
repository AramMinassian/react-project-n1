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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends React.Component {

    componentDidUpdate() {
        const { successMessage, errorMessage } = this.props;
        if (successMessage) {
            toast.success(successMessage, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
        if (errorMessage) {
            toast.error(errorMessage, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }

    render() {
        const { inProcess } = this.props;
        return (
            <div className="App">
                <Router history={history}>
                    <NavMenu  updateApp={this.updateApp}/>
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
                <ToastContainer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        inProcess: state.inProcess,
        successMessage: state.successMessage,
        errorMessage: state.errorMessage
    }
}

export default connect(mapStateToProps)(App);