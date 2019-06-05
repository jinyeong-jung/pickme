import produce from "immer";

// action types
const SAVE_CHAMPIONS = "champion/SAVE_CHAMPIONS";
const SAVE_CHAMPION_INFO = "champion/SAVE_CHAMPION_INFO";
const SAVE_CHAMPION_ID = "champion/SAVE_CHAMPION_ID";
const SAVE_WIN_RATE = "champion/SAVE_WIN_RATE";

// action creators
export const saveChampions = champions => ({
  champions,
  type: SAVE_CHAMPIONS
});

export const saveChampionInfo = info => ({
  info,
  type: SAVE_CHAMPION_INFO
});

export const saveChampionIndex = id => ({
  id,
  type: SAVE_CHAMPION_ID
});

export const saveWinningRate = rate => ({
  rate,
  type: SAVE_WIN_RATE
});

// initial state
export interface IChampionState {
  champions: [];
  championIndex: number;
  championInformation: object;
  winningRate: number;
}

const initialState: IChampionState = {
  championIndex: 0,
  championInformation: {},
  champions: [],
  winningRate: 0
};

// reducers
const championReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CHAMPIONS:
      return produce(state, draft => {
        draft.champions = action.champions;
      });
    case SAVE_CHAMPION_INFO:
      return produce(state, draft => {
        draft.championInformation = action.info;
      });
    case SAVE_CHAMPION_ID:
      return produce(state, draft => {
        draft.championIndex = action.id;
      });
    case SAVE_WIN_RATE:
      return produce(state, draft => {
        draft.winningRate = action.rate;
      });
    default:
      return state;
  }
};

export default championReducer;
