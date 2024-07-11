import React from 'react';
import "./contact.css";

function ContactSection() {

  return (
    <section id="contact" className="contact ">
      <div className="container-fluid-sm container-fluid-xs container-md container-lg " data-aos="fade-down">

        <div className="contact-title" >
          Contact
          </div>

        <div className="row " data-aos="fade-up " data-aos-delay="100 ">

          <div className="col-lg-6 ">

            <div className="row ">
              <div className="col-md-12 ">
                <div className="info-box ">
                  <h3>Our Address</h3>
                  <div className="info-box-content ">
                  <i class="bi bi-geo-alt"></i>
                  <p>KH No-202, Himadri Appartment, Burari Road, Burari, Delhi -110084</p>
                </div>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="info-box mt-4 ">
                  <h3>Email Us</h3>
                  <div className="info-box-content ">
                  <i className="bi bi-envelope "></i>

                  <p>mishuyashu23@gmail.com</p>
                </div>
              </div>
              </div>
              <div className="col-md-6 ">
                <div className="info-box mt-4 ">
                  <h3>Call Us</h3>
                  <div className="info-box-content ">
                  <i className="bi bi-telephone-inbound "></i>

                  <p> +91 9262685542 </p>
                </div>
              </div>
              </div>
            </div>

          </div>

          <div className="col-lg-6 mb-5">
            <form action="forms" method="post " role="form " className="php-email-form ">
              <div className="row mt-4">
                <div className="col form-group mx-2">
                  <input type="text " name="name " className="form-control " id="name " placeholder="Your Name " required />
                </div>
                <div className="col form-group mx-2">
                  <input type="email " className="form-control " name="email " id="email " placeholder="Your Email " required />
                </div>
              </div>
              <div className="form-group my-2">
                <input type="text " className="form-control " name="subject " id="subject " placeholder="Subject " required />
              </div>
              <div className="form-group my-2 ">
                <textarea className="form-control " name="message " rows="5 " placeholder="Message " required ></textarea>
              </div>
              {/* for success
              <div className="my-3 ">
                <div className="loading ">Loading.....</div>
                <div className="error-message "></div>
                <div className="sent-message ">Your message has been sent. Thank you!</div>
              </div>
  */}
              <div className="btn btn-danger " style={{ marginLeft: "35%", marginRight: "35%" }}>
                <button type="submit " className="btn btn-danger ">Send Message</button></div>
            </form>
          </div>

        </div>

      </div>
    </section>)
}

export default ContactSection