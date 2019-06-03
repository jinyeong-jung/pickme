import React from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu/index";
import styled from "../../typed-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.blackColor};
  display: flex;
  flex-direction: column;
`;

const ChampionsContainer = styled.div`
  width: 80%;
  background-color: ${props => props.theme.greyColor};
  margin-left: 10%;
  margin-top: 80px;
  margin-bottom: 80px;
  padding: 30px;
`;

const Title = styled.h3`
  width: 100%;
  height: 50px;
  font-size: 20px
  color: ${props => props.theme.whiteColor};
`;

const Champions = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 20%);
`;

const Champion = styled.div`
  font-size: 14px;
  color: ${props => props.theme.whiteColor};
  padding: 10px 0;
`;

interface IProps {
  data?: any;
}

const HomePresenter: React.SFC<IProps> = ({ data }) => {
  return (
    <Container>
      <Menu />
      <ChampionsContainer>
        <Title>Select a Champion (Ctrl + F)</Title>
        <Champions>
          {data.map(champion => (
            <Link to={`/detail/${champion.name}`}>
              <Champion key={champion.key}>{champion.name}</Champion>
            </Link>
          ))}
        </Champions>
      </ChampionsContainer>
    </Container>
  );
};

export default HomePresenter;
