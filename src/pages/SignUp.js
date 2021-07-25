import styles from "../styles/Forms.module.css"
import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import validator from "validator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../reduxStore/actions";


class SignUp extends React.Component {

  state = {
    formData: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    formError: {
      name: false,
      surname: false,
      email: false,
      password: false,
      confirmPassword: false,
      passwordsMatch: false
    }
  }

  nameRef = React.createRef();


  componentDidMount(){
    this.nameRef.current.focus();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    });

    if (name === "email") {
      this.setState({
        formError: {
          ...this.state.formError,
          email: !validator.isEmail(value)
        }
      })
    } else if (name === "confirmPassword") {
      this.setState({
        formError: {
          ...this.state.formError,
          [name]: !value,
          passwordsMatch: false
        }
      })
    } else {
      this.setState({
        formError: {
          ...this.state.formError,
          [name]: !value
        }
      })
    }
  }

  handelSignUp = () => {
    const { formData } = this.state;
    const { signUp } = this.props;
    const formError = {
      name: !formData.name.trim(),
      surname: !formData.surname.trim(),
      email: !validator.isEmail(formData.email),
      password: formData.password.trim().length < 6,
      confirmPassword: formData.password.trim() && !formData.confirmPassword.trim(),
      passwordsMatch: formData.password.trim() && formData.confirmPassword.trim() && (formData.password !== formData.confirmPassword)
    }

    

    this.setState({ formError });
    for (let error in formError) {
      if (formError[error]) return;
    }

    signUp(formData);
  }

  handleEnter = (e) => {
    if(e.key !== "Enter") return;
    this.handelSignUp();
  }

  render() {
    const { formError, formData } = this.state;
    return (
      <div className={styles.todoForm}>
        <header>
          <h1>Sign Up</h1>
          <p>Already have an account? <br/> <Link to="/signin" exact="true">Sign in</Link></p>
        </header>
        <div className={styles.signUpForm}>
          <div className={styles.field}>
            <FormControl
              placeholder="First name"
              name="name"
              value={formData.name}
              autoComplete="off"
              onChange={this.handleChange}
              onKeyDown={this.handleEnter}
              ref={this.nameRef}
            />
            {formError.name && <small className={styles.error}>
              <FontAwesomeIcon icon={faExclamationCircle} /> Please provide your first name
            </small>}
          </div>
          <div className={styles.field}>
            <FormControl
              placeholder="Last name"
              name="surname"
              value={formData.surname}
              autoComplete="off"
              onChange={this.handleChange}
              onKeyDown={this.handleEnter}
            />
            {formError.surname && <small className={styles.error}>
              <FontAwesomeIcon icon={faExclamationCircle} /> Please provide your last name
            </small>}
          </div>
          <div className={styles.field}>
            <FormControl
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              autoComplete="off"
              onChange={this.handleChange}
              onKeyDown={this.handleEnter}
            />
            {formError.email && <small className={styles.error}>
              <FontAwesomeIcon icon={faExclamationCircle} /> Please provide a formerly formatted email address
            </small>}
          </div>
          <div className={styles.field}>
            <FormControl
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              autoComplete="off"
              onChange={this.handleChange}
              onKeyDown={this.handleEnter}
            />
            {formError.password && <small className={styles.error}>
              <FontAwesomeIcon icon={faExclamationCircle} /> Please provide a password not less than 6 character long
            </small>}
          </div>
          <div className={styles.field}>
            <FormControl
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              autoComplete="off"
              onChange={this.handleChange}
              onKeyDown={this.handleEnter}
            />
            {formError.confirmPassword && <small className={styles.error}>
              <FontAwesomeIcon icon={faExclamationCircle} /> Please confirm password
            </small>}
            {formError.passwordsMatch && <small className={styles.error}>
              <FontAwesomeIcon icon={faExclamationCircle} /> Passwords doesn't match
            </small>}
          </div>
          <Button
            variant="primary"
            onClick={this.handelSignUp}
          >Sign up</Button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  signUp
}

export default connect(null, mapDispatchToProps)(SignUp);