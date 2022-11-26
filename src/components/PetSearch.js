import { Container } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";
import ShowPet from "./ShowPet";

const PetSearch = ({ petType }) => {
  console.log(petType);
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default PetSearch;
