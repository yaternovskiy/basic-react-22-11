import React from 'react'

import articles from '../fixtures'
import { ArticleCollapsible } from './article'
import { collapsible } from '../decorators/accordion'

const renderList = (props) => (
  <div className="article-list">
    <h1>Articles</h1>
    <section>
      {articles.map((el) => (
        <ArticleCollapsible key={el.id} title={el.title} text={el.text} />
      ))}
    </section>
  </div>
)

const ArticleList = () => renderList()

export const ArticleListCollapsible = collapsible(ArticleList)
