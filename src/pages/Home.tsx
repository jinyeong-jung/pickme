import React from "react";
import styled from "../typed-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${props => props.theme.blackColor};
`;

const Home: React.SFC = () => {
  return <Container>메인</Container>;
};

export default Home;
