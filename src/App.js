import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { Filter } from './components/filter'
import { ArticleListCollapsible } from './components/article-list'

import { filterReducer, articlesReducer, commentsReducer } from './store/reducers'
import { logger, randomId, randomComment } from './store/middlwares'

import { loadInitialData } from './helpers/initial'

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

loadInitialData(store)
class App extends Component {
  render() {
    return (
      <>
        <Filter store={store} />
        <ArticleListCollapsible store={store}></ArticleListCollapsible>
      </>
    )
  }
}

export default App
