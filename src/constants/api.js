import { ADD_ARTICLE, POPULATE_COMMENTS, POPULATE_ARTICLES } from '../constants/action-types'

export const API_GET_URLS = {
  [POPULATE_ARTICLES]: '/api/article',
  [ADD_ARTICLE]: '/api/article/',
  [POPULATE_COMMENTS]: '/api/comment/?article='
}
