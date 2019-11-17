import React, { Component } from 'react'
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
// Import responsive header tags
import "../utils/flowHeaders.min.css";

export class TestApp extends Component {
    state = {
        userGoing: false,
        userInterested: false
    }

    unmarkGoing = () => {
        this.setState({
            userGoing: false
        })

        // Remove Social from User going 

        // Remove User from Social going
    }

    markGoing = () => {
        this.setState({
            userGoing: true
        })

        // Add Social to User going 

        // Add User to Social going
    }

    unmarkInterested = () => {
        this.setState({
            userInterested: false
        })

        // Remove Social from User interested 

        // Remove User from Social interested
    }

    markInterested = () => {
        this.setState({
            userInterested: true
        })
        // Add Social to User interested 

        // Add User to Social interested
    }

    render() {
        return (
            <div>
                <h1>My TEST APP</h1>
                <p>HELLO WORLD!!!</p>
                <Card >
                    <Card.Img style={{ "object-fit": "cover", "height": "20vh" }} variant="top" src="https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&w=1000&q=80" />
                    <Card.Body>
                        {/* Social Date*/}
                        <h5 className="flow-text text-danger" > Wednesday, March 12th 2019</h5>
                        {/* Social Title */}
                        <h4 className="flow-text" style={{ "word-wrap": "break-word" }}> Rick's Birthday Party </h4>
                        {/* Social User */}
                        <h6 className="flow-text text-secondary" style={{ "word-wrap": "break-word" }} > <i className="fas fa-user-circle text-info"></i>
                            &nbsp; Rick Sanchez </h6>
                        {/* Social Location */}
                        <h6 className="flow-text text-secondary" style={{ "word-wrap": "break-word" }} > <i className="fas fa-thumbtack text-danger"></i> &nbsp; Morty's House </h6>
                        <hr/>
                        <h6 className="flow-text text-muted font-weight-bold">Description</h6>
                        <p style={{ "word-wrap": "break-word" }}>
                            test
                        </p>
                        <ButtonGroup className="mt-1" size="sm" >
                            { this.state.userGoing ? 
                            <Button onClick={()=> this.unmarkGoing()}variant="success"><i class="fas fa-check-circle"></i>&nbsp;I'm going!</Button>
                            : this.state.userInterested ?
                            <Button onClick={()=> this.unmarkInterested()} variant="info"><i class="fas fa-star"></i>&nbsp;I'm interested!</Button>
                            :
                            <>
                            <Button onClick={()=> this.markGoing()}variant="outline-success"><i class="far fa-check-circle"></i>&nbsp;I'm going...</Button>
                            <Button onClick={()=> this.markInterested()}variant="outline-info"><i class="far fa-star"></i>&nbsp;I'm interested...</Button>
                            </>
                            }

                        </ButtonGroup>

                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default TestApp
