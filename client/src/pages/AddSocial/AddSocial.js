import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DynamicTextArea from 'react-autosize-textarea';
import LocationAutocomplete from 'location-autocomplete';
import { Form, Button, Card, Container, Alert } from "react-bootstrap";

// Import responsive header tags
import "../../utils/flowHeaders.min.css";

import Logo from "../../assets/img/logo.png";
import "./main.css";
import { userInfo } from 'os';
import API from '../../utils/API';


export class AddSocial extends Component {
    state = {
        name: "",
        description: "",
        // category: "",
        location: "",
        image: "",
        alertOpen: false,
        errorAlertOpen: false,
        startDate: new Date(),
        endDate: new Date(),
        errorImgMsg: "",
        invalid: {
            name: false,
            location: false,
            startDate: false,
            endDate: false
        }
    };

    handleInputChange = event => {
        let { value, name } = event.target;

        this.setState({
            [name]: value,
        });

        if (name == "image") {
            this.setState({
                errorImgMsg: ""
            })
        }

        if (this.state.alertOpen) {
            this.setState({
                alertOpen: false,
                errorAlertOpen: false
            })
        }
    };

    handleDateChange = (name, d) => {
        this.setState({
            [name]: d,
        });

        if (this.state.alertOpen) {
            this.setState({
                alertOpen: false,
                errorAlertOpen: false

            })
        }

    };

