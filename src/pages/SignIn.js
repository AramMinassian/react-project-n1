import styles from "../styles/Forms.module.css"
import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../reduxStore/actions";


class SignIn extends React.Component {

    state = {
        email: "",
        password: "",
    }

    emailRef = React.createRef();
    passwordRef = React.createRef();

    componentDidMount() {
        this.emailRef.current.focus();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSignIn = () => {
        const { email, password } = this.state;
        if (!email.trim()) {
            this.emailRef.current.focus();
            return;
        }
        if (!password.trim()) {
            this.passwordRef.current.focus();
            return;
        }
        const { signIn } = this.props;
        const formData = {
            email,
            password
        }

        signIn(formData);
        this.setState({
            password: ""
        })
        this.passwordRef.current.focus();

    }

    handleEnter = (e) => {
        if (e.key !== "Enter") return;
        this.handleSignIn();
    }


    render() {
        const { email, password } = this.state;
        return (
            <div className={styles.todoForm}>
                <header>
                    <h1>Sign In</h1>
                    <p>Do not have an account yet? <br/> <Link to="/signup" exact="true">Sign up</Link></p>
                </header>
                <div className={styles.signInForm}>
                    <div className={styles.field}>
                        <FormControl
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            autoComplete="off"
                            onChange={this.handleChange}
                            onKeyDown={this.handleEnter}
                            ref={this.emailRef}
                        />
                    </div>
                    <div className={styles.field}>
                        <FormControl
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            autoComplete="off"
                            onChange={this.handleChange}
                            onKeyDown={this.handleEnter}
                            ref={this.passwordRef}
                        />
                    </div>
                    <Button
                        variant="primary"
                        onClick={this.handleSignIn}
                    >Sign In</Button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    signIn
}

export default connect(null, mapDispatchToProps)(SignIn);

