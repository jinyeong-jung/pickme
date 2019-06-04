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

const ChampionInfoContainer = styled.div`
  height: 40%;
  width: 50%;
  padding: 50px 30px;
`;

const ChampionInfoName = styled.span`
  color: ${props => props.theme.whiteColor};
  font-size: 30px;
`;

const ChampionInfoTitle = styled.span`
  color: ${props => props.theme.greyColor};
  font-size: 20px;
  margin-left: 15px;
`;

const ChampionInfoBlurb = styled.div`
  color: ${props => props.theme.whiteColor};
  margin-top: 20px;
  font-size: 14px;
  font-weight: 300;
  line-height: 150%;
`;

interface IProps {
  championInfo?: any;
}

const DetailPresenter: React.SFC<IProps> = ({ championInfo }) => (
  <Container>
    <Menu />
    {championInfo && (
      <ChampionInfoContainer>
        <ChampionInfoName>{championInfo.name}</ChampionInfoName>
        <ChampionInfoTitle>{championInfo.title}</ChampionInfoTitle>
        <ChampionInfoBlurb>{championInfo.blurb}</ChampionInfoBlurb>
      </ChampionInfoContainer>
    )}
  </Container>
);

export default DetailPresenter;
