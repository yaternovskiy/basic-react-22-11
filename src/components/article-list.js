import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getFilteredArticles } from '../store/selectors'

import { deleteArticle } from '../store/actionCreators'

import { Article } from './article'
import { Accordion } from '../decorators/accordion'

const renderList = (props) => {
  const { openId, toggleOpen, articles = [], deleteArticle, store } = props

  return (
    <div className="article-list">
      <h1>Articles</h1>
      <ul>
        {articles.valueSeq().map((article) => (
          <Article
            key={article.get('id')}
            store={store}
            article={article}
            id={article.get('id')}
            isOpen={openId === article.get('id')}
            toggleOpen={toggleOpen}
            deleteArticle={deleteArticle}
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

const mapDispatchToProps = (dispatch) => ({ deleteArticle: (id) => dispatch(deleteArticle(id)) })

ArticleList.propTypes = {
  props: PropTypes.shape()
}

export const ArticleListCollapsible = connect(
  mapStateToProps,
  mapDispatchToProps
)(Accordion(ArticleList))
