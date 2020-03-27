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

export const addNewComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload,
    generateId: true
  }
}
