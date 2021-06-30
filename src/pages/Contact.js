import "./Contact.css";
import React from "react";
import { Button, FormControl } from "react-bootstrap";


class Contact extends React.Component {

    state = {
        formData: {
            name: "",
            email: "",
            message: "",
        },
        formError: {
            name: "",
            email: "",
            message: "",
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
    }

    render() {
        return (
            <div className="Contact">
                <h1>Contact us</h1>
                <div className="contact-form">
                    <FormControl
                        className="field"
                        placeholder="Name"
                        name="name"
                        onChange={this.handleChange}
                    />
                    <FormControl
                        className="field"
                        placeholder="Email"
                        name="email"
                        onChange={this.handleChange}
                    />
                    <FormControl
                        className="field"
                        as="textarea"
                        rows={7}
                        placeholder="Message"
                        name="message"
                        onChange={this.handleChange}
                    />
                    <Button
                        className="btn"
                        variant="primary"
                    >SEND</Button>
                </div>
            </div>
        )
    }
}

export default Contact;