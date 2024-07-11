import React from 'react'
import testimonials_1 from '../../assets/img/testimonials/testimonials-1.jpg';
import testimonials_2 from '../../assets/img/testimonials/testimonials-2.jpg'
import testimonials_3 from '../../assets/img/testimonials/testimonials-3.jpg'
import testimonials_4 from '../../assets/img/testimonials/testimonials-4.jpg'
import testimonials_5 from '../../assets/img/testimonials/testimonials-5.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../clientSection/clientSection.css';

const TestmonialSection = () => {
  const testimon = [
    { "srcimg": testimonials_1, "dest": "CEO & Founder", "title": "Saul Goodman", "desc": "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et Maecen aliquam, risus at semper." },
    { "srcimg": testimonials_2, "dest": "Designer", "desc": " Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.", "title": "Sara Wilsson" },
    { "srcimg": testimonials_3, "title": "Jena Karlis", "dest": "Jena Karlis", "desc": "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim." },
    { "srcimg": testimonials_4, "title": "Matt Brandon", "dest": "Freelancer", "desc": "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam." },
    { "srcimg": testimonials_5, "title": "John Larson", "dest": "Entrepreneu", "desc": "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat esse veniam culpa fore nisi cillum quid." }
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  return (
    <section id="testimonials" style={{marginBottom:"5rem"}}>
      <div className="container-fluid ">
        <div className="section-title " style={{marginTop:"4rem"}}>
          <h2 style={{marginInline:"46%",textJustify:"inter-word",fontWeight:"bolder"}}>Testimonials</h2>

          <p>I'm glad you're interested in collecting testimonials! Testimonials are valuable statements from clients, customers, or users who have had a positive experience with your product, service, or organization.</p>
        </div>

        <div className="slider-container container-fluid">
          <Slider {...settings}>
            {testimon.map((client, index) => (


              <div className="container " key={index}>
                <div className="testimonial-item bg-dark text-white" style={{alignSelf:"center",alignItems:"center",paddingp:"2rem",border:"2px solid white",borderRadius:"25px"}}>
                  <img src={client.srcimg} style={{height:"100px",marginInline:"40%",width:"100px",borderRadius:"20%",paddingTop:"1rem"}} className="testimonial-img " alt=" " />
                  <h3 style={{marginInline:"35%"}}>{client.title}</h3>
                  <h6 style={{marginInline:"40%"}}>{client.dest}</h6>
                  <p style={{"display":"inline-flex","gap":"1px"}}>
                    <img height="10px" width="10px" src="https://toppng.com/uploads/preview/quotation-mark-png-download-image-red-quotation-marks-115630342397ophvtao0x.png" alt="left-quote" />
                    {client.desc}
                    </p>
                    <img height="12px" width="12px" style={{marginInlineStart:"80%",marginTop:"-1%"}} src="https://w7.pngwing.com/pngs/770/967/png-transparent-red-double-quotation-mark-illustration-quotation-marks-in-english-comma-quotation-love-text-logo.png" alt="right quote" />
                  
                </div>
              </div>
            ))}
          </Slider>
        </div>
        

      </div>
    </section>)
}
export default TestmonialSection;