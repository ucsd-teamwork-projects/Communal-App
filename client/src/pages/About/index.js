import React from 'react'
import CommunalFont from "../../components/CommunalFont";
import { Container, Row } from "react-bootstrap";
import "./index.css";

export default function About() {
    return (
        <div className="about">
            <Container>
                <Row>
                    <div className="container-about mt-5">
                        <p style={{"font-size": "30px", "font-weight": "bold"}}>What the heck is <CommunalFont>Communal?</CommunalFont></p>
                        <p>We're glad you asked.</p>
                        <p>Communal is a social app designed to bring people together through exploring their cities.</p>
                        <p>Imagine swiping through a dating app without the empty feeling inside.</p>
                        <p>You can discover hobbies, clubs, speakeasys and more by attending what we call Socials.</p>
                        <br></br>
                        <p style={{"font-size": "30px", "font-weight": "bold"}}>What is a <CommunalFont>Social?</CommunalFont></p>
                        <p>Communal brings people together through what we call Socials.</p>
                        <p>These are basically just events you join or create.</p>
                        <p>Through Socials, you get to explore your city and hopefully make some new friends along the way!</p>
                        <br></br>
                        <p style={{"font-size": "30px", "font-weight": "bold"}}>What's with the <CommunalFont>bee?</CommunalFont></p>                  
                        <p>Much like bees, people need community. We hope to facilitate that community with <CommunalFont>Communal.</CommunalFont></p>
                    </div>
                </Row>
            </Container>
        </div>
    )
}
