import axios from "axios";

export const getChampions = () => {
  const url =
    "http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/champion.json";
  return axios.get(url);
};
