import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Article } from './article'
import { Accordion } from '../decorators/accordion'

const renderList = (props) => {
  const { openId, toggleOpen, articles, startDate, endDate } = props

  const articlesFiltered = articles.filter((article) => {
    const articleDate = new Date(article.date)

    return (
      (startDate ? articleDate >= startDate : true) && (endDate ? articleDate <= endDate : true)
    )
  })

  return (
    <div className="article-list">
      <h1>Articles</h1>
      <ul>
        {articlesFiltered.map((article) => (
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

const mapStateToProps = (state) => {
  return {
    startDate: state.filter.dateFrom,
    endDate: state.filter.dateTill
  }
}

ArticleList.propTypes = {
  props: PropTypes.shape()
}

export const ArticleListCollapsible = connect(mapStateToProps)(Accordion(ArticleList))
