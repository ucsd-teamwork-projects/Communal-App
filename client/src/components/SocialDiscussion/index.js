import React from "react";
import DynamicTextArea from 'react-autosize-textarea';
import UserProfilePicture from "../UserProfileCircle";
import Moment from "react-moment";
// import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';


// Import responsive header tags
import "../../utils/flowHeaders.min.css";

import "./main.css";

function SocialDiscussion(props) {
    const mainContainerStyles = {
        "padding": "10px",
        "background": "#F0F0F0",
        "minWidth": "20vh",
        "marginTop": "10px",
        "marginBottom": "10px"

    };

    const textareaStyles = {
        "width": "70%", 
        "padding":"4px 6px", 
        "borderTopLeft": "10px",
        "borderBottomLeft": "10px",
        "size": "0.5 em"
    }

    const buttonStyles = {
        "borderTopLeft": "0px",
        "borderBottomLeft": "0px",
        "borderTopRight": "10px",
        "borderBottomRight": "10px"    
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     props.handleSubmit();
    // }

    return (
        <div style={mainContainerStyles}>
            <h5 className="flow-text text-center"> {props.title} </h5>
            <hr/>
            <div className="input-group mb-3">
                <DynamicTextArea value={props.inputValue} id="post-input" className=" form-control custom-control" onChange={(e) => props.handleChange(e)} style={textareaStyles} placeholder={props.inputPlaceholder} />
                <span onClick={(e) => props.handleSubmit(e)} style={buttonStyles} id="vertical-align" className="input-group-addon btn btn-secondary "> 
                    <span > Submit </span>
                </span>
            </div>

                {props.posts.length ? 
                props.posts.map(post => (
                    <div key={post._id}>
                        <div className="p-3 mb-3 text-left" style={{"background": "#FFFFFF", "borderRadius": "10px"}}>
                            <span>
                                <UserProfilePicture style={{"marginTop": "-15px"}} src={post.authorPhoto} size={45}/> 
                                <span className="ml-2" style={{"display": "inline-block"}}> 
                                    <p className="font-weight-bold text-primary" style={{"marginBottom": "-0.4em"}}>{post.authorName}</p>
                                    <p style={{"fontSize": "0.8rem"}} className="text-muted"><Moment format="dddd, MMMM Do YYYY, h:mm a">{post.created}</Moment></p>
                                </span>

                            </span>
                            <p>
                                {post.text}
                            </p>
                            { 
                            (props.currUser == post.creator) ?
                            <span onClick={() => props.handleDelete(post._id)} className="text-danger" style={{"cursor":"pointer"}}> Delete </span>
                            : ""
                            }
                        </div>

                    </div>
                ))
                : 
                <div className="text-center">
                    <p className="text-muted text-center">No comments have been added yet.</p>
                    <p><i className="fas fa-comments fa-3x"></i></p>
                </div>
                }
         </div>
    );
}

export default SocialDiscussion;
