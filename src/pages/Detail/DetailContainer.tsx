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
import {
  findMyMatches,
  MakeOneArray,
  sortArray,
  SortMatchesByChamps
} from "../../utils/functions";
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
  saveMatchesByChamps: (
    matches: any
  ) => {
    matches: any;
    type: string;
  };
  saveChampionInformation: (
    info: any
  ) => {
    championInfo: any;
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
      const myMatches = findMyMatches(ordered, this.props.championId);

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

      const wonChampions = MakeOneArray(won);
      const lostChampions = MakeOneArray(lost);

      const [newObject, newArray] = SortMatchesByChamps(
        wonChampions,
        true,
        {},
        []
      );
      const results = SortMatchesByChamps(
        lostChampions,
        false,
        newObject,
        newArray
      );
      const matchesByChamps = results[1]
        .map(item => Object.values(item).find(i => typeof i === "object"))
        .sort(sortArray("-won"))
        .sort(sortArray("-lost"))
        .sort(sortArray("-winRate"));

      const winRate = ((won.length / myMatches.length) * 100).toFixed(2);

      saveWinRate(winRate);
      saveMatchesByChamps(matchesByChamps);
    } catch (error) {
      console.log(error);
    }
  };

  public getChampInfoFromParams = () => {
    const {
      match: { params },
      history,
      saveChampionInformation,
      saveChampionId
    } = this.props;

    const name = Object.values(params)[0];

    const allChampions = JSON.parse(
      localStorage.getItem("allChampions") || "no data"
    );
    const keys = Object.keys(allChampions[0]);
    const newInfo = allChampions
      .map(champion => {
        if (champion[keys[3]] === name) {
          return champion;
        } else {
          return;
        }
      })
      .filter(item => item !== undefined)[0];

    saveChampionInformation(newInfo);
    if (!newInfo) {
      history.push("/");
    } else {
      saveChampionId(Number(newInfo.key));
    }
  };

  public componentDidMount() {
    this.getChampInfoFromParams();
    this.getMatches();
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
