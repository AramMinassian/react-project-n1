import styles from "../styles/Contact.module.css"
import React from "react";
import { Button, FormControl } from "react-bootstrap";
import validator from "validator";
import { request } from "../utilityFunctions";


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
        const formError = {
            name: !formData.name,
            email: !validator.isEmail(formData.email),
            message: !formData.message
        }
        this.setState({ formError });
        for (let error in formError) {
            if (formError[error]) return;
        }

        request("http://localhost:3001/form", "POST", formData)
            .then(() => {
                this.setState({
                    formData: {
                        name: "",
                        email: "",
                        message: ""
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { formError, formData } = this.state;
        return (
            <div className={styles.contact}>
                <h1>Contact us</h1>
                <div className={styles.contactForm}>
                    <div>
                        <FormControl
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        {formError.name && <small
                            className={styles.error}
                        >Please provide a name</small>}
                    </div>
                    <div>
                        <FormControl
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        {formError.email && <small
                            className={styles.error}
                        >Please provide a formerly formatted email address</small>}
                    </div>
                    <div>
                        <FormControl
                            as="textarea"
                            rows={7}
                            placeholder="Message"
                            name="message"
                            value={formData.message}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        {formError.message && <small
                            className={styles.error}
                        >Please provide a message</small>}
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

export default Contact;