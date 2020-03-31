import { Map, List, fromJS } from 'immutable'

import {
  ADD_ARTICLE,
  ADD_COMMENT,
  POPULATE_ARTICLES,
  POPULATE_COMMENTS,
  SET_FILTER_DATE_FROM,
  SET_FILTER_DATE_TILL,
  DELETE_ARTICLE,
  SET_FETCH_STATUS
} from '../constants/action-types'

import { FETCH_STATUS_KEY } from '../constants/index'

const defaultFilter = {
  fromDate: '',
  tillDate: ''
}

export const filterReducer = (filter = defaultFilter, action) => {
  switch (action.type) {
    case SET_FILTER_DATE_FROM:
      return {
        ...filter,
        dateFrom: action.payload
      }
    case SET_FILTER_DATE_TILL:
      return {
        ...filter,
        dateTill: action.payload
      }
    default:
      return filter
  }
}

export const articlesReducer = (articles = new Map({}), action) => {
  const { type, payload } = action

  switch (type) {
    case POPULATE_ARTICLES:
      return articles.merge(payload)

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
    case POPULATE_COMMENTS:
      return comments.merge(payload)

    case ADD_COMMENT:
      return comments.set(payload.randomId, fromJS(payload).set('id', payload.randomId))

    default:
      return comments
  }
}

export const fetchDataStatusReducer = (state = Map({}), action) => {
  const { type, payload } = action

  switch (type) {
    case SET_FETCH_STATUS:
      return state.set(payload.get('key'), payload.get('status'))
    default:
      return state
  }
}
