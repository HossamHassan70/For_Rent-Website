import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import Image1 from '../images/image.png';
import Image2 from '../images/image4.jpg';
import Image3 from '../images/image2.jpeg';

function AboutUs() {
    return (
        <div className="about_section layout_padding">
            <Container className="text-center">
                <div className="about_section_main">
                    <Row>
                        <Col md={6}>
                            <div className="about_taital_main">
                                <h1 className="about_taital">About Our Rental Website</h1>
                                <p className="about_text">Exploring rental websites is an exciting journey that takes you into a world of diverse properties and living spaces. Our specialized platform offers a wide range of rental options, each tailored to meet your unique preferences and needs. From cozy apartments to spacious houses, our website caters to a broad spectrum of rental seekers.</p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={Image1}
                                        alt="First slide"
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={Image2}
                                        alt="Second slide"
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={Image3}
                                        alt="Third slide"
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default AboutUs;
