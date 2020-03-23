import React from 'react'

import { Article } from './article'
import { Accordion } from '../decorators/accordion'

const renderList = (props) => {
  const { openId, toggleOpen, articles } = props

  return (
    <div className="article-list">
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <Article
            key={article.id}
            article={article}
            id={article.id}
            isOpen={openId === article.id}
            toggleOpen={toggleOpen}
          />
        ))}
      </ul>
    </div>
  )
}

const ArticleList = (props) => renderList(props)

export const ArticleListCollapsible = Accordion(ArticleList)
