const initialState = {
  regions: [],
};

export const RegionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGIONS":
      return {
        ...state,
        regions: action.payload.data,
      };

    default:
      return state;
  }
};
