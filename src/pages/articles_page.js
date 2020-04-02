import React from 'react'

import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom'

import { Filter } from '../components/filter'
import { ArticleListCollapsible } from '../components/article-list'
import { Article } from '../components/article'

export const ArticlesPage = ({ store }) => {
  let match = useRouteMatch()

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:articleId`} component={renderArticle} />
        <Route path={`${match.path}`} render={renderArticleList} />
      </Switch>
    </>
  )
}

const renderArticleList = () => (
  <>
    <Filter />
    <ArticleListCollapsible />
  </>
)

const renderArticle = () => {
  const { articleId } = useParams()

  return <Article id={articleId} isOpen />
}
