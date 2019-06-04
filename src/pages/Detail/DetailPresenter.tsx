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

const InfoContainer = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  padding: 50px 30px;
`;

const ChampionInfoContainer = styled.div`
  width: 50%;
`;

const WinRateContainer = styled.div`
  width: 50%;
  background-color: white;
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
  winRate?: number;
}

const DetailPresenter: React.SFC<IProps> = ({ championInfo, winRate }) => (
  <Container>
    <Menu />
    <InfoContainer>
      {championInfo && (
        <ChampionInfoContainer>
          <ChampionInfoName>{championInfo.name}</ChampionInfoName>
          <ChampionInfoTitle>{championInfo.title}</ChampionInfoTitle>
          <ChampionInfoBlurb>{championInfo.blurb}</ChampionInfoBlurb>
        </ChampionInfoContainer>
      )}
      <WinRateContainer>
        Your Win Rate of {championInfo.name} is {winRate}%!
      </WinRateContainer>
    </InfoContainer>
  </Container>
);

export default DetailPresenter;
