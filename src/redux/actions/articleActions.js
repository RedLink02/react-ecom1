export function addArticleAction(newArticle){
    return({
        type:"ADD_ARTICLE",
        payload:newArticle
    })
}

export function updateArticleAction(newArticle){
    return({
        type:"UPDATE_ARTICLE",
        payload:newArticle
    })
}

export function deleteArticleAction(articleID){
    return({
        type:"DELETE_ARTICLE",
        payload:articleID
    })
}