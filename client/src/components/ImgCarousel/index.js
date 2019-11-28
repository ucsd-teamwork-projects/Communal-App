import React from "react";
import { Carousel, Badge, Image } from "react-bootstrap";
import Balboa from "../../assets/img/Balboa.jpg";
import Midway from "../../assets/img/midway.png";
import SunsetCliffs from "../../assets/img/SunsetCliffs.jpg";
import BorregoFlowers from "../../assets/img/BorregoFlowers.jpg";
import MountLaguna from "../../assets/img/MountLaguna.jpg";
import Lajollacaves from "../../assets/img/Lajollacaves.jpg";
import "../../utils/flowHeaders.min.css";

function ImgCarousel(props) {
    const images = [
      {
        img: Balboa, 
        caption: "Over 1,000,000 Socializes Yearly",
        name: "Balboa Park"
      },
      {
        img: Midway,
        caption: "Over 115,000 Socialized Yearly",
        name: "USS Midway Museum"
      },
      {
        img: SunsetCliffs,
        caption: "Over 100 Socialized Daily",
        name: "Sunset Cliffs"
      },
      {
        img: BorregoFlowers,
        caption: "Over 50,000 Socialized Yearly",
        name: "Borrego Springs Flowers"
      },
      {
        img: MountLaguna,
        caption: "Over 150 Socialized Daily",
        name: "Mount Laguna"
      },
      {
        img: Lajollacaves,
        caption: "Over 40,000 Socialized Yearly",
        name: "La Jolla Caves"
      }
    ];

    const carouselItemStyle = {
      "height": "50vh",
      "width": "100%",
      "backgroundRepeat": "no-repeat",
      "backgroundSize": "cover"
    }

    const CarouselItems = images.map((image, index) => 
        <Carousel.Item key={index} style={{ "backgroundImage": `url(${image.img})`, ...carouselItemStyle}}>
          {/* <Image
            className="d-block w-100 rounded-lg"
            src={image.img}
            width="300"
            height="500"
            alt="First slide"
            fluid
          /> */}
          {/* <Carousel.Caption style={{backgroundColor: "darkgray", opacity: 0.8, borderRadius: "50px"}}>
            <h3 className="h1 flow-text">
                {image.name}
            </h3>
            <p className="h3 flow-text" style={{color: "#ffc038"}}>{image.caption}</p>
          </Carousel.Caption> */}
      </Carousel.Item>
    );

  return (
    <div style={{"position": "relative"}}>
      <Carousel>
          {CarouselItems}
      </Carousel>
      {props.children}
    </div>
  );
}

export default ImgCarousel;
