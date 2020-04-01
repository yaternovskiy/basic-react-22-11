import { API_GET_URLS } from '../constants/api'

export const getFetchUrl = ({ type, id }) => `${API_GET_URLS[type]}${id || ''}`
