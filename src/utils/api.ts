import axios from "axios";

export const getChampions = () => {
  const url =
    "https://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/champion.json";
  const response = axios.get(url);
  return response;
};

export const getMatches = () => {
  const url =
    "https://gist.githubusercontent.com/daliwali/08d04c5481827ff593f1bcbb412bd483/raw/e97fa5db457159ecd455690b76be122af4cbe6dd/matches.json";
  return axios.get(url);
};
