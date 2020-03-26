import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getFilteredArticles } from '../store/selectors'

import { Article } from './article'
import { Accordion } from '../decorators/accordion'

const renderList = (props) => {
  const { openId, toggleOpen, articles = [], store } = props

  return (
    <div className="article-list">
      <h1>Articles</h1>
      <ul>
        {Object.values(articles).map((article) => (
          <Article
            key={article.id}
            store={store}
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

const mapStateToProps = (state) => ({
  articles: getFilteredArticles(state)
})

ArticleList.propTypes = {
  props: PropTypes.shape()
}

export const ArticleListCollapsible = connect(mapStateToProps)(Accordion(ArticleList))
