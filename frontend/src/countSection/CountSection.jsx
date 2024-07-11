import React from 'react';
import CounterAnimation from './CounterAnimation';
import "./countemoji.css";

const CountSection = () => {
    return (
        <section id="counts" class="counts">
            <div class="container-md container-lg my-4"  data-aos="fade-down">

                <div class="row mt-5">

                    <div class="col-lg-3 col-md-6">
                        <div class="count-box">
                        
                        <i class="bi bi-emoji-smile mx-2"></i>
                            <CounterAnimation start={0} end={6890} duration={10000} class="purecounter" />
                            <p style={{color:"rgb(250, 38, 38)"}}>Happy Clients</p>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 mt-5 mt-md-0">
                        <div class="count-box">
                            <i class="bi bi-journal-richtext mx-2"></i>
                            <CounterAnimation start={0} end={2140} duration={10000} class="purecounter" />
                            <p style={{color:"rgb(250, 38, 38)"}}>Projects</p>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 mt-5 mt-lg-0">
                        <div class="count-box">
                            <i class="bi bi-headset mx-2"></i>
                            <CounterAnimation start={0} end={4463} duration={10000} class="purecounter" />
                            <p style={{color:"rgb(250, 38, 38)"}}>Hours Of Support</p>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 mt-5 mt-lg-0">
                        <div class="count-box">
                            <i class="bi bi-people mx-2"></i>
                            <CounterAnimation start={0} end={865} duration={10000} class="purecounter" />
                            <p style={{color:"rgb(250, 38, 38)"}}>Hard Workers</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>)
}

export default CountSection