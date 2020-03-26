import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getFilteredArticles } from '../store/selectors'
import { addNewComment } from '../store/actionCreators'

import { Article } from './article'
import { Accordion } from '../decorators/accordion'

const renderList = (props) => {
  const { openId, toggleOpen, articles = [], addComment, store } = props

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
            addComment={addComment}
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

const mapDispatchToProps = (dispatch) => ({
  addComment: (articleId) => dispatch(addNewComment(articleId))
})

ArticleList.propTypes = {
  props: PropTypes.shape()
}

export const ArticleListCollapsible = connect(
  mapStateToProps,
  mapDispatchToProps
)(Accordion(ArticleList))
