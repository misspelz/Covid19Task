const initialState = {
  reports: [],
};

export const ReportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REPORTS":
      return {
        ...state,
        reports: action.payload.data,
      };

    default:
      return state;
  }
};
