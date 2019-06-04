import React from "react";
import { RouteComponentProps } from "react-router";
import * as api from "../../lib/api";
import DetailPresenter from "./DetailPresenter";

class DetailContainer extends React.Component<RouteComponentProps> {
  public state = {
    championId: 0,
    championInfo: {},
    matchesByChamps: {},
    myMatches: [],
    winRate: 0
  };

  public getMatches = async () => {
    try {
      const response = await api.getMatches();
      const { data } = response;
      const ordered = [...data].sort(this.sortArray("championId"));
      const myMatches = this.findMyMatches(ordered);

      let won = [];
      let lost = [];
      for (let i = 0; i <= myMatches.length - 1; i++) {
        const key = Object.keys(myMatches[i])[3];
        if (myMatches[i][key]) {
          won = won.concat(myMatches[i]);
        } else {
          lost = lost.concat(myMatches[i]);
        }
      }

      const wonChampions = this.MakeOneArray(won);
      const lostChampions = this.MakeOneArray(lost);

      this.SortMatchesByChamps(wonChampions, true);
      const result = this.SortMatchesByChamps(lostChampions, false);

      const winRate = ((won.length / myMatches.length) * 100).toFixed(2);

      this.setState({
        matchesByChamps: result,
        myMatches,
        winRate
      });
    } catch (error) {
      console.log(error);
    }
  };

  public MakeOneArray = (array: any) => {
    let matchedChampions = [];
    for (let i = 0; i <= array.length - 1; i++) {
      matchedChampions = matchedChampions.concat(array[i].theirTeam);
    }
    matchedChampions.sort();
    return matchedChampions;
  };

  public SortMatchesByChamps = (array: any, win: boolean) => {
    const { matchesByChamps } = this.state;
    let result = matchesByChamps;
    for (let i = 0; i <= array.length - 1; i++) {
      if (Object.keys(result).includes(array[i])) {
        if (win) {
          const newObj = {
            ...matchesByChamps,
            [array[i]]: {
              ...matchesByChamps[array[i]],
              won: matchesByChamps[array[i]].won + 1
            }
          };
          result = Object.assign(result, newObj);
        } else {
          const newObj = {
            ...matchesByChamps,
            [array[i]]: {
              ...matchesByChamps[array[i]],
              lost: matchesByChamps[array[i]].lost + 1
            }
          };
          result = Object.assign(result, newObj);
        }
      } else {
        if (win) {
          const newObj = {
            ...matchesByChamps,
            [array[i]]: {
              lost: 0,
              won: 1
            }
          };
          result = Object.assign(result, newObj);
        } else {
          const newObj = {
            ...matchesByChamps,
            [array[i]]: {
              lost: 1,
              won: 0
            }
          };
          result = Object.assign(result, newObj);
        }
      }
      const obj = result[array[i]];
      obj.winRate = ((obj.won / (obj.won + obj.lost)) * 100).toFixed(2);
    }
    return result;
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
    const { championInfo, winRate } = this.state;
    console.log(this.state);
    return <DetailPresenter championInfo={championInfo} winRate={winRate} />;
  }
}

export default DetailContainer;
