import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box } from '@mui/material';



const FaqSection = () => {
  const accord = [
    {
      "title": "How Do I Open an Account with Your Broking Firm?",
      "desc": "Opening an account with our broking firm is easy. Simply visit our website, fill out the online application form, and follow the instructions to submit the required documents.",
      "id": 1
    },
    {
      "title": "What Services Does Your Broking Firm Offer?",
      "desc": "Our broking firm offers a range of services, including stock trading, options trading, commodity trading, portfolio management, research and analysis, and investment advisory.",
      "id": 2
    },
    {
      "title": "What Types of Accounts Do You Offer?",
      "desc": "We offer various types of accounts, including individual accounts, joint accounts, corporate accounts, and retirement accounts, each tailored to different client needs.",
      "id": 3
    },
    {
      "title": "How Can I Place Trades?",
      "desc": "You can place trades through our online trading platform, mobile app, or by contacting our trading desk directly. We provide user-friendly tools for executing trades efficiently.",
      "id": 4
    },
    {
      "title": "How Do You Ensure the Security of My Account and Personal Information?",
      "desc": "Security is a top priority for us. We employ advanced encryption and authentication measures to safeguard your account and personal information. Our systems undergo regular security audits.",
      "id": 5
    },
    {
      "title": "Do You Offer Educational Resources for Traders and Investors?",
      "desc": "Absolutely, we offer educational resources such as webinars, seminars, and tutorials to help traders and investors enhance their knowledge and skills.",
      "id": 6
    }
  ];

  return (
    <section id="faq" >
      <h2 style={{ fontWeight: "bold",alignContent:"center",alignSelf:"center", fontSize: "30px",alignItems: "center",
      marginLeft:"38%",marginRight:"35%", marginBottom: "3rem" }}>

        Frequently Asked Questions

      </h2>
      <Box style={{ marginLeft: "30px", marginRight: "30px", marginBottom: "5rem" }}>

        {accord.map((data, index) => (
          <Accordion defaultActiveKey={index} alwaysOpen>
            <Accordion.Item eventKey={data.id}>
              <Accordion.Header style={{ padding: "0.5rem" }}>
                <h5>{data.title}</h5>
              </Accordion.Header>
              <Accordion.Body style={{ marginLeft: "10px" }}>
                <h6> {data.desc}</h6>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

        ))}
      </Box>

    </section>
  )
}

export default FaqSection