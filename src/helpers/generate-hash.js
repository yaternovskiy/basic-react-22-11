import { LoremIpsum } from 'lorem-ipsum'

export const generateId = (seed) => {
  return String(Date.now() * Math.random()).replace('.', '')
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})

export const generateParagraph = lorem.generateParagraphs(1)

export const generateSentence = lorem.generateSentences(1)
