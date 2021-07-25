import styles from "../styles/Forms.module.css"
import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import validator from "validator";
import { connect } from "react-redux";
import { contact } from "../reduxStore/actions";


class Contact extends React.Component {

    state = {
        formData: {
            name: "",
            email: "",
            message: "",
        },
        formError: {
            name: false,
            email: false,
            message: false,
        }
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
        } else {
            this.setState({
                formError: {
                    ...this.state.formError,
                    [name]: !value
                }
            })
        }
    }

    handleSend = () => {

        const { formData } = this.state;
        const { contact } = this.props;
        const formError = {
            name: !formData.name,
            email: !validator.isEmail(formData.email),
            message: !formData.message
        }
        this.setState({ formError });
        for (let error in formError) {
            if (formError[error]) return;
        }

        contact(formData);
        this.setState({
            formData: {
                name: "",
                email: "",
                message: ""
            }
        })
    }

    render() {
        const { formError, formData } = this.state;
        return (
            <div className={styles.todoForm}>
                <header>
                    <h1>Contact us</h1>
                </header>
                <div className={styles.contactForm}>
                    <div className={styles.field}>
                        <FormControl
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        {formError.name && <small className={styles.error}>
                            <FontAwesomeIcon icon={faExclamationCircle} /> Please provide a name
                        </small>}
                    </div>
                    <div className={styles.field}>
                        <FormControl
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        {formError.email && <small className={styles.error}>
                            <FontAwesomeIcon icon={faExclamationCircle} /> Please provide a formerly formatted email address
                        </small>}
                    </div>
                    <div className={styles.field}>
                        <FormControl
                            as="textarea"
                            rows={7}
                            placeholder="Message"
                            name="message"
                            value={formData.message}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        {formError.message && <small className={styles.error}>
                            <FontAwesomeIcon icon={faExclamationCircle} /> Please provide a message
                        </small>}
                    </div>
                    <Button
                        variant="primary"
                        onClick={this.handleSend}
                    >SEND</Button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    contact
}

export default connect(null, mapDispatchToProps)(Contact);