    addDefaultSrc = ev => {
        ev.target.src = "https://pbs.twimg.com/media/DnE2oP6UYAAJr8R.jpg";
        if (this.state.image) {
            this.setState({
                errorImgMsg: "An image could not be found at the specified URL (404)",
                invalid: {
                    image: true
                }
            })
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();

        // Form Validation
        let invalid = {};

        // Check name and location are not blank
        if(!this.state.name) { invalid.name = true; }
        if(!this.state.location) { invalid.location = true; }

        // Check startDate and endDate are not blank and are Date objects
        if((!this.state.startDate || Object.prototype.toString.call(this.state.startDate) !== '[object Date]')) { invalid.startDate = true; }
        if(!this.state.endDate || Object.prototype.toString.call(this.state.endDate) !== '[object Date]') { invalid.endDate = true; }
        // Check if image invalid error is set
        if(this.state.invalid.image || !this.state.image) { invalid.image = true; }

        // If any errors, open errorAlert
        if (Object.keys(invalid).length) {
            this.setState({
                errorAlertOpen: true,
                invalid
            })
            return;
        }

        // Submit Social object to API
        const newSocial = {
            creator: this.props.user._id,
            name: this.state.name,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            location: this.state.location,
            image: this.state.image,
            // category: this.state.category,
            description: this.state.description
        }

        API.createSocial(newSocial)
            .then((obj) => {
                console.log(obj);
                // Reset state variables
                this.setState({
                    name: "",
                    description: "",
                    // category: "",
                    location: "",
                    image: "",
                    errorImgMsg: "",
                    alertOpen: true,
                    errorAlertOpen: false,
                    startDate: new Date(),
                    endDate: new Date(),
                    invalid: {
                        name: false,
                        location: false,
                        startDate: false,
                        endDate: false
                    }
                });
            })


    };

    render() {
        return (
            <div>
                <Container className="mt-5 pb-5">
                    <Card className="justify-content-center text-center p-3 mx-auto" style={{ "backgroundImage": "radial-gradient(circle, rgb(248, 208, 148), rgb(248, 226, 194))", "boxShadow": "0px 0px 30px 20px rgb(255, 230, 161)", "maxWidth": "700px" }}>
                        <h1 className="mt-3"> <strong>Create Social</strong> </h1>
                        <img className="mx-auto" src={Logo} width="100" height="100" alt="logo" />

                        <Card.Body className="text-left mx-auto" style={{ "width": "80%" }}>
                            <Alert variant="success" show={this.state.alertOpen}>
                                Your Social was successfully submitted. Want to create another one?
                            </Alert>
                            <Alert variant="danger" show={this.state.errorAlertOpen}>
                                Your Social was not submitted. Please fix the highlighted fields below.
                            </Alert>
                            <Form >
                                <Form.Group style={{ "width": "100%", "maxWidth": "500px" }}>
                                    <Form.Label className="font-weight-light "> Social Name (required) </Form.Label>
                                    <Form.Control
                                        isInvalid={this.state.invalid.name}
                                        value={this.state.name}
                                        name="name"
                                        onChange={this.handleInputChange}
                                        type="text"
                                        placeholder="I want to name my Social..."
                                    ></Form.Control>

                                    <Form.Label
                                        className="font-weight-light mt-3"> Location (required) </Form.Label>
                                    <div>
                                        <LocationAutocomplete
                                            className={`form-control ${this.state.invalid.location ? "is-invalid" : ""}`}
                                            style={{ "width": "100%" }}
                                            name="location"
                                            placeholder="My Social will be at..."
                                            googleAPIKey="AIzaSyDxStRoOM-60GmRhXIWnOgw-MFNnzT8xwc"
                                            onChange={(e) => this.handleInputChange(e)}
                                            onDropdownSelect={() => { }}
                                        />
                                    </div>
                                    <Form.Label
                                        className="font-weight-light mt-3"> Description </Form.Label>
                                    <DynamicTextArea
                                        className="form-control"
                                        placeholder="I want others to know that..."
                                        onChange={(e) => this.handleInputChange(e)} />

                                    <div className="r-form d-inline-block">
                                        <Form.Label className="font-weight-light mt-3 w-100"> Start Date (required)</Form.Label>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={(d) => this.handleDateChange("startDate", d)}
                                            showTimeInput
                                            timeInputLabel="Time: "
                                            dateFormat="MMMM d, yyyy h:mm aa"

                                            className={`form-control ${this.state.invalid.startDate ? "is-invalid" : ""}`}
                                        />
                                    </div>
                                    <div className="r-form d-inline-block">
                                        <Form.Label className="font-weight-light mt-3 w-100"> End Date (required)</Form.Label>
                                        <DatePicker
                                            selected={this.state.endDate}
                                            onChange={(d) => this.handleDateChange("endDate", d)}
                                            showTimeInput
                                            timeInputLabel="Time: "
                                            dateFormat="MMMM d, yyyy h:mm aa"

                                            className={`form-control ${this.state.invalid.endDate ? "is-invalid" : ""}`}
                                        />
                                    </div>

                                    <Form.Label className="font-weight-light mt-3 w-100"> Social Image (required)</Form.Label>
                                    <Form.Control
                                        isInvalid={this.state.invalid.image}
                                        value={this.state.image}
                                        name="image"
                                        onChange={(e) => this.handleInputChange(e)}
                                        type="text"
                                        placeholder="My social's cover photo can be found at..."
                                    ></Form.Control>
                                    <span style={{ "fontSize": "0.8rem" }} className="text-danger">{this.state.errorImgMsg}</span>
                                    <img onError={this.addDefaultSrc} className="mt-2 img-fluid" src={this.state.image} alt={"This is a preview of your image"} />
                                    {/* <Form.Label> Category:</Form.Label>
                                    <Form.Control as="select"
                                        name="category"
                                        onChange={this.handleInputChange}>
                                        <option value={this.state.category}>Hobbies</option>
                                        <option value={this.state.category}>Outdoors Life</option>
                                        <option value={this.state.category}>Nightlife</option>
                                        <option value={this.state.category}>Sports</option>
                                        <option value={this.state.category}>Social</option>
                                        <option value={this.state.category}>Events</option>
                                    </Form.Control> */}


                                    <div className="text-center">
                                        <Button onClick={this.handleFormSubmit} className="mt-3" variant="light" size="lg">Create</Button>

                                    </div>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default AddSocial;
