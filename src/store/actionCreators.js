import { SET_FILTER_DATE_FROM, SET_FILTER_DATE_TILL, ADD_COMMENT } from '../constants/action-types'

export const setFilterDateFrom = (date) => {
  return { type: SET_FILTER_DATE_FROM, payload: date }
}

export const setFilterDateTill = (date) => {
  return { type: SET_FILTER_DATE_TILL, payload: date }
}

export const addNewAutoComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload,
    generateId: true,
    generateComment: true
  }
}

export const addNewComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment,
    generateId: true
  }
}

const MODERATION_TIMEOUT = 1000

export const moderateAsync = (payload) => (dispatch) =>
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      const dice = Math.floor(Math.random() * 10) - 5

      dice > 0 ? resolve() : reject()
    }).then(
      () => {
        console.log('Moderation accept')
        return dispatch(addNewAutoComment(payload))
      },
      () => {
        console.log('Moderation reject')
      }
    )
  }, MODERATION_TIMEOUT)
