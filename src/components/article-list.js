import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getFilteredArticles, getStatusArticlesLoaded } from '../store/selectors'

import {
  deleteArticle,
  createFetchAllArticles,
  createFetchArticleText
} from '../store/actionCreators'

//import { FETCH_STATUS } from '../constants/store'

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
    articlesLoaded,
    fetchArticleText
  } = props

  let isDataFetched = false

  useEffect(() => {
    store.dispatch(createFetchAllArticles())
  }, [isDataFetched])

  return (
    <div className="article-list">
      <h1>Articles</h1>
      {!articlesLoaded ? (
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
              fetchArticleText={fetchArticleText}
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
  articlesLoaded: getStatusArticlesLoaded(state)
})

const mapDispatchToProps = (dispatch) => ({
  deleteArticle: (id) => dispatch(deleteArticle(id)),
  fetchArticleText: (id) => dispatch(createFetchArticleText(id))
})

ArticleList.propTypes = {
  props: PropTypes.shape()
}

export const ArticleListCollapsible = connect(
  mapStateToProps,
  mapDispatchToProps
)(Accordion(ArticleList))
