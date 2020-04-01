import { Map, List, fromJS } from 'immutable'

import {
  ADD_ARTICLE,
  ADD_COMMENT,
  POPULATE_ARTICLES,
  POPULATE_COMMENTS,
  SET_FILTER_DATE_FROM,
  SET_FILTER_DATE_TILL,
  DELETE_ARTICLE,
  SET_FETCH_STATUS,
  TYPE_SUCCESS,
  TYPE_ERROR,
  TYPE_REQUEST
} from '../constants/action-types'

import { FETCH_STATUS_KEY } from '../constants/store'

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
    case `${POPULATE_ARTICLES}_${TYPE_SUCCESS}`:
      return articles.merge(payload)

    case `${ADD_ARTICLE}_${TYPE_SUCCESS}`:
      return articles.update(payload.get('id'), () => payload)

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
      return comments.merge(payload)

    case ADD_COMMENT:
      return comments.set(payload.randomId, fromJS(payload).set('id', payload.randomId))

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
