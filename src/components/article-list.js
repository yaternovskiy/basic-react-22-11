import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getFilteredArticles, getStatusArticlesLoaded } from '../store/selectors'

import { createFetchAllArticles } from '../store/actionCreators'

//import { FETCH_STATUS } from '../constants/store'

import { Article } from './article'
import { Loader } from './loader'
import { Accordion } from '../decorators/accordion'

const ArticleList = (props) => {
  const { openId, toggleOpen, articles, articlesLoaded, fetchAllArticles } = props

  useEffect(() => {
    if (!articlesLoaded) fetchAllArticles()
  }, [articlesLoaded])

  return (
    <div className="article-list">
      <h1>Articles</h1>
      {!articlesLoaded ? (
        <Loader />
      ) : (
        <ul>
          {articles.valueSeq().map((article) => (
            <Article
              key={article.id}
              id={article.id}
              isOpen={openId === article.id}
              toggleOpen={toggleOpen}
              asLink
            />
          ))}
        </ul>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  articles: getFilteredArticles(state),
  articlesLoaded: getStatusArticlesLoaded(state)
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllArticles: () => dispatch(createFetchAllArticles())
})

ArticleList.propTypes = {
  props: PropTypes.shape()
}

export const ArticleListCollapsible = connect(
  mapStateToProps,
  mapDispatchToProps
)(Accordion(ArticleList))
