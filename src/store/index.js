import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import {
  filterReducer,
  articlesReducer,
  commentsReducer,
  globalFetchStatusReducer
} from './reducers'
import { logger, randomId, randomComment, addDate, errorLogger } from './middlwares'
import { GLOBAL_FETCH_STATUS_KEY } from '../constants/store'

const combinedReducer = combineReducers({
  filter: filterReducer,
  articles: articlesReducer,
  comments: commentsReducer,
  [GLOBAL_FETCH_STATUS_KEY]: globalFetchStatusReducer
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger, errorLogger, randomId, randomComment, addDate)
)

let store = createStore(combinedReducer, enhancer)

// const loadInitialData = (store) => {
//   const normalizedData = getNormalizedData(articles)

//   store.dispatch({ type: POPULATE_ARTICLES, payload: normalizedData.get('articles') })

//   articles.forEach((article) => {
//     if (article.comments) {
//       store.dispatch({ type: POPULATE_COMMENTS, payload: normalizedData.get('comments') })
//     }
//   })
// }

//loadInitialData(store)

export default store
