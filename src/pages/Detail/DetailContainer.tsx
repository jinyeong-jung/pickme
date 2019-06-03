import React from "react";
import { RouteComponentProps } from "react-router";
import * as api from "../../lib/api";
import DetailPresenter from "./DetailPresenter";

class DetailContainer extends React.Component<RouteComponentProps> {
  public state = {
    championId: "",
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

  public getChampionId = () => {
    const {
      match: { params }
    } = this.props;
    const value = Object.values(params).join();
    this.setState({ championId: value });
  };

  public componentDidMount() {
    this.getChampionId();
    this.getMatches();
  }
  public render() {
    const { championId, matches } = this.state;
    console.log(championId);
    console.log(matches);
    return <DetailPresenter />;
  }
}

export default DetailContainer;
