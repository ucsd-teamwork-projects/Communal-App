import React, { Component } from "react";
import API from "../../utils/API";
import Moment from "react-moment"
import "./main.css";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import GoingListModal from "../../components/GoingListModal";
import Loading from "../../components/Loading";
import SocialDiscussion from "../../components/SocialDiscussion";
import "../../utils/flowHeaders.min.css";
// import Pusher from "pusher-js";
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
      creator: "",
      description: ""
    };
  }

  state = {
    comments: [],
    commentInput: "",
    userGoing: false,
    userInterested: false,
    modalShow: false,
    going: [],
    loading: true
  };

  getSocial = () => {
    // Retrieve this Social object
    API.getSocialById(this.socialId).then(currSocial => {
      this.social.creator = currSocial.data.creator.name;
      this.social.startDate = currSocial.data.startDate;
      this.social.endDate = currSocial.data.endDate;
      this.social.location = currSocial.data.location;
      this.social.description = currSocial.data.description;
      this.social.name = currSocial.data.name;

      this.setState({
        comments: currSocial.data.comments, 
        going: currSocial.data.going,
        loading: false
      });

    });
  };

  postComment = e => {
    // Prevent page refresh
    e.preventDefault();
    // Create Comment to be inserted
    const newComment = {
      text: this.state.commentInput,
      authorName: this.user.name,
      authorPhoto: this.user.picture
    };

    // Create Comment in database
    API.postCommentToSocial(this.socialId, newComment);
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

  componentDidMount() {
    // Grab user social info
    this.getUserEventInfo();
    // Grab Social object
    this.getSocial();

    // Listen for new comments
    // const pusher = new Pusher('APP_KEY', {
    //   cluster: 'APP_CLUSTER',
    //   encrypted: true
    // });
    // const channel = pusher.subscribe(`comments`);
    // channel.bind(`social-${this.socialId}`, data => {
    //   this.setState({ comments: [...this.state.comments, data] });
    // });
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    } else {

    return (
      <div>
        <Card>
          <Card.Img
            style={{ "object-fit": "cover", height: "30vh" }}
            variant="top"
            src="https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&w=1000&q=80"
          />
          <Card.Body className="text-left">
            {/* Social Date*/}
            <h5 className="flow-text text-danger"> <Moment format="dddd, MMMM Do YYYY, h:mm a">{this.social.startDate}</Moment></h5>
            {/* Social Title */}
            <h4 className="flow-text" style={{ "word-wrap": "break-word" }}>
              {" "}
              {this.social.name}{" "}
            </h4>
            {/* Social User */}
            <h6
              className="text-secondary"
              style={{ "word-wrap": "break-word" }}
            >
              {" "}
              <i className="fas fa-user-circle text-info"></i>
              &nbsp; {this.social.creator}{" "}
            </h6>
            {/* Social Location */}
            <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.social.location)}`}>
            <h6
              className="text-secondary"
              style={{ "word-wrap": "break-word" }}
            >
              {" "}
              <i className="fas fa-thumbtack text-danger"></i> &nbsp;{" "}
              {this.social.location}{" "}
            </h6>
            </a>
            <hr />
            <h6 className="flow-text text-muted font-weight-bold">
              Description
            </h6>
            <p style={{ "word-wrap": "break-word" }}>
              {this.social.description ? this.social.description : "No description was provided."}
            </p>
            <p
              className="hover-underline mb-1 font-weight-bold"
              onClick={() => this.setState({ modalShow: true })}
            >
              {" "}
              {this.state.going.length} going
            </p>
            <ButtonGroup className="mt-1" size="sm">
              {this.state.userGoing ? (
                <Button onClick={() => this.unmarkGoing()} variant="success">
                  <i class="fas fa-check-circle"></i>&nbsp;I'm going!
                </Button>
              ) : this.state.userInterested ? (
                <Button onClick={() => this.unmarkInterested()} variant="info">
                  <i class="fas fa-star"></i>&nbsp;I'm interested!
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => this.markGoing()}
                    variant="outline-success"
                  >
                    <i class="far fa-check-circle"></i>&nbsp;I'm going...
                  </Button>
                  <Button
                    onClick={() => this.markInterested()}
                    variant="outline-info"
                  >
                    <i class="far fa-star"></i>&nbsp;I'm interested...
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Card.Body>
        </Card>

        <GoingListModal
          going={this.state.going}
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
        />
        <SocialDiscussion
          title="Comments"
          inputPlaceholder="Enter your comment here..."
          posts={this.state.comments}
          handleChange={e => this.setState({ commentInput: e.target.value })}
          handleSubmit={() => this.postComment()}
        />
      </div>
    )};
  }
}

export default Social;
