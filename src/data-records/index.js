import { Record, List } from 'immutable'

export const ArticleRecord = Record({
  id: null,
  date: '',
  status: null,
  title: '',
  text: '',
  comments: new List()
})

export const CommentRecord = Record({
  id: null,
  user: '',
  text: ''
})
