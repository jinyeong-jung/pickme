import React from "react";
import { RouteComponentProps } from "react-router";
import * as api from "../../lib/api";
import DetailPresenter from "./DetailPresenter";

class DetailContainer extends React.Component<RouteComponentProps> {
  public state = {
    championId: 0,
    championInfo: {},
    matches: [],
    myMatches: []
  };

  public getMatches = async () => {
    try {
      const response = await api.getMatches();
      const { data } = response;
      const ordered = [...data].sort(this.sortArray("championId"));
      const myMatches = this.findMyMatches(ordered);
      this.setState({
        matches: ordered,
        myMatches
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
      championId: Number(championInfo.key),
      championInfo
    });
  };

  public sortArray(property) {
    let sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return (a, b) => {
      const first = Number(a[property]);
      const second = Number(b[property]);
      if (sortOrder === -1) {
        return first > second ? -1 : first < second ? 1 : 0;
      } else {
        return first < second ? -1 : first > second ? 1 : 0;
      }
    };
  }

  public findMyMatches = matches => {
    const { championId } = this.state;
    let myMatches = [];
    let end = matches.length - 1;
    for (let start = 0; start <= end; start++) {
      const mid = Math.floor((start + end) / 2);
      if (championId === Number(matches[mid].championId)) {
        let i = mid - 1;
        let j = mid;
        while (championId === Number(matches[i].championId)) {
          myMatches = myMatches.concat(matches[i]);

          i--;
        }
        while (championId === Number(matches[j].championId)) {
          myMatches = myMatches.concat(matches[j]);
          j++;
        }
        break;
      } else if (championId > Number(matches[mid].championId)) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    return myMatches;
  };

  public componentDidMount() {
    this.getMatches();
    this.saveChampionInfo();
  }

  public render() {
    const { championInfo, myMatches } = this.state;
    console.log(myMatches);
    return <DetailPresenter championInfo={championInfo} />;
  }
}

export default DetailContainer;
