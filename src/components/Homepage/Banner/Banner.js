import React, { Component } from 'react';
import './Banner.scss';

import Carousel from 'react-bootstrap/Carousel';
import Image1 from '../../../assets/img/image1.jpg';
import Image2 from '../../../assets/img/image2.jpg';
import Image3 from '../../../assets/img/image3.jpg';
import Image4 from '../../../assets/img/image4.jpg';


class Banner extends Component {
  render() {
    return (
      <Carousel fade interval={3000} pauseOnHover={false} id="rbCarousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image1}
            alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image2}
            alt="Third slide" />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image3}
            alt="Third slide" />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image4}
            alt="Fourth slide" />

          <Carousel.Caption>
            <h3>Fourth slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default Banner;
