import { Immutable } from 'immutable'
import { createSelector } from 'reselect'

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
