const initialState = {
    articles:[
  {
    id: 1,
    name: 'Classic Sneakers',
    category: 'Footwear',
    description: 'Everyday comfort with a clean, timeless look.',
    price: 59.99,
    emoji: '👟',
    imageStyle: 'from-sky-100 to-blue-200',
  },
  {
    id: 2,
    name: 'Canvas Backpack',
    category: 'Accessories',
    description: 'A roomy, durable companion for wherever you go.',
    price: 42.5,
    emoji: '🎒',
    imageStyle: 'from-amber-100 to-orange-200',
  },
  {
    id: 3,
    name: 'Everyday Watch',
    category: 'Accessories',
    description: 'A minimalist design that goes with everything.',
    price: 89,
    emoji: '⌚',
    imageStyle: 'from-violet-100 to-purple-200',
  },
  {
    id: 4,
    name: 'Cozy Knit Sweater',
    category: 'Clothing',
    description: 'Soft knit fabric made for cooler days.',
    price: 64.95,
    emoji: '🧥',
    imageStyle: 'from-emerald-100 to-teal-200',
  },
  {
    id: 5,
    name: 'Insulated Bottle',
    category: 'Lifestyle',
    description: 'Keep your favorite drinks at the right temperature.',
    price: 24.99,
    emoji: '🧴',
    imageStyle: 'from-rose-100 to-pink-200',
  },
  {
    id: 6,
    name: 'Wireless Headphones',
    category: 'Electronics',
    description: 'Comfortable listening with rich, balanced sound.',
    price: 79.99,
    emoji: '🎧',
    imageStyle: 'from-slate-200 to-gray-300',
  },
]
}

function articleReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_ARTICLE":
            return {
                ...state,
                articles: [...state.articles, action.payload]
            };
        case "UPDATE_ARTICLE":
            return {
                ...state,
                articles: state.articles.map(article =>
                    article.id === action.payload.id ? action.payload : article
                )
            };
        case "DELETE_ARTICLE":
            return {
                ...state,
                articles: state.articles.filter(article => article.id !== action.payload)
            };
        default:
            return state;
    }
}

export default articleReducer;