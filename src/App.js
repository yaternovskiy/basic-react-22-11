import React, { Component } from 'react'

import { Filter } from './components/filter'
import { ArticleListCollapsible } from './components/article-list'

import articles from './fixtures'

class App extends Component {
  render() {
    return (
      <>
        <Filter />
        <ArticleListCollapsible articles={articles}></ArticleListCollapsible>
      </>
    )
  }
}

export default App
