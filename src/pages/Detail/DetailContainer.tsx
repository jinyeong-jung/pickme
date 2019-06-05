import React from "react";
import { RouteComponentProps } from "react-router";
import * as api from "../../lib/api";
import DetailPresenter from "./DetailPresenter";

class DetailContainer extends React.Component<RouteComponentProps> {
  public state = {
    championId: 0,
    championInfo: {},
    matchesByChamps: [],
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

      const [newObject, newArray] = this.SortMatchesByChamps(
        wonChampions,
        true,
        {},
        []
      );
      const results = this.SortMatchesByChamps(
        lostChampions,
        false,
        newObject,
        newArray
      );
      const matchesByChamps = results[1]
        .map(item => Object.values(item).find(i => typeof i === "object"))
        .sort(this.sortArray("-won"))
        .sort(this.sortArray("-winRate"));

      const winRate = ((won.length / myMatches.length) * 100).toFixed(2);

      this.setState({
        matchesByChamps,
        myMatches,
        winRate
      });
    } catch (error) {
      console.log(error);
    }
  };

  public MakeOneArray = (inputArray: any) => {
    let matchedChampions = [];
    for (let i = 0; i <= inputArray.length - 1; i++) {
      matchedChampions = matchedChampions.concat(inputArray[i].theirTeam);
    }
    matchedChampions.sort();
    return matchedChampions;
  };

  public SortMatchesByChamps = (
    inputArray: any,
    win: boolean,
    defaultObj: any,
    defaultArr: any
  ) => {
    let newObject = defaultObj;
    const newArray = defaultArr;

    for (let i = 0; i <= inputArray.length - 1; i++) {
      if (Object.keys(newObject).includes(inputArray[i])) {
        if (win) {
          const obj = {
            [inputArray[i]]: {
              ...newObject[inputArray[i]],
              id: inputArray[i],
              winRate: (
                ((newObject[inputArray[i]].won + 1) /
                  (newObject[inputArray[i]].won +
                    1 +
                    newObject[inputArray[i]].lost)) *
                100
              ).toFixed(2),
              won: newObject[inputArray[i]].won + 1
            }
          };
          newObject = Object.assign(newObject, obj);
          newArray.push(obj);
        } else {
          const obj = {
            [inputArray[i]]: {
              ...newObject[inputArray[i]],
              id: inputArray[i],
              lost: newObject[inputArray[i]].lost + 1,
              winRate: (
                (newObject[inputArray[i]].won /
                  (newObject[inputArray[i]].won +
                    newObject[inputArray[i]].lost +
                    1)) *
                100
              ).toFixed(2)
            }
          };
          newObject = Object.assign(newObject, obj);
          newArray.push(obj);
        }
      } else {
        if (win) {
          const obj = {
            [inputArray[i]]: {
              id: inputArray[i],
              lost: 0,
              winRate: ((1 / (0 + 1)) * 100).toFixed(2),
              won: 1
            }
          };
          newObject = Object.assign(newObject, obj);
          newArray.push(obj);
        } else {
          const obj = {
            [inputArray[i]]: {
              id: inputArray[i],
              lost: 1,
              winRate: ((0 / (0 + 1)) * 100).toFixed(2),
              won: 0
            }
          };
          newArray.push(obj);
          newObject = Object.assign(newObject, obj);
        }
      }
    }
    return [newObject, newArray];
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
    let start = 0;
    while (start <= end) {
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
    const { championInfo, matchesByChamps, winRate } = this.state;
    console.log(this.state);
    return (
      <DetailPresenter
        championInfo={championInfo}
        winRate={winRate}
        matchesByChamps={matchesByChamps}
      />
    );
  }
}

export default DetailContainer;
