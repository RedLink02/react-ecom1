const initialState = {
  items: [],
};

function panierReducers(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ARTICLE_CART':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
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