import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import ImgCarousel from "../../components/ImgCarousel";
import Logo from "../../assets/img/logo.png";
import "../../utils/flowHeaders.min.css";
import "./main.css";


function Landing() {
  return (
    // <Container className="mt-5">
    <div >
      <ImgCarousel>
        <h3 className="landing-greeting mx-auto flow-text">
          welcome to <span className="d-block brand-greeting">communal </span>
        </h3>
        <div style={{"width": "100%", "height": "100%", "backgroundImage": "linear-gradient( transparent 30%, rgb(255, 192, 56, 0.8))", "position": "absolute", "top": "0"}}>

        </div>
      </ImgCarousel>
      <section className="features-icons bg-light text-center">
  <Container>
    <Row>
      <Col lg={4}>
        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
          <div className="features-icons-icon d-flex">
            <i className="fas fa-binoculars m-auto text-primary"></i>
          </div>
          <h3>Stay Updated</h3>
          <p className="lead mb-0">Find the hidden gems in places you visit regularly that you never noticed were right around the corner! </p>
        </div>
      </Col>
      <Col lg={4}>
        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
          <div className="features-icons-icon d-flex">
            <i className="fas fa-car m-auto text-primary"></i>
          </div>
          <h3>Stay Updated</h3>
          <p className="lead mb-0">Found something you want your community to see? Socialize it!</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
          <div className="features-icons-icon d-flex">
            <i className="fas fa-users m-auto text-primary"></i>
          </div>
          <h3>Stay Updated</h3>
          <p className="lead mb-0">Create groups for meetups. Hold events as often as you want! </p>
        </div>
      </Col>
    </Row>
  </Container>
</section>
      {/* <Row className="justify-content-center">
        <Col xs={12}>
          <Card className="mx-auto my-3">
            <Card.Header className="text-center">
              <h2 className="Display-1" style={{ "fontFamily": "'Bungee', cursive", "color": "black" }}>COMMUNAL</h2>
              <img src={Logo} width="150" height="150" alt="logo" />
              <h3 className="Display-3"><i>Find People, Do Stuff</i></h3>
            </Card.Header>
            <Card.Body className="text-left mx-auto text-center">
              <Card.Text>
                <i className="fas fa-binoculars fa-2x mr-4"></i>
                <span>Find the hidden gems in places you visit regularly that you never noticed were right around the corner!</span>
              </Card.Text>
              <Card.Text>
                <i className="fas fa-car fa-2x mr-4"></i>
                <span>Found something you want your community to see? Socialize it!</span>
              </Card.Text>
              <Card.Text>
                <i className="fas fa-users fa-2x mr-4"></i>
                <span>Create groups for meetups. Hold events as often as you want!</span>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
          </Card>
        </Col>
      </Row> */}
      </div>

    /* </Container> */
  );
}

export default Landing;
