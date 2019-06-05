import React from "react";
import { connect } from "react-redux";
import * as api from "../../lib/api";
import { saveChampions } from "../../modules/champion";
import HomePresenter from "./HomePresenter";

interface IProps {
  saveChampionsList: (
    champions: any
  ) => {
    champions: any;
    type: string;
  };
  champions: [];
}

class HomeContainer extends React.Component<IProps> {
  public state = {
    champions: []
  };

  public getChampions = async () => {
    try {
      const { saveChampionsList } = this.props;

      const response = await api.getChampions();
      const {
        data: { data }
      } = response;

      saveChampionsList(Object.values(data));
    } catch (error) {
      console.log(error);
    }
  };

  public componentDidMount() {
    this.getChampions();
  }

  public render() {
    const { champions } = this.props;
    return <HomePresenter data={champions} />;
  }
}

const mapStateToProps = state => ({
  champions: state.championReducer.champions
});

const mapDispatchToProps = dispatch => ({
  saveChampionsList: champions => dispatch(saveChampions(champions))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
