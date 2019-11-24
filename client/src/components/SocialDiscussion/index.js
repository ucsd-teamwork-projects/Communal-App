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
        "min-width": "20vh",
        "margin-top": "10px",
        "margin-bottom": "10px"

    };

    const textareaStyles = {
        "width": "70%", 
        "padding":"4px 6px", 
        "border-top-left": "10px",
        "border-bottom-left": "10px",
        "size": "0.5 em"
    }

    const buttonStyles = {
        "border-top-left": "0px",
        "border-bottom-left": "0px",
        "border-top-right": "10px",
        "border-bottom-right": "10px"    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit();
    }

    return (
        <div style={mainContainerStyles}>
            <h5 className="flow-text text-center"> {props.title} </h5>
            <hr/>
            <div className="input-group mb-3">
                <DynamicTextArea value={props.inputValue} id="post-input" className=" form-control custom-control" onChange={(e) => props.handleChange(e)} style={textareaStyles} placeholder={props.inputPlaceholder} />
                <span onClick={(e) => handleSubmit(e)} style={buttonStyles} id="vertical-align" className="input-group-addon btn btn-secondary "> 
                    <span > Submit </span>
                </span>
            </div>

                {props.posts.length ? 
                props.posts.reverse().map(post => (
                    <div >
                        <div className="p-3 mb-3 text-left" style={{"background": "#FFFFFF", "border-radius": "10px"}}>
                            <span>
                                <UserProfilePicture style={{"margin-top": "-15px"}} src={post.authorPhoto} size={45}/> 
                                <span className="ml-2" style={{"display": "inline-block"}}> 
                                    <p className="font-weight-bold text-primary" style={{"margin-bottom": "-0.4em"}}>{post.authorName}</p>
                                    <p style={{"font-size": "0.8rem"}} className="text-muted"><Moment format="dddd, MMMM Do YYYY, h:mm a">{post.created}</Moment></p>
                                </span>

                            </span>
                            <p>
                                {post.text}
                            </p>
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
