import React, { Component } from "react";
import API from "../../utils/API";
import Moment from "react-moment"
import moment from "moment"
import "./main.css";
import { Card, Button, ButtonGroup, Container } from "react-bootstrap";
import GoingListModal from "../../components/GoingListModal";
import ConfirmModal from "../../components/ConfirmModal";
import AlertModal from "../../components/AlertModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LocationAutocomplete from 'location-autocomplete';
import DynamicTextArea from 'react-autosize-textarea';
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
    updateModalShow: false,
    going: [],
    loading: true,
    confirmMessage: "",
    updateMessage: "",
    isCreator: false,
    editMode: false,
    hideUpdateModalBtn: true
  };

  getSocial = (cb) => {
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
        confirmMessage: `Are you sure you want to delete your Social "${this.social.name}"?`,
        isCreator: (this.social.creator._id == this.user._id) ? true : false
      });

      if(cb) {
        cb();
      }
    });
  };

  postComment = () => {
    // if comment input is blank
    if (!this.state.commentInput.trim()) {
      return;
    }

    // Create Comment to be inserted
    const newComment = {
      text: this.state.commentInput.trim(),
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
    this.setState({ confirmMessage: <i className="fa-spin text-info fas fa-circle-notch"></i> })

    // Delete Social and all associated content (i.e. Comment, User going/likes/dislikes)
    API.deleteSocial(this.socialId)
      .then(() => {
        // Show message after deletion
        this.setState({ confirmMessage: <span className="text-success">"{this.social.name}" has successfully been deleted!</span> })

        // Redirect to user profile page
        setTimeout(() => this.props.history.push(`/profile`), 2000);
        
      })
      
    }
    
    updateSocial = () => {
      
      // Form Validation
      let invalid = {};
      
      // Check name and location are not blank
      if (!this.state.nameEdit) { invalid.name = true; }
      if (!this.state.locationEdit) { invalid.location = true; }
      
      // Check startDate and endDate are not blank and are Date objects
      if ((!this.state.startDateEdit || Object.prototype.toString.call(this.state.startDateEdit) !== '[object Date]')) { invalid.startDate = true; }
      if (!this.state.endDateEdit || Object.prototype.toString.call(this.state.endDateEdit) !== '[object Date]') { invalid.endDate = true; }
      // Check to see whether or not startDate is before endDate
      if (!invalid.startDate && !invalid.endDate) {
        if (moment(this.state.startDateEdit).isAfter(this.state.endDateEdit)) {
          invalid.startDate = true;
          invalid.endDate = true;
        }
      }

      // Check if image invalid error is set
      if (this.state.invalid.image || !this.state.imageEdit) { invalid.image = true; }
      
      // If any errors, open errorAlert
      if (Object.keys(invalid).length) {
        this.setState({
          // errorAlertOpen: true,
          invalid
        })
      return;
    }

    // Submit Social object to API
    const updatedSocial = {
      name: this.state.nameEdit,
      startDate: this.state.startDateEdit,
      endDate: this.state.endDateEdit,
      location: this.state.locationEdit,
      image: this.state.imageEdit,
      // category: "this.state.category",
      description: this.state.descriptionEdit
    }


    //Show loading screen
    this.setState({ updateModalShow: true, updateMessage: <i className="fa-spin text-info fas fa-circle-notch"></i>, hideUpdateModalBtn: true });

    API.updateSocial(this.socialId, updatedSocial)
      .then((obj) => {
        if (obj.data) {
          // Reset state variables
          this.getSocial(() =>
            this.setState({
              editMode: false,
              updateMessage: <span className="text-success">"{this.social.name}" has successfully been updated!</span> ,
              hideUpdateModalBtn: false
            })
          )

        }
      })

  }

  startEditMode = () => {

    // set initial editing values
    this.setState({
      locationEdit: this.social.location,
      nameEdit: this.social.name,
      startDateEdit: new Date(this.social.startDate),
      endDateEdit: new Date(this.social.endDate),
      descriptionEdit: this.social.description,
      imageEdit: this.social.image,
      editMode: true,
      invalid: {
        name: false,
        location: false,
        startDate: false,
        endDate: false,
        image: false
      }
    });
  }

  handleInputChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
      invalid: {
        name: false,
        location: false,
        startDate: false,
        endDate: false,
        image: false
      }
    });

  }

  handleDropdownSelect = e => {
    let { value, name } = e.input;

    this.setState({

      [name]: value,
      invalid: {
        name: false,
        location: false,
        startDate: false,
        endDate: false,
        image: false
      }

    });

  }

  handleDateChange = (name, d) => {
    this.setState({
      [name]: d,
      invalid: {
        name: false,
        location: false,
        startDate: false,
        endDate: false,
        image: false
      }
    });

  };

  addDefaultSrc = ev => {
    ev.target.src = "https://pbs.twimg.com/media/DnE2oP6UYAAJr8R.jpg";
    if (this.state.imageEdit) {
      this.setState({
        // errorImgMsg: "An image could not be found at the specified URL (404)",
        invalid: {
          image: true
        }
      })
    }
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

        if (c._id == rc._id) {
          return false;
        } else {
          return true;
        }
      })
      this.setState({ comments: removed });

    });

    const channel3 = pusher.subscribe(`add-going`);
    channel3.bind(`social-${this.socialId}`, (data) => {
      this.setState({ going: [...this.state.going, data] });
    });  

    const channel4 = pusher.subscribe(`remove-going`);
    channel4.bind(`social-${this.socialId}`, (ru_id) => {
      const removed = this.state.going.filter((u) => {

        if (u._id == ru_id) {
          return false;
        } else {
          return true;
        }
      })
      this.setState({ going: removed });
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
            {
              (this.state.isCreator && this.state.editMode) ?
                <>
                  <Card.Img
                    style={{ "objectFit": "cover", height: "30vh" }}
                    variant="top"
                    src={this.state.imageEdit}
                    onError={this.addDefaultSrc}
                  />
                  <input
                    className={`form-control ${this.state.invalid.image ? "is-invalid" : ""}`} name="imageEdit" value={this.state.imageEdit} onChange={(e) => this.handleInputChange(e)} />
                </>
                :
                <Card.Img
                  style={{ "objectFit": "cover", height: "30vh" }}
                  variant="top"
                  src={this.social.image}
                />

            }
            <Card.Body className="text-left">
              {
                (this.state.isCreator && !this.state.editMode) ?
                  <>
                    <span id="delete-icon" onClick={() => this.setState({ confirmModalShow: true })}><i className="far fa-trash-alt"></i> </span>
                    <span id="edit-icon" onClick={() => this.startEditMode()}><i className="far fa-edit"></i> </span>
                  </>
                  : (this.state.isCreator && this.state.editMode) ?
                    <>
                      <span id="save-icon" onClick={() => this.updateSocial()}><i className="fas fa-check"></i> </span>
                      <span id="cancel-icon" onClick={() => this.setState({ editMode: false })}><i className="fas fa-times"></i> </span>
                    </>
                    : ""

              }
              {/* Upcoming Social Warning */}
              {
                moment(Date.now()).isBetween(this.social.startDate, this.social.endDate) ?
                  <h6 className="flow-text text-success"> This event is happening right now! </h6>
                  : moment(this.social.endDate).isBefore(Date.now()) ?
                    <h6 className="flow-text text-danger"> This event has already passed. </h6>
                    :
                    <h6 className="flow-text text-danger"> {moment(this.social.startDate).from(Date.now())} </h6>

              }
              {/* Social Start Date*/}
              <h5 className="flow-text text-info font-weight-bold">

                {
                  this.state.editMode ?
                    <DatePicker
                      width={"90%"}
                      selected={this.state.startDateEdit}
                      onChange={(d) => this.handleDateChange("startDateEdit", d)}
                      showTimeInput
                      timeInputLabel="Time: "
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className={`form-control ${this.state.invalid.startDate ? "is-invalid" : ""}`}
                    />
                    :
                    <Moment format="dddd, MMMM Do YYYY, h:mm a">{this.social.startDate}</Moment>
                }


              </h5>
              {/* Social End Date*/}
              <h6 className="flow-text text-info"> — &nbsp;&nbsp;

              {
                  this.state.editMode ?
                    <DatePicker
                      width={"90%"}
                      selected={this.state.endDateEdit}
                      onChange={(d) => this.handleDateChange("endDateEdit", d)}
                      showTimeInput
                      timeInputLabel="Time: "
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className={`form-control ${this.state.invalid.endDate ? "is-invalid" : ""}`}
                    />
                    :
                    <Moment format="dddd, MMMM Do YYYY, h:mm a">{this.social.endDate}</Moment>
                }


              </h6>
              {/* Social Title */}
              <h4 className="flow-text" style={{ "wordWrap": "break-word" }}>
                {(this.state.editMode) ?
                  <input className={`form-control ${this.state.invalid.name ? "is-invalid" : ""}`} name="nameEdit" value={this.state.nameEdit} onChange={(e) => this.handleInputChange(e)} />
                  :
                  <>
                    {this.social.name}
                  </>
                }
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
              {
                this.state.editMode ?
                  <h6
                    className="text-secondary"
                    style={{ "wordWrap": "break-word" }}
                  >

                    <i className="fas fa-thumbtack text-danger mr-2"></i>

                    <LocationAutocomplete
                      className={`form-control ${this.state.invalid.location ? "is-invalid" : ""}`}
                      style={{ "width": "90%", "display": "inline-block" }}
                      value={this.state.locationEdit}
                      name="locationEdit"
                      placeholder="My Social will be at..."
                      googleAPIKey={process.env.REACT_APP_GOOGLE_API_KEY}
                      onChange={(e) => this.handleInputChange(e)}
                      onDropdownSelect={(e) => this.handleDropdownSelect(e)}
                    />
                  </h6>
                  :
                  <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.social.location)}`}>
                    <h6
                      className="text-secondary"
                      style={{ "wordWrap": "break-word" }}
                    >

                      <i className="fas fa-thumbtack text-danger mr-2"></i>

                      {this.social.location}
                    </h6>
                  </a>
              }
              <hr />
              <h4 className="flow-text text-muted font-weight-bold">
                Description
            </h4>
              <p style={{ "wordWrap": "break-word" }}>
                {
                  (this.state.isCreator && this.state.editMode) ?
                    <DynamicTextArea
                      className="form-control"
                      placeholder="I want others to know that..."
                      value={this.state.descriptionEdit}
                      name="descriptionEdit"
                      onChange={(e) => this.handleInputChange(e)}
                    />
                    :
                    <>
                      {this.social.description ? this.social.description : "No description was provided."}
                    </>
                }


              </p>
              <p
                className="hover-underline mb-1 font-weight-bold"
                onClick={() => this.setState({ goingModalShow: true })}
              >

                <i className="fas fa-users"></i> {this.state.going.length} {this.state.going.length == 1 ? "person": "people"} going
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
                      <i className="far fa-check-circle"></i>&nbsp;I want to go...
                </Button>
                  )}

                {this.state.userInterested ? (
                  <Button onClick={() => this.unmarkInterested()} variant="info">
                    <i className="fas fa-thumbs-up"></i>&nbsp;Liked!
                </Button>
                ) : (
                    <Button
                      onClick={() => this.markInterested()}
                      variant="outline-info"
                    >
                      <i className="far fa-thumbs-up"></i>&nbsp;I'm interested...
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

          <AlertModal
            show={this.state.updateModalShow}
            onHide={() => this.setState({ updateModalShow: false })}
            title={`Update Social`}
            message={this.state.updateMessage}
            hideBtn={this.state.hideUpdateModalBtn}
          />


        </Container>
      )
    };
  }
}

export default Social;
