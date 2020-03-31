import { Immutable } from 'immutable'
import { createSelector } from 'reselect'

import { FETCH_STATUS_KEY, FETCH_STATUS } from '../constants/index'

const getFilter = (state) => state.filter

const getArticles = (state) => state.articles

export const getFilteredArticles = createSelector(getArticles, getFilter, (articles, filters) => {
  return articles.filter((article) => {
    const articleDate = new Date(article.date)

    return (
      (filters.dateFrom ? articleDate >= filters.dateFrom : true) &&
      (filters.dateTill ? articleDate <= filters.dateTill : true)
    )
  })
})

export const getCommentsByIds = createSelector(
  (state, ids) => ids,
  (state) => state.comments,
  (ids, allComments) =>
    (ids && allComments.filter((comment) => ids.indexOf(comment.get('id')) >= 0)) || undefined
)

export const getArticlesStatus = (state) => state.fetchStatus.get(FETCH_STATUS_KEY.ARTICLE)
export const getCommentsStatus = (state) => state.fetchStatus.get(FETCH_STATUS_KEY.COMMENT)
