import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu/index";
import { saveChampionInfo } from "../../modules/champion";
import styled from "../../typed-components";

const Container = styled.div`
  min-height: 100vh;
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
  saveChampionInformation: (
    info: any
  ) => {
    championInfo: any;
    type: string;
  };
}

const HomePresenter: React.SFC<IProps> = ({
  data,
  saveChampionInformation
}) => {
  const handleChampClick = info => {
    saveChampionInformation(info);
  };
  return (
    <Container>
      <Menu />
      <ChampionsContainer>
        <Title>Select a Champion (Ctrl + F)</Title>
        <Champions>
          {data.map(champ => (
            <Link
              onClick={() => handleChampClick(champ)}
              key={champ.key}
              to={{
                pathname: `/detail/${champ.name}`
              }}
            >
              <Champion>{champ.name}</Champion>
            </Link>
          ))}
        </Champions>
      </ChampionsContainer>
    </Container>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  saveChampionInformation: info => dispatch(saveChampionInfo(info))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePresenter);
