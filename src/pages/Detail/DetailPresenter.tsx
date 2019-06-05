import React from "react";
import Menu from "../../components/Menu/Menu";
import styled from "../../typed-components";

const Container = styled.div`
  height: 100%;
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
  background-color: ${props => props.theme.whiteColor};
  text-align: center;
`;

const WinRateListTitles = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 30% 20% 20% 30%;
`;

const WinRateListTitle = styled.span`
  background-color: ${props => props.theme.greyColor};
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
  height: 50px;
  line-height: 50px;
  color: ${props => props.theme.whiteColor};
  font-size: 14px;
`;

const MatchContainer = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: 30% 20% 20% 30%;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
`;

const MatchElement = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 14px;
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
        {winRate ? (
          <div>
            Your Win Rate of {championInfo.name} is {winRate}%!
          </div>
        ) : (
          "No data found"
        )}
      </TotalWinRateContainer>
    </InfoContainer>
    <WinRateListContainer>
      <WinRateListTitles>
        <WinRateListTitle>Champion Name</WinRateListTitle>
        <WinRateListTitle>Win</WinRateListTitle>
        <WinRateListTitle>Lost</WinRateListTitle>
        <WinRateListTitle>Win Rate</WinRateListTitle>
      </WinRateListTitles>
      {matchesByChamps
        ? matchesByChamps.map((match, i) => {
            const keys = Object.keys(match);
            return (
              <MatchContainer key={i}>
                <MatchElement>ID: {match[keys[0]]}</MatchElement>
                <MatchElement>WIN: {match[keys[3]]}</MatchElement>
                <MatchElement>LOST: {match[keys[1]]}</MatchElement>
                <MatchElement>WIN RATE: {match[keys[2]]}</MatchElement>
              </MatchContainer>
            );
          })
        : `No data found : You haven't played a game with ${
            championInfo.name
          } yet.`}
    </WinRateListContainer>
  </Container>
);

export default DetailPresenter;
