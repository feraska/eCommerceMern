import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  gap: 1rem;
`;


const Announcement = () => {
 
  return (
    <Container>
    Super Deal! Free Shipping on Orders Over $50
    </Container>
  ) 
};

export default Announcement;