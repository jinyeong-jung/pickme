// action types
const SAVE_CHAMPIONS = "champion/SAVE_CHAMPIONS";

// action creators
export const saveChampions = champions => ({
  champions,
  type: SAVE_CHAMPIONS
});

// initial state
export interface IChampionState {
  champions: [];
}

const initialState: IChampionState = {
  champions: []
};

// reducers
const championReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CHAMPIONS:
      return { ...state, champions: action.champions };
    default:
      return state;
  }
};

export default championReducer;
