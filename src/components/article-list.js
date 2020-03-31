import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getFilteredArticles, getArticlesStatus } from '../store/selectors'

import { deleteArticle, fetchArticles, fetchArticleComments } from '../store/actionCreators'

import { FETCH_STATUS } from '../constants/index'

import { Article } from './article'
import { Loader } from './loader'
import { Accordion } from '../decorators/accordion'

const renderList = (props) => {
  const {
    openId,
    toggleOpen,
    articles,
    deleteArticle,
    store,
    articlesStatus,
    fetchArticleComments
  } = props

  let isDataFetched = false

  useEffect(() => {
    store.dispatch(fetchArticles())
  }, [isDataFetched])

  return (
    <div className="article-list">
      <h1>Articles</h1>
      {articlesStatus === FETCH_STATUS.REQUEST ? (
        <Loader />
      ) : (
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
              fetchArticleComments={fetchArticleComments}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

const ArticleList = (props) => renderList(props)

const mapStateToProps = (state) => ({
  articles: getFilteredArticles(state),
  articlesStatus: getArticlesStatus(state)
})

const mapDispatchToProps = (dispatch) => ({
  deleteArticle: (id) => dispatch(deleteArticle(id)),
  fetchArticleComments: (id) => dispatch(fetchArticleComments({ articleId: id }))
})

ArticleList.propTypes = {
  props: PropTypes.shape()
}

export const ArticleListCollapsible = connect(
  mapStateToProps,
  mapDispatchToProps
)(Accordion(ArticleList))
