import React, { Component } from 'react'

import { Filter } from './components/filter'
import { ArticleListCollapsible } from './components/article-list'

class App extends Component {
  render() {
    return (
      <>
        <Filter />
        <ArticleListCollapsible></ArticleListCollapsible>
      </>
    )
  }
}

export default App
