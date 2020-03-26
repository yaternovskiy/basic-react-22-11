import React from 'react'
import Enzyme, { shallow, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Article } from './article'
import articles from '../fixtures'

Enzyme.configure({ adapter: new Adapter() })

const firstArticle = Object.values(articles)[0]

const articleButtonSelector = '[data-test-expand-article]'
const commentsButtonSelector = '[data-test-show-comments]'

describe('Article', () => {
  it('renders an `Article`', () => {
    const wrapper = shallow(<Article article={firstArticle} isOpen toggleOpen={() => {}} />)
    expect(wrapper.find('.article-list__item').length).toEqual(1)
  })

  it('renders button and takes click event', () => {
    let wasCalled = false
    const wrapper = shallow(
      <Article
        article={firstArticle}
        isOpen
        toggleOpen={() => {
          wasCalled = true
        }}
      />
    )

    expect(wrapper.find(articleButtonSelector).length).toEqual(1)

    wrapper
      .find(articleButtonSelector)
      .at(0)
      .simulate('click')
    expect(wasCalled).toBe(true)
  })

  it('renders show comments button', () => {
    const wrapper = render(<Article article={firstArticle} isOpen toggleOpen={() => {}} />)
    expect(wrapper.find(commentsButtonSelector).length).toEqual(1)
  })
})
