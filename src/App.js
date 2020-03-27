import React, { Component } from 'react'

import store from './store'

import { Filter } from './components/filter'
import { ArticleListCollapsible } from './components/article-list'

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
