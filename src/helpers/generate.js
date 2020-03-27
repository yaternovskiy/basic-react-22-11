import { LoremIpsum } from 'lorem-ipsum'

export const generateId = (seed) => {
  return String(Date.now() * Math.random()).replace('.', '')
}

export const generateDateTime = () => {
  return String(new Date())
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: { max: 8, min: 4 },
  wordsPerSentence: { max: 16, min: 4 }
})

export const generateUsername = () => lorem.generateWords(2)

export const generateSentence = () => lorem.generateSentences(1)
