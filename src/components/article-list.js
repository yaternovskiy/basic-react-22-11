import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group'

import { getFilteredArticles, getStatusArticlesLoaded } from '../store/selectors'

import { createFetchAllArticles } from '../store/actionCreators'

//import { FETCH_STATUS } from '../constants/store'

import { Article } from './article'
import { Loader } from './loader'
import { Accordion } from '../decorators/accordion'

import styles from './styles.css'

const ArticleList = (props) => {
  const { openId, toggleOpen, articles, articlesLoaded, fetchAllArticles } = props

  const [inProp, setInProp] = useState(false)
  const [articlesList, setArticlesList] = useState(articles)

  useEffect(() => {
    setArticlesList(articles)
  }, [articles])

  const hide = (id) => {
    setArticlesList(articlesList.filter((article) => article.id !== id))
  }

  useEffect(() => {
    if (!articlesLoaded) fetchAllArticles()
    else setInProp(true)
  }, [articlesLoaded])

  const duration = 2500

  const defaultStyles = {
    opacity: 0,
    transition: `opacity ${duration}ms`
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  }

  return (
    <div className="article-list">
      {!articlesLoaded ? (
        <Loader />
      ) : (
        <>
          <h1>Articles</h1>
          <Transition in={inProp} timeout={duration}>
            {(state) => (
              <ul
                style={{
                  ...defaultStyles,
                  ...transitionStyles[state]
                }}
              >
                <TransitionGroup className="article-list">
                  {articlesList.valueSeq().map((article) => (
                    <CSSTransition key={article.id} className="article-list__item" timeout={500}>
                      <div>
                        <Article
                          id={article.id}
                          isOpen={openId === article.id}
                          toggleOpen={toggleOpen}
                          hide={() => hide(article.id)}
                          asLink
                        />
                      </div>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </ul>
            )}
          </Transition>
        </>
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
