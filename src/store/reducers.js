import { Map, List, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

import { ArticleRecord, CommentRecord } from '../data-records/index'

import {
  ADD_ARTICLE,
  ADD_COMMENT,
  POPULATE_ARTICLES,
  POPULATE_COMMENTS,
  SET_FILTER_DATE_FROM,
  SET_FILTER_DATE_TILL,
  DELETE_ARTICLE,
  TYPE_SUCCESS,
  TYPE_ERROR,
  TYPE_REQUEST
} from '../constants/action-types'

import { setFilterDateFrom, setFilterDateTill } from './actionCreators'

const defaultFilter = {
  fromDate: '',
  tillDate: ''
}

export const filterReducer = handleActions(
  {
    [setFilterDateFrom]: (state, { payload: dateFrom }) => ({
      ...state,
      fromDate: dateFrom
    }),
    [setFilterDateTill]: (state, { payload: dateTill }) => ({
      ...state,
      tillDate: dateTill
    })
  },
  defaultFilter
)

export const articlesReducer = (articles = new Map({}), action) => {
  const { type, payload } = action

  switch (type) {
    case `${POPULATE_ARTICLES}_${TYPE_SUCCESS}`:
      return articles.merge(payload.map((v) => ArticleRecord(v)))

    case `${ADD_ARTICLE}_${TYPE_SUCCESS}`:
      return articles.update(payload.get('id'), () => ArticleRecord(payload))

    case DELETE_ARTICLE:
      return articles.delete(payload.articleId)

    case ADD_COMMENT:
      const id = payload.articleId
      return articles.updateIn([id, 'comments'], (comments) =>
        (comments || new List()).concat(payload.randomId)
      )

    default:
      return articles
  }
}

export const commentsReducer = (comments = new Map({}), action) => {
  const { type, payload } = action

  switch (type) {
    case `${POPULATE_COMMENTS}_${TYPE_SUCCESS}`:
      return comments.merge(payload.map((v) => CommentRecord(v)))

    case ADD_COMMENT:
      return comments.set(
        payload.randomId,
        CommentRecord(fromJS(payload).set('id', payload.randomId))
      )

    default:
      return comments
  }
}

export const globalFetchStatusReducer = (state = Map({}), action) => {
  const { type, payload } = action

  switch (type) {
    case POPULATE_ARTICLES:
      console.log(state)
      return state.set(type, payload.status)
    default:
      return state
  }
}
