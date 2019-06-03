import React from "react";
import { Link } from "react-router-dom";
import styled from "src/typed-components";

const Container = styled.div`
  height: 70px;
  border-bottom: 0.1px solid ${props => props.theme.greyColor};
  margin: 0 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: ${props => props.theme.whiteColor};
  font-size: 27px;
`;

const Input = styled.input`
  min-width: 250px;
  border: none;
  border-radius: 13px;
  padding: 10px 13px;
  font-size: 15px;
`;

const Menu = () => (
  <Container>
    <Link to="/">
      <Title>PICK ME</Title>
    </Link>
    <Input />
  </Container>
);

export default Menu;
