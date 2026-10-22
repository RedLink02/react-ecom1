const initialState = {
  items: [],
};

function panierReducers(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ARTICLE_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      return {
        ...state,
        items: existingItem
          ? state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: (item.quantity ?? 1) + (action.payload.quantity ?? 1) }
                : item
            )
          : [...state.items, { ...action.payload, quantity: action.payload.quantity ?? 1 }]
      };
    }
    case 'REMOVE_ARTICLE_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    case 'UPDATE_ARTICLE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.articleId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    default:
      return state;
  }
}

export default panierReducers;