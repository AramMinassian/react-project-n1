import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";


function App() {
    return (
        <div className="App">
            <Router>
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
                        path="/not-found"
                        component={NotFound}
                        exact={true}
                    />
                    <Redirect 
                        to="/not-found"
                    />
                </Switch>
            </Router>
        </div>

    )
}

export default App;