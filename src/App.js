import React, { Component } from 'react'
import { createStore } from 'redux'

import { Filter } from './components/filter'
import { ArticleListCollapsible } from './components/article-list'

import { filterReducer } from './store/reducers'

import articles from './fixtures'

let store = createStore(
  filterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
class App extends Component {
  render() {
    return (
      <>
        <Filter store={store} />
        <ArticleListCollapsible store={store} articles={articles}></ArticleListCollapsible>
      </>
    )
  }
}

export default App
