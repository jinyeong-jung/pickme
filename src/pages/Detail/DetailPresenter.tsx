import React from "react";
import Menu from "../../components/Menu/Menu";
import styled from "../../typed-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.blackColor};
  display: flex;
  flex-direction: column;
`;

const DetailPresenter = () => (
  <Container>
    <Menu />
  </Container>
);

export default DetailPresenter;
