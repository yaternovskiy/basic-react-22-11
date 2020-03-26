const defaultFilter = {
  fromDate: '',
  tillDate: ''
}

export const filterReducer = (filter = defaultFilter, action) => {
  switch (action.type) {
    case 'DATE_FROM':
      return {
        ...filter,
        dateFrom: action.payload
      }
    case 'DATE_TILL':
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
    case 'ADD_ARTICLES':
      return {
        ...articles,
        ...action.payload
      }
    case 'ADD_COMMENT':
      const id = action.payload.options.articleId

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
    case 'ADD_COMMENTS':
      return {
        ...comments,
        ...action.payload
      }
    case 'ADD_COMMENT':
      return {
        ...comments,
        [action.payload.randomId]: {
          ...action.payload.options,
          id: action.payload.randomId
        }
      }
    default:
      return comments
  }
}
