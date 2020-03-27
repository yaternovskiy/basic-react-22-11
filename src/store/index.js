import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { POPULATE_ARTICLES, POPULATE_COMMENTS } from '../constants/action-types'
import { getNormalizedData } from '../helpers/normalizer'
import articles from '../fixtures'

import { filterReducer, articlesReducer, commentsReducer } from './reducers'
import { logger, randomId, randomComment, addDate } from './middlwares'

const combinedReducer = combineReducers({
  filter: filterReducer,
  articles: articlesReducer,
  comments: commentsReducer
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(logger, randomId, randomComment, addDate))

let store = createStore(combinedReducer, enhancer)

const loadInitialData = (store) => {
  store.dispatch({ type: POPULATE_ARTICLES, payload: getNormalizedData(articles) })

  articles.forEach((article) => {
    if (article.comments) {
      store.dispatch({ type: POPULATE_COMMENTS, payload: getNormalizedData(article.comments) })
    }
  })
}

loadInitialData(store)

export default store
