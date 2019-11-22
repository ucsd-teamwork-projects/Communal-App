import React from "react";
import { Carousel, Badge } from "react-bootstrap";
import Balboa from "../../assets/img/Balboa.jpg";
import Midway from "../../assets/img/midway.png";
import SunsetCliffs from "../../assets/img/SunsetCliffs.jpg";
import BorregoFlowers from "../../assets/img/BorregoFlowers.jpg";
import MountLaguna from "../../assets/img/MountLaguna.jpg";
import Lajollacaves from "../../assets/img/Lajollacaves.jpeg";

function ImgCarousel() {
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

    const CarouselItems = images.map((image, index) => 
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 rounded-lg"
            src={image.img}
            width="300"
            height="500"
            alt="First slide"
          />
          <Carousel.Caption>
              <Badge pill variant="dark" className="p-4" style={{opacity: 0.8}}>
            <h1>
                {image.name}
            </h1>
            <h3 style={{color: "#ffc038"}}>{image.caption}</h3>
              </Badge>
          </Carousel.Caption>
      </Carousel.Item>
    );

  return (
    <Carousel>
        {CarouselItems}
    </Carousel>
  );
}

export default ImgCarousel;
