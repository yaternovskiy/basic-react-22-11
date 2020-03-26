export const setFilterDateFrom = (date) => {
  return { type: 'DATE_FROM', payload: date }
}

export const setFilterDateTill = (date) => {
  return { type: 'DATE_TILL', payload: date }
}

export const addNewComment = (articleId) => {
  return {
    type: 'ADD_COMMENT',
    payload: { articleId },
    generateId: true,
    generateComment: true
  }
}
