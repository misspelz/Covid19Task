const initialState = {
  provinces: [],
};

export const ProvincesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROVINCES":
      return {
        ...state,
        provinces: action.payload.data,
      };

    default:
      return state;
  }
};
