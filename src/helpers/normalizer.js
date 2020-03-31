import { fromJS } from 'immutable'
import { normalize, schema } from 'normalizr'

export const getNormalizedData = (data) => {
  const commentSchema = new schema.Entity('comments')

  const articleSchema = new schema.Entity('articles', {
    comments: [commentSchema]
  })

  const articlesArray = [articleSchema]

  return fromJS(normalize(data, articlesArray).entities)
}

const generateNormalizedRecord = (datum) => {
  const record = {}

  Object.keys(datum).forEach((key) => {
    if (Array.isArray(datum[key])) {
      record[`${key}Ids`] = datum[key].map((el) => el.id)
    } else {
      record[key] = datum[key]
    }
  })
  return record
}
