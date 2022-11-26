import React from "react";
import { Container, Group, Paper, Text, Title } from "@mantine/core";
import PaymentForm from "./DonateForm";
import Lottie from "lottie-react";
import petHug from "../images/107772-pet-hug.json";
const About = () => {
  return (
    <Container>
      <Paper
        shadow="md"
        p="md"
        style={{ marginTop: "20px", textAlign: "center " }}
        withBorder
      >
        <Lottie
          animationData={petHug}
          style={{ width: "450px", display: "inline-block" }}
        />
        <Title>About us</Title>
        <Text>
          Pet Heaven (Pet Heaven) is a registered charity and home to dozens of
          dogs and cats, and the animals under their care consist of vagrant
          strays, abandoned, traumatised, abused and rescued animals.
        </Text>
        <br />
        <Text>
          Pet Heaven is strictly no-kill. Pet Heaven aims to encourage the
          public to adopt instead of buying animals, and endeavour to rejoin the
          animals at Pet Heaven with loving and committed families.
        </Text>
        <br />
        <Text>
          Some of the many different tasks that Pet Heaven carries out to care
          for the animals include feeding them, treating sick animals, bringing
          them for veterinary check ups and when they are sick or injured,
          vaccinating them against illnesses, and neutering/sterilising them.
        </Text>
        <br />
        <Text>
          Pet Heaven constantly needs the support of the public to help keep the
          charity running and continue caring for the animals. Some of the ways
          members of the public can help include, giving monetary contributions
          and monthly pledges, donating food for the cats and dogs and fostering
          the animals.
        </Text>
        <br />
        <Text>
          Those interested can also volunteer their time, energy and love to
          help Pet Heaven by taking care of the animals, taking the dogs out for
          walks and/or other daily necessary tasks. Email Pet Heaven at
          general@PetHeaven.com for more details.
        </Text>
      </Paper>

      <Paper shadow="md" p="md" style={{ marginTop: "20px" }} withBorder>
        <Title>Find us</Title>

        <Container
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Container
            style={{
              height: "375px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "0",
              paddingRight: "0",
              marginRight: "0",
              marginLeft: "0",
            }}
          >
            <p color="dimmed">Address: 50 Sungei Tengah Rd, Singapore 699012</p>
            <p color="dimmed">Email: contact@petHeaven.com</p>
            <p color="dimmed">Phone: +65 6287 5355</p>
          </Container>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6565870760946!2d103.72606031504992!3d1.382689998991577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5027f2c8d47f809f!2zMcKwMjInNTcuNyJOIDEwM8KwNDMnNDEuNyJF!5e0!3m2!1sen!2ssg!4v1669395664185!5m2!1sen!2ssg"
            width="450"
            height="375"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Container>
      </Paper>
    </Container>
  );
};

export default About;
