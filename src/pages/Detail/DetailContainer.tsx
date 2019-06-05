import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import {
  saveChampionIndex,
  saveChampionInfo,
  saveWinningRate
} from "../../modules/champion";
import { saveMatchesByChampions } from "../../modules/match";
import { getMatches } from "../../utils/api";
import { sortArray } from "../../utils/functions";
import DetailPresenter from "./DetailPresenter";

interface IProps extends RouteComponentProps {
  allChampions: [];
  championId: any;
  championInfo: any;
  matchesByChamps: any;
  winRate: any;
  saveChampionId: (
    id: any
  ) => {
    id: any;
    type: string;
  };
  saveChampionInformation: (
    info: any
  ) => {
    championInfo: any;
    type: string;
  };
  saveMatchesByChamps: (
    matches: any
  ) => {
    matches: any;
    type: string;
  };
  saveWinRate: (
    rate: any
  ) => {
    rate: any;
    type: string;
  };
}

class DetailContainer extends React.Component<IProps> {
  public getMatches = async () => {
    try {
      const { saveWinRate, saveMatchesByChamps } = this.props;
      const response = await getMatches();
      const { data } = response;
      const ordered = [...data].sort(sortArray("championId"));
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
        .sort(sortArray("-won"))
        .sort(sortArray("-winRate"));
      console.log(matchesByChamps);

      const winRate = ((won.length / myMatches.length) * 100).toFixed(2);

      saveWinRate(winRate);
      saveMatchesByChamps(matchesByChamps);
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
    const { allChampions } = this.props;

    for (let i = 0; i <= inputArray.length - 1; i++) {
      const champIndex = allChampions
        .map(champ => Object.values(champ)[2])
        .indexOf(inputArray[i]);
      const champName = Object.values(allChampions[champIndex])[3];

      if (Object.keys(newObject).includes(inputArray[i])) {
        if (win) {
          const obj = {
            [inputArray[i]]: {
              ...newObject[inputArray[i]],
              id: inputArray[i],
              name: champName,
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
              name: champName,
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
              name: champName,
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
              name: champName,
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

  public savePropsAsState = () => {
    const {
      location: {
        state: { championInfo }
      },
      saveChampionId,
      saveChampionInformation
    } = this.props;

    saveChampionInformation(championInfo);
    saveChampionId(Number(championInfo.key));
  };

  public findMyMatches = matches => {
    const { championId } = this.props;
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
          if (i !== 0) {
            i--;
          } else {
            break;
          }
        }
        while (championId === Number(matches[j].championId)) {
          myMatches = myMatches.concat(matches[j]);
          if (i < matches.length) {
            j++;
          } else {
            break;
          }
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
    this.savePropsAsState();
  }

  public render() {
    const { championInfo, matchesByChamps, winRate } = this.props;
    return (
      <DetailPresenter
        championInfo={championInfo}
        winRate={winRate}
        matchesByChamps={matchesByChamps}
      />
    );
  }
}

const mapStateToProps = ({ championReducer, matchReducer }) => ({
  allChampions: championReducer.champions,
  championId: championReducer.championIndex,
  championInfo: championReducer.championInformation,
  matchesByChamps: matchReducer.matchesByChampions,
  winRate: championReducer.winningRate
});

const mapDispatchToProps = dispatch => ({
  saveChampionId: id => dispatch(saveChampionIndex(id)),
  saveChampionInformation: info => dispatch(saveChampionInfo(info)),
  saveMatchesByChamps: matches => dispatch(saveMatchesByChampions(matches)),
  saveWinRate: rate => dispatch(saveWinningRate(rate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailContainer);
