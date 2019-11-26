import React, { Component } from "react";
import API from "../../utils/API";
import Moment from "react-moment"
import moment from "moment"
import "./main.css";
import { Card, Button, ButtonGroup, Container } from "react-bootstrap";
import GoingListModal from "../../components/GoingListModal";
import ConfirmModal from "../../components/ConfirmModal";
import Loading from "../../components/Loading";
import SocialDiscussion from "../../components/SocialDiscussion";
import "../../utils/flowHeaders.min.css";
import Pusher from "pusher-js";
// Import responsive header tags

class Social extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.socialId = this.props.match.params.id;
    this.social = {
      name: "",
      startDate: "",
      endDate: "",
      location: "",
      creator: {},
      description: ""
    };
  }

  state = {
    comments: [],
    commentInput: "",
    userGoing: false,
    userInterested: false,
    goingModalShow: false,
    confirmModalShow: false,
    going: [],
    loading: true,
    confirmMessage: ""
  };

  getSocial = () => {
    // Retrieve this Social object
    API.getSocialById(this.socialId).then(currSocial => {
      this.social.creator = currSocial.data.creator;
      this.social.startDate = currSocial.data.startDate;
      this.social.endDate = currSocial.data.endDate;
      this.social.location = currSocial.data.location;
      this.social.description = currSocial.data.description;
      this.social.name = currSocial.data.name;
      this.social.image = currSocial.data.image;

      this.setState({
        comments: currSocial.data.comments.reverse(), 
        going: currSocial.data.going,
        loading: false,
        confirmMessage: `Are you sure you want to delete your Social "${this.social.name}"?`
      });

    });
  };

  postComment = () => {

    // Create Comment to be inserted
    const newComment = {
      text: this.state.commentInput,
      authorName: this.user.name,
      authorPhoto: this.user.image,
      creator: this.user._id
    };

    // Create Comment in database
    API.postCommentToSocial(this.socialId, newComment)
    .then(() => {
      this.setState({
        commentInput: ""
      })
    });
  };

  pullComment = (commentId) => {

    // Pull Comment from Social
    API.pullCommentFromSocial(this.socialId, commentId);
  };

  getUserEventInfo = () => {
    // Determine if user is going or interested in the event
    API.getUser(this.user.email).then(userObj => {
      const { likes, going } = userObj.data;
      let isInterested = false;
      let isGoing = false;

      if (likes.includes(this.socialId)) {
        isInterested = true;
      }
      if (going.includes(this.socialId)) {
        isGoing = true;
      }

      this.setState({
        userGoing: isGoing,
        userInterested: isInterested
      });
    });
  };

  unmarkGoing = () => {
    this.setState({
      userGoing: false
    });

    // Remove Social from User going
    API.pullUserSocialGoing(this.user.email, this.socialId);

    // Remove User from Social going
    API.pullSocialUserGoing(this.user._id, this.socialId);
  };

  markGoing = () => {
    this.setState({
      userGoing: true
    });

    // Add Social to user going
    API.putUserSocialGoing(this.user.email, this.socialId);

    // Add user to Social going
    API.putSocialUserGoing(this.user._id, this.socialId);
  };

  unmarkInterested = () => {
    this.setState({
      userInterested: false
    });

    // Remove Social from User likes
    API.pullUserSocialLike(this.user.email, this.socialId);
  };

  markInterested = () => {
    this.setState({
      userInterested: true
    });
    // Add Social to User likes
    API.putUserSocialLike(this.user.email, this.socialId);
  };

  deleteSocial = () => {
    this.setState({confirmMessage: <i class="fa-spin text-info fas fa-circle-notch"></i>})
    
    // Delete Social and all associated content (i.e. Comment, User going/likes/dislikes)
    API.deleteSocial(this.socialId)
    .then(() => {
      // Show message after deletion
      this.setState({confirmMessage: <span className="text-success">"{this.social.name}" has successfully been deleted!</span>})
      
      // Redirect to user profile page
      setTimeout(() => this.props.history.push(`/profile`), 2000);

    })

  }

  componentDidMount() {
    // Grab user social info
    this.getUserEventInfo();
    // Grab Social object
    this.getSocial();

    // Listen for new comments
    const pusher = new Pusher('cd62b719442b1118e770', {
      cluster: 'us3',
      encrypted: true
    });
    const channel = pusher.subscribe(`comment-creation`);
    channel.bind(`social-${this.socialId}`, (data) => {
      this.setState({ comments: [data, ...this.state.comments] });
    });
    const channel2 = pusher.subscribe(`comment-deletion`);

    channel2.bind(`social-${this.socialId}`, rc => {
      const removed = this.state.comments.filter((c) => {

        if(c._id == rc._id) {
          return false;
        } else {
          return true;
        }
      })
      this.setState({ comments: removed });

    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    } else {
    return (
      <Container className="mt-5">
        <Card>
          {/* <Card.Img
            style={{ "object-fit": "cover", height: "30vh" }}
            variant="top"
            src="https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&w=1000&q=80"
          /> */}
          <Card.Img
            style={{ "objectFit": "cover", height: "30vh" }}
            variant="top"
            src={this.social.image}
          />
          <Card.Body className="text-left">
            {
            (this.social.creator._id == this.user._id) ?
            <span id="delete-icon" onClick={() => this.setState({confirmModalShow: true})}><i className="far fa-trash-alt"></i> </span>
              : ""
            }
            {/* Upcoming Social Warning */}
              {
              moment(Date.now()).isBetween(this.social.startDate, this.social.endDate) ? 
              <h6 className="flow-text text-success"> This event is happening right now! </h6> 
              : moment(this.social.endDate).isBefore(Date.now()) ? 
              <h6 className="flow-text text-danger"> This event has already passed. </h6> 
              : 
              <h6 className="flow-text text-danger"> { moment(this.social.startDate).from(Date.now()) } </h6> 
              
            }
            {/* Social Start Date*/}
            <h5 className="flow-text text-info font-weight-bold"> <Moment format="dddd, MMMM Do YYYY, h:mm a">{this.social.startDate}</Moment></h5>
            {/* Social End Date*/}
            <h6 className="flow-text text-info"> — &nbsp;&nbsp;<Moment format="dddd, MMMM Do YYYY, h:mm a">{this.social.endDate}</Moment></h6>
            {/* Social Title */}
            <h4 className="flow-text" style={{ "wordWrap": "break-word" }}>
              
              {this.social.name}
            </h4>
            {/* Social User */}
            <h6
              className="text-secondary"
              style={{ "wordWrap": "break-word" }}
            >
              
              <i className="fas fa-user-circle text-info mr-1"></i>
              {this.social.creator.name}
            </h6>
            {/* Social Location */}
            <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.social.location)}`}>
            <h6
              className="text-secondary"
              style={{ "wordWrap": "break-word" }}
            >
              
              <i className="fas fa-thumbtack text-danger mr-2"></i>
              {this.social.location}
            </h6>
            </a>
            <hr />
            <h4 className="flow-text text-muted font-weight-bold">
              Description
            </h4>
            <p style={{ "wordWrap": "break-word" }}>
              {this.social.description ? this.social.description : "No description was provided."}
            </p>
            <p
              className="hover-underline mb-1 font-weight-bold"
              onClick={() => this.setState({ goingModalShow: true })}
            >
              
              <i className="far fa-handshake"></i> {this.state.going.length} Person Going
            </p>
            <ButtonGroup className="mt-1" size="sm">
              {this.state.userGoing ? (
                <Button onClick={() => this.unmarkGoing()} variant="success">
                  <i className="fas fa-check-circle"></i>&nbsp;I'm going!
                </Button>
              ) : (
                <Button
                  onClick={() => this.markGoing()}
                  variant="outline-success"
                >
                  <i className="far fa-check-circle"></i>&nbsp;I'm want to go...
                </Button>
              )}
              
             {this.state.userInterested ? (
                <Button onClick={() => this.unmarkInterested()} variant="info">
                  <i className="far fa-thumbs-up"></i>&nbsp;Liked!
                </Button>
              ) : (
                  <Button
                    onClick={() => this.markInterested()}
                    variant="outline-info"
                  >
                    <i className="far fa-star"></i>&nbsp;I'm interested...
                  </Button>
              )}
            </ButtonGroup>
          </Card.Body>

          <SocialDiscussion
            className="mb-5"
            inputValue={this.state.commentInput}
            title={`Comments (${this.state.comments.length})`}
            inputPlaceholder="Enter your comment here..."
            posts={this.state.comments}
            handleChange={e => this.setState({ commentInput: e.target.value })}
            handleSubmit={() => this.postComment()}
            handleDelete={cId => this.pullComment(cId)}
            currUser={this.user._id}
          />
        </Card>

        <GoingListModal
          going={this.state.going}
          show={this.state.goingModalShow}
          onHide={() => this.setState({ goingModalShow: false })}
        />

        <ConfirmModal
          show={this.state.confirmModalShow}
          onHide={() => this.setState({ confirmModalShow: false })}
          title={`Delete Social`}
          message={this.state.confirmMessage}
          onConfirm={() => this.deleteSocial()}
          confirmBtn={"Delete"}
        />  

        
      </Container>
    )};
  }
}

export default Social;
