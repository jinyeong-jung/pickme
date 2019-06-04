import React from "react";
import * as api from "../../lib/api";
import HomePresenter from "./HomePresenter";

class HomeContainer extends React.Component {
  public state = {
    champions: []
  };

  public getChampions = async () => {
    try {
      const response = await api.getChampions();
      const {
        data: { data }
      } = response;
      this.setState({
        champions: Object.values(data)
      });
    } catch (error) {
      console.log(error);
    }
  };

  public componentDidMount() {
    this.getChampions();
  }

  public render() {
    const { champions } = this.state;
    return <HomePresenter data={champions} />;
  }
}

export default HomeContainer;
