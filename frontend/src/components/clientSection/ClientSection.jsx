
import React from 'react';
import  client1 from '../../assets/img/clients/client-1.png';
import client2 from "../../assets/img/clients/client-2.png";
import client3 from "../../assets/img/clients/client-3.png"
import client4 from "../../assets/img/clients/client-4.png"
import client5 from "../../assets/img/clients/client-5.png"
import client6 from "../../assets/img/clients/client-6.png"
import client7 from "../../assets/img/clients/client-7.png"
import client8 from "../../assets/img/clients/client-8.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './clientSection.css';

// Import other client images...
const clients=[client1,client2,client3,client4,client5,client6,client7,client8];

const ClientSection = () => {
  // 
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  return (
    <>
     <section id="clients" >
    <div className="slider-container container-fluid mt-5 mb-3">
    
      <Slider {...settings}>
       {clients.map((client,index)=>(
        <div className='container '  key={index} style={{height:"150px",width:"150px"}} >
          <img src={client} height="80%" width="80%" alt="client"/>
        </div>
       ))}
      </Slider>
      </div>
   
    </section>
    </>
  );
}

export default ClientSection;

