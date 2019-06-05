// action types
const SAVE_MATCHES_BY_CHAMPIONS = "match/SAVE_MATCHES_BY_CHAMPIONS";

// action creators
export const saveMatchesByChampions = matches => ({
  matches,
  type: SAVE_MATCHES_BY_CHAMPIONS
});

// initial state
export interface IChampionState {
  matchesByChampions: [];
}

const initialState: IChampionState = {
  matchesByChampions: []
};

// reducers
const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MATCHES_BY_CHAMPIONS:
      return { ...state, matchesByChampions: action.matches };
    default:
      return state;
  }
};

export default matchReducer;
