const initialState = {
  checkouts: [],
};

function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CHECKOUT":
      return {
        ...state,
        checkouts: [
          ...state.checkouts,
          { ...action.payload, status: action.payload.status ?? "not confirmed" },
        ],
      };
    case "UPDATE_CHECKOUT_STATUS":
      return {
        ...state,
        checkouts: state.checkouts.map(checkout =>
          checkout.id === action.payload.orderId
            ? { ...checkout, status: action.payload.status }
            : checkout
        ),
      };
    default:
      return state;
  }
}

export default checkoutReducer;