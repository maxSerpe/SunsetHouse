import React, { Component } from 'react'
import api from '../api'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import styled from 'styled-components'

import slide1 from '../SunsetSlider/Sunset1.png'
import slide2 from '../SunsetSlider/Sunset2.png'
import slide3 from '../SunsetSlider/Sunset3.png'
import slide4 from '../SunsetSlider/Sunset4.png'

class ImageSlider extends Component {
    render() {
        const responsive = {
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3,
              slidesToSlide: 3, // optional, default to 1.
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
              slidesToSlide: 2, // optional, default to 1.
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
              slidesToSlide: 1, // optional, default to 1.
            },
          };

        return (
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 3,
                    partialVisibilityGutter: 40
                    },
                    mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                    },
                    tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                    }
                }}
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
                >
                <img src={slide1} width="101%" height="477"/>
                <img src={slide2} width="101%" height="477"/>
                <img src={slide3} width="101%" height="477"/>
                <img src={slide4} width="101%" height="477"/>
                
            </Carousel>

        );
    }
}

export default ImageSlider