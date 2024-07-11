import React, { useContext, useEffect } from 'react';
import Header from "../../common/Header/Header"
import HeroSection from '../../heroSection/HeroSection'
import ClientSection from '../../clientSection/ClientSection';
import AboutSection from '../../aboutSection/AboutSection';
import CountSection from '../../../countSection/CountSection';
import TabSection from '../../../tabSection/TabSection';
//import ServiceSection from '../../serviceSection/ServiceSection';
import PortfolioSection from '../../portfolioSection/PortfolioSection';
import TestmonialSection from '../../testmonialSection/TestmonialSection';
import PriceSection from '../../priceSection/PriceSection';
import FaqSection from '../../faqSection/FaqSection';
import TeamSection from '../../teamSection/TeamSection';
import ContactSection from '../../contactSection/ContactSection';
import Footer from '../../common/Footer/Footer';
import ServiceSection from '../../serviceSection/service';
import { AuthContext } from '../../../contextApi/AuthContext';

const LandingPage = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  //const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("loggedin");
    //const storedRole = localStorage.getItem("role");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

  }, [isAuthenticated]);

return (
    <div>
      <Header />
      <HeroSection />
      <ClientSection />
      <AboutSection />
      <CountSection />
      <TabSection />
      <ServiceSection />
      <PortfolioSection />
      <TestmonialSection />
      <PriceSection />
      <FaqSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default LandingPage