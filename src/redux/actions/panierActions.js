export  function addArticleCart(article) {
    return {
        type: 'ADD_ARTICLE_CART',
        payload: article
    }
}

export  function removeArticleCart(articleId) {
    return {
        type: 'REMOVE_ARTICLE_CART',
        payload: articleId
    }
}

export  function clearCart() {
    return {
        type: 'CLEAR_CART'
    }
}

export  function updateArticleQuantity(articleId, quantity) {
    return {
        type: 'UPDATE_ARTICLE_QUANTITY',
        payload: { articleId, quantity }
    }
}