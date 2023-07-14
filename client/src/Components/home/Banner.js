import React from "react";
import Carousel from 'react-material-ui-carousel';
import './banner.css'
const data = [
"banner_img1.png",
"banner_img_2.png",
"banner_img_3.png",
"banner_img4.png"
]

/*"banner_img1.png",
"banner_img2.png",*/
const Banner = () => {
    return (
      <Carousel
        className="carasousel"
        autoPlay={true}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
            style: {
                background: "#fff",
                color: "#494949",
                borderRadius: 0,
                marginTop: -22,
                height: "104px",
            }
          }
        }
      >
      
      {
        data.map((imag , i) => {
            return(
                    <img src={imag} className="banner_img"  alt=""/>
            )
        })
     
       } 
      </Carousel>
    )
  }
  
  export default Banner
  
