import { getNormalizedData } from '../helpers/normalizer'
import articles from '../fixtures'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { filterReducer, articlesReducer, commentsReducer } from './reducers'
import { logger, randomId, randomComment } from './middlwares'

const combinedReducer = combineReducers({
  filter: filterReducer,
  articles: articlesReducer,
  comments: commentsReducer
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(logger, randomId, randomComment))

let store = createStore(combinedReducer, enhancer)

const loadInitialData = (store) => {
  store.dispatch({ type: 'ADD_ARTICLES', payload: getNormalizedData(articles) })

  articles.forEach((article) => {
    if (article.comments) {
      store.dispatch({ type: 'ADD_COMMENTS', payload: getNormalizedData(article.comments) })
    }
  })
}

loadInitialData(store)

export default store
