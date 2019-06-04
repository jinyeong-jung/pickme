import React from "react";
import { RouteComponentProps } from "react-router";
import * as api from "../../lib/api";
import DetailPresenter from "./DetailPresenter";

class DetailContainer extends React.Component<RouteComponentProps> {
  public state = {
    championInfo: {},
    matches: []
  };

  public getMatches = async () => {
    try {
      const response = await api.getMatches();
      const { data } = response;
      this.setState({
        matches: data
      });
    } catch (error) {
      console.log(error);
    }
  };

  public saveChampionInfo = () => {
    const {
      location: {
        state: { championInfo }
      }
    } = this.props;
    this.setState({
      championInfo
    });
  };

  public componentDidMount() {
    this.getMatches();
    this.saveChampionInfo();
  }
  public render() {
    const { championInfo, matches } = this.state;
    console.log(championInfo);
    console.log(matches);
    return <DetailPresenter championInfo={championInfo} />;
  }
}

export default DetailContainer;
