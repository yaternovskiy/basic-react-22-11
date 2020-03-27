import {
  ADD_ARTICLE,
  ADD_COMMENT,
  POPULATE_ARTICLES,
  POPULATE_COMMENTS,
  SET_FILTER_DATE_FROM,
  SET_FILTER_DATE_TILL
} from '../constants/action-types'

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

export const articlesReducer = (articles = {}, action) => {
  switch (action.type) {
    case POPULATE_ARTICLES:
      return {
        ...articles,
        ...action.payload
      }
    case ADD_COMMENT:
      const id = action.payload.articleId

      return {
        ...articles,
        [id]: {
          ...articles[id],
          commentsIds: (articles[id].commentsIds || []).concat(action.payload.randomId)
        }
      }
    default:
      return articles
  }
}

export const commentsReducer = (comments = {}, action) => {
  switch (action.type) {
    case POPULATE_COMMENTS:
      return {
        ...comments,
        ...action.payload
      }
    case ADD_COMMENT:
      return {
        ...comments,
        [action.payload.randomId]: {
          ...action.payload,
          id: action.payload.randomId
        }
      }
    default:
      return comments
  }
}
