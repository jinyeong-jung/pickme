import React from "react";
import { Link } from "react-router-dom";
import styled from "src/typed-components";

const Container = styled.div`
  height: 70px;
  border-bottom: 0.1px solid ${props => props.theme.greyColor};
  margin: 0 10px;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: ${props => props.theme.whiteColor};
  font-size: 27px;
`;

const Menu = () => {
  return (
    <Container>
      <Link to="/pickme">
        <Title>PICK ME</Title>
      </Link>
    </Container>
  );
};

export default Menu;
