import { getNormalizedData } from './normalizer'
import articles from '../fixtures'

export const loadInitialData = (store) => {
  store.dispatch({ type: 'ADD_ARTICLES', payload: getNormalizedData(articles) })

  articles.forEach((article) => {
    if (article.comments) {
      store.dispatch({ type: 'ADD_COMMENTS', payload: getNormalizedData(article.comments) })
    }
  })
}
