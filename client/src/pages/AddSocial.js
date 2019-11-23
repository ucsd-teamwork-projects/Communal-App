import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from 'react-images-upload';
import { Form, Button, Card, Container } from "react-bootstrap";

export class AddSocial extends Component {
    state = {
        name: "",
        category: "",
        location: "",
        image: "",
        startDate: new Date(),  
        pictures: []  
    };

    handleInputChange = event => {
        let {value, name} = event.target;

        this.setState({
            [name]: value,            
        });
    };

    handleChange = date => {
        this.setState({ 
          startDate: date,
        });
      };

      onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    handleFormSubmit = event => {
        event.preventDefault();

        this.setState({
            name: "",
            category: "",
            location: "",
            image: "",
        });
    };

    render() {
        return (
            <div>
                <Container className="mt-5">                    
                <Card className="text-center">
                <Card.Header>
                  <h1 className="Display-1">Create a Social!</h1>
                </Card.Header>
                <Card.Body className="text-left mx-auto">
                <Form>
                    <Form.Group>                    
                    <Form.Label> The name of your event:</Form.Label>
                    <Form.Control
                    value={this.state.name}
                    name="name"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Name"
                    ></Form.Control>                    
                    <Form.Label> Category:</Form.Label>
                    <Form.Control as="select"
                    name="category"
                    onChange={this.handleInputChange}>                    
                        <option value={this.state.category}>Hobbies</option>
                        <option value={this.state.category}>Outdoors Life</option>
                        <option value={this.state.category}>Nightlife</option>
                        <option value={this.state.category}>Sports</option>
                        <option value={this.state.category}>Social</option>
                        <option value={this.state.category}>Events</option>                    
                    </Form.Control>                  
                    <Form.Label> Location: (You can also put specific instructions for hard to find places)</Form.Label>
                    <Form.Control as="textarea" rows="3"
                    value={this.state.location}
                    name="location"
                    onChange={this.handleInputChange}
                    type="text"
                    >
                    </Form.Control>               
                <Form.Label> Date & Time:</Form.Label>
                <br></br>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    showTimeInput
                    timeInputLabel="Time: "
                    dateFormat="MMMM d, yyyy h:mm aa"
                />                
                <br></br>
                Would you like to upload an image for your event?
                <ImageUploader
                withIcon={true}
                withPreview={true}
                buttonText='Choose images'
                onChange={(pic) => this.onDrop(pic)}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                />                
                <Button variant="primary">Submit</Button>
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
