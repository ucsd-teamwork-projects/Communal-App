import React, { Component } from "react";
import Pusher from "pusher-js";

import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./main.css";
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';

// Import responsive header tags
import "../../utils/flowHeaders.min.css";

class Social extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.socialId = this.props.match.params.id;
    this.social = {
      name: "",
      time: "",
      location: "",
      creator: "",
      description: ""
    }
  }

  state = {
    comments: [],
    commentInput: "",
    userGoing: false,
    userInterested: false
  };

  getSocial = () => {
    // Define fields to populate
    const fields = ["creator going comments"];

    // Retrieve this Social object 
    API.getSocialById(this.socialId, fields)
      .then(currSocial => {
        this.setState({
          social: currSocial
        });
      })

  };

  postComment = () => {
    // Create Comment to be inserted
    const newComment = {
      text: this.state.commentInput,
      authorName: this.user.name,
      authorPhoto: this.user.picture
    }

    // Create Comment in database
    API.postCommentToSocial(this.socialId, newComment);

  }

  getUserEventInfo = () => {
    // Determine if user is going or interested in the event
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

  componentDidMount() {
    // Grab user social info
    this.getUserEventInfo();
    // Grab Social object
    this.getSocial();

    // Listen for new comments 
    const pusher = new Pusher('APP_KEY', {
      cluster: 'APP_CLUSTER',
      encrypted: true
    });
    const channel = pusher.subscribe(`comments`);
    channel.bind(`social-${this.socialId}`, data => {
      this.setState({ comments: [...this.state.comments, data] });
    });
  }

  render() {

    return (
      <div>
        <Card >
          <Card.Img style={{ "object-fit": "cover", "height": "30vh" }} variant="top" src="https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&w=1000&q=80" />
          <Card.Body>
            {/* Social Date*/}
            <h5 className="flow-text text-danger" > {this.social.time}</h5>
            {/* Social Title */}
            <h4 className="flow-text" style={{ "word-wrap": "break-word" }}> {this.social.name} </h4>
            {/* Social User */}
            <h6 className="flow-text text-secondary" style={{ "word-wrap": "break-word" }} > <i className="fas fa-user-circle text-info"></i>
              &nbsp; {this.social.creator} </h6>
            {/* Social Location */}
            <h6 className="flow-text text-secondary" style={{ "word-wrap": "break-word" }} > <i className="fas fa-thumbtack text-danger"></i> &nbsp; {this.social.location} </h6>
            <hr />
            <h6 className="flow-text text-muted font-weight-bold">Description</h6>
            <p style={{ "word-wrap": "break-word" }}>
            {this.social.description}
            </p>
            <ButtonGroup className="mt-1" size="sm" >
              {this.state.userGoing ?
                <Button onClick={() => this.unmarkGoing()} variant="success"><i class="fas fa-check-circle"></i>&nbsp;I'm going!</Button>
                : this.state.userInterested ?
                  <Button onClick={() => this.unmarkInterested()} variant="info"><i class="fas fa-star"></i>&nbsp;I'm interested!</Button>
                  :
                  <>
                    <Button onClick={() => this.markGoing()} variant="outline-success"><i class="far fa-check-circle"></i>&nbsp;I'm going...</Button>
                    <Button onClick={() => this.markInterested()} variant="outline-info"><i class="far fa-star"></i>&nbsp;I'm interested...</Button>
                  </>
              }
            </ButtonGroup>

          </Card.Body>
        </Card>

        {/* List of people going */}

        {/* Comment Form */}
      </div>
    );
  }
}

export default Social;
