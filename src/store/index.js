import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { POPULATE_ARTICLES, POPULATE_COMMENTS } from '../constants/action-types'
import { getNormalizedData } from '../helpers/normalizer'
import articles from '../fixtures'

import { filterReducer, articlesReducer, commentsReducer, fetchDataStatusReducer } from './reducers'
import { logger, randomId, randomComment, addDate, errorLogger } from './middlwares'

const combinedReducer = combineReducers({
  filter: filterReducer,
  articles: articlesReducer,
  comments: commentsReducer,
  fetchStatus: fetchDataStatusReducer
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger, errorLogger, randomId, randomComment, addDate)
)

let store = createStore(combinedReducer, enhancer)

const loadInitialData = (store) => {
  const normalizedData = getNormalizedData(articles)

  store.dispatch({ type: POPULATE_ARTICLES, payload: normalizedData.get('articles') })

  articles.forEach((article) => {
    if (article.comments) {
      store.dispatch({ type: POPULATE_COMMENTS, payload: normalizedData.get('comments') })
    }
  })
}

//loadInitialData(store)

export default store
