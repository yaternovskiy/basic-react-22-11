import { fromJS, Map } from 'immutable'

import {
  SET_FILTER_DATE_FROM,
  SET_FILTER_DATE_TILL,
  ADD_COMMENT,
  DELETE_ARTICLE,
  POPULATE_ARTICLES,
  POPULATE_COMMENTS,
  SET_FETCH_STATUS
} from '../constants/action-types'

import { FETCH_STATUS_KEY, FETCH_STATUS } from '../constants/index'

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

export const deleteArticle = (id) => ({
  type: DELETE_ARTICLE,
  payload: { articleId: id }
})

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

const createSetFetchStatusActionCreator = (key, status) => ({
  type: SET_FETCH_STATUS,
  payload: new Map({
    key,
    status
  })
})

export const setFetchArticlesStatus = (status) =>
  createSetFetchStatusActionCreator(FETCH_STATUS_KEY.ARTICLE, status)

export const setFetchCommentsStatus = (status) =>
  createSetFetchStatusActionCreator(FETCH_STATUS_KEY.COMMENT, status)

export const fetchArticles = (payload) => (dispatch) => {
  dispatch(setFetchArticlesStatus(FETCH_STATUS.REQUEST))

  return fetch('/api/article')
    .then((response) => response.json())
    .then(
      (response) => {
        const data = {}
        response.forEach((datum) => (data[datum.id] = datum))
        dispatch({ type: POPULATE_ARTICLES, payload: fromJS(data) })
        dispatch(setFetchArticlesStatus(FETCH_STATUS.SUCCESS))
      },
      (error) => dispatch(setFetchArticlesStatus(FETCH_STATUS.ERROR))
    )
}

export const fetchArticleComments = (payload) => (dispatch) => {
  dispatch(setFetchCommentsStatus(FETCH_STATUS.REQUEST))

  return fetch(`/api/comment?article=${payload.articleId}`)
    .then((response) => response.json())
    .then(
      (response) => {
        const data = {}
        response.forEach((datum) => (data[datum.id] = datum))
        dispatch({ type: POPULATE_COMMENTS, payload: fromJS(data) })
        dispatch(setFetchCommentsStatus(FETCH_STATUS.SUCCESS))
      },
      (error) => dispatch(setFetchCommentsStatus(FETCH_STATUS.ERROR))
    )
}
