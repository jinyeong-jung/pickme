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

const TotalWinRateContainer = styled.div`
  width: 50%;
  background-color: ${props => props.theme.greyColor};
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

const WinRateListContainer = styled.div`
  height: 100%;
  margin: 0 30px 50px 30px;
  padding: 30px;
  background-color: ${props => props.theme.whiteColor};
  text-align: center;
`;

interface IProps {
  championInfo?: any;
  winRate?: number;
  matchesByChamps?: any;
}

const DetailPresenter: React.SFC<IProps> = ({
  championInfo,
  winRate,
  matchesByChamps
}) => (
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
      <TotalWinRateContainer>
        {winRate ? <div>Your Win Rate of {championInfo.name} is {winRate}%!</div> : <div>No data found</div>}
      </TotalWinRateContainer>
    </InfoContainer>
    <WinRateListContainer>
      {matchesByChamps
        ? matchesByChamps.map((match, i) => (
            <div key={i}>{JSON.stringify(match)}</div>
          ))
        : `No data found : You haven't played a game with ${
            championInfo.name
          } yet.`}
    </WinRateListContainer>
  </Container>
);

export default DetailPresenter;
