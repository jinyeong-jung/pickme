import React from "react";
import Menu from "../../components/Menu/Menu";
import styled from "../../typed-components";

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.blackColor};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
`;

const InfoContainer = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  padding: 50px 100px;
`;

const ChampionInfoContainer = styled.div`
  width: 40%;
  margin-right: 10%;
`;

const TotalWinRateContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  color: ${props => props.theme.whiteColor};
`;

const TotalWinRateText = styled.div`
  color: ${props => props.theme.whiteColor};
  font-weight: 300;
  margin-bottom: 15px;
`;

const TotalWinRateNumber = styled.div`
  color: ${props => props.theme.whiteColor};
  font-size: 50px;
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
  margin: 0 100px 50px 100px;
  background-color: ${props => props.theme.whiteColor};
  text-align: center;
`;

const WinRateListTitles = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 30% 40% 30%;
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
  grid-template-columns: 30% 40% 30%;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
`;

const MatchElement = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 14px;
`;

const NoData = styled.div`
  width: 100%;
  text-align: center;
  height: 200px;
  line-height: 200px;
  color: ${props => props.theme.blackColor};
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
      {winRate ? (
        <TotalWinRateContainer>
          <TotalWinRateText>
            Your Win Rate of {championInfo.name} is..
          </TotalWinRateText>
          <TotalWinRateNumber>{winRate} %</TotalWinRateNumber>
        </TotalWinRateContainer>
      ) : (
        <TotalWinRateContainer>No data found</TotalWinRateContainer>
      )}
    </InfoContainer>
    <WinRateListContainer>
      <WinRateListTitles>
        <WinRateListTitle>Champion Name</WinRateListTitle>
        <WinRateListTitle>Matches ( win / lose )</WinRateListTitle>
        <WinRateListTitle>Win Rate</WinRateListTitle>
      </WinRateListTitles>
      {matchesByChamps.length !== 0 ? (
        matchesByChamps.map((match, i) => {
          const keys = Object.keys(match);
          return (
            <MatchContainer key={i + match[keys[0]]}>
              <MatchElement>{match[keys[2]]}</MatchElement>
              <MatchElement>
                {match[keys[4]] + match[keys[1]]} ({match[keys[4]]}/
                {match[keys[1]]})
              </MatchElement>
              <MatchElement>{match[keys[3]]} %</MatchElement>
            </MatchContainer>
          );
        })
      ) : (
        <NoData>
          No data found : You haven't played a game with {championInfo.name}{" "}
          yet.
        </NoData>
      )}
    </WinRateListContainer>
  </Container>
);

export default DetailPresenter;
