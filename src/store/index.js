import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import history from '../history'

import {
  filterReducer,
  articlesReducer,
  commentsReducer,
  globalFetchStatusReducer
} from './reducers'
import { logger, randomId, randomComment, addDate, errorLogger } from './middlwares'
import { GLOBAL_FETCH_STATUS_KEY } from '../constants/store'

const combinedReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
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
  applyMiddleware(
    thunk,
    logger,
    errorLogger,
    randomId,
    randomComment,
    addDate,
    routerMiddleware(history)
  )
)

let store = createStore(combinedReducer(history), enhancer)

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
