import React from 'react'
import UserProfileCircle from "../../components/UserProfileCircle";
import "./index.css";
import "../../utils/flowHeaders.min.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import Logo from "../../assets/img/logo.png";

export default function About() {
    return (
        // <div className="about">
        //     <div className="container-about">
        //         <h1>What the heck is <span className="logo">Communal</span>!?</h1>
        //         <h4>What is a Social!?</h4>
        //         <h4>What's with the bee!?</h4>
        //         <p>We're glad you asked.</p>
        //         <p>Communal is a social app designed to bring people together through exploring their cities.</p>
        //         <p>Imagine swiping through a dating app without the empty feeling inside.</p>
        //         <p>Communal brings people together through what we call Socials, basically events you join or create. Through Socials, you get to explore your city and hopefully make some new friends along the way!</p>
        //         <p>You can discover hobbies, clubs, speakeasys and more!</p>
        //         <p>Much like bees, people need community and we hope to facilitate those gatherings with Communal.</p>



        //     </div>
        // </div>
        <Container className="p-5">
            {/* Greeting/Header */}
            <Row>
                <Col xs={12}>
                    <h3 className="flow-text text-center">
                        What the heck is&nbsp;
                        <span className="logo-name">
                            Communal
                        </span>
                        ?
                    </h3>
                    <div className="text-center"> 
                    <Image
                        className="mx-auto rounded-circle mt-3 mb-3"
                        src={"https://i.ibb.co/vzQVfPn/about-tech.png"}
                        roundedCircle
                        height="200px"
                        /> 

                    </div>
                </Col>
            </Row>

            {/* Communal Explaination/Purpose & Function */}
            <Row>
                <Col xs={12}>
                    <p className="flow-text text-center">
                        Also, what's a Social?
                        <span className="d-block">
                            And why do we love bees so much?
                        </span>
                        <span className="d-block font-weight-bold">
                            We are glad you asked.
                        </span>
                    </p>
                </Col>
            </Row>

            <Row>
                <Col xs={12} className="text-center">
                    <p className="flow-text">
                        Communal is a cutting edge social application with a singular mission: 
                    </p>
                    <p className="flow=text font-weight-bold" style={{"color": "sandybrown"}}>
                        Bring people together who share a common passion for exploration, discovery, and travel.
                    </p> 
                </Col>
            </Row>

            <Row className="">
                <Col md={6} className="text-left mt-3">
                    <h5 className="flow-text font-weight-bold text-center"> The Motivation </h5>
                    <small > 
                        What the world needs now more than ever is a global community unified in finding what is beautiful with the world and with the people living inside it. Unfortunately, society and human nature often seem to cultivate communities comprised of indivduals with similar opinions and interests. Once we've established our close social circle, meeting new indivduals is rare. Understanding those outside of our community becomes increasingly difficult, and we tend to forget that we share more in common than we realize. Through <strong>Social</strong>'s, or user-created social events, we hope to bring people together who share a common love for anything. And as for the bees, we take inspiration from their innate sense of community and ability to come together for a singular purpose. As they do, let us too come together and make the world a more beautiful place. 
                    </small>
                </Col>
                <Col md={6} className="text-left mt-3">
                    <h5 className="flow-text font-weight-bold text-center"> The Tech </h5>
                    <small > 
                       Communal is a modern social application built on the <span className="text-info font-weight-bold">React</span> framework. It utilizes <strong>Express</strong> for server-side API routing and the <span className="text-info font-weight-bold">React Router</span> for front-end routing. Communal's user and Social data is stored in <span className="text-success font-weight-bold">MongoDB</span>, a NoSQL database. Finally with the inclusion of several <span className="text-secondary font-weight-bold">Node.js</span> modules, Communal is a functional MERN (MongoDB, Express, React, Node.js) application. With the help of  <span className="text-danger font-weight-bold">Auth0</span>, Communal effectively provides secure user authentication and interaction with Social Identity Providers, like Google. And finally, we at Communal are proud to announce that with the help of <span className="font-weight-bold" style={{"color": "darkorchid"}}>Pusher</span>, our application is officially real-time! You can now hold real-time conversations with other users on Social pages and explore new events right as other users create them.
                    </small>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs={12} className="text-center">
                    <h5 className="flow-text font-weight-bold"> The Team </h5>
                </Col>
                
            </Row>
            <Row>
                <Col xs={6} md={3} className="text-center">
                    <Image
                    className="mx-auto rounded-circle mt-3 mb-3"
                    src={"https://i.ibb.co/vzQVfPn/about-tech.png"}
                    roundedCircle
                    height="125px"
                    /> 
                    <p className="flow-text mb-0">
                        Colin <a href="https://www.linkedin.com/in/colin-cason-566416156/"><i className="fab fa-linkedin fa-sm"></i></a>
                    </p>
                    <span className="d-block font-italic text-secondary">
                        New dad
                    </span>
                    </Col>
                <Col xs={6} md={3} className="text-center">
                    <Image
                    className="mx-auto rounded-circle mt-3 mb-3"
                    src={"https://media.licdn.com/dms/image/C5603AQE6ZgE4-H1msw/profile-displayphoto-shrink_200_200/0?e=1580947200&v=beta&t=Nxvl0P3x6BR57nvEQS4MspQrw8MhmjSPlbv4UASWc9E"}
                    roundedCircle
                    height="125px"
                    /> 
                    <p className="flow-text mb-0">
                        Edel <a href="https://www.linkedin.com/in/edel-marcelino/" target="_blank"><i className="fab fa-linkedin fa-sm"></i></a>
                    </p>
                    <span className="d-block font-italic text-secondary">
                        MTG prodigy 
                    </span>
                </Col>
                <Col xs={6} md={3} className="text-center">
                    <Image
                    className="mx-auto rounded-circle mt-3 mb-3"
                    src={"https://media.licdn.com/dms/image/C4D03AQGP4bXtXPp9lA/profile-displayphoto-shrink_200_200/0?e=1580947200&v=beta&t=mEQs_KqrVj9usdPPITSSgb_pmIp8bU0_NBQvs2-GNqk"}
                    roundedCircle
                    height="125px"
                    /> 
                    <p className="flow-text mb-0">
                        Johnathan <a href="https://www.linkedin.com/in/johnathan-mundt-430105115/" target="_blank"><i className="fab fa-linkedin fa-sm"></i></a>
                    </p>
                    <span className="d-block font-italic text-secondary">
                        Dog dad 
                    </span>
                </Col>
                <Col xs={6} md={3} className="text-center">
                    <Image
                    className="mx-auto rounded-circle mt-3 mb-3"
                    src={"https://media.licdn.com/dms/image/C4E03AQHgkfjWuE8FEw/profile-displayphoto-shrink_200_200/0?e=1580947200&v=beta&t=eUx3Ys6e8um-wa5qp40fhaYvuBDeD5ND8BnyOPoF5F8"}
                    roundedCircle
                    height="125px"
                    /> 
                    <p className="flow-text mb-0">
                        Matt <a href="https://www.linkedin.com/in/matthew-chen-1ba818155/" target="_blank"><i className="fab fa-linkedin fa-sm"></i></a>
                    </p>
                    <span className="d-block font-italic text-secondary">
                        Broke college student 
                    </span>
                </Col>
                
            </Row>

        </Container>
    )
}
