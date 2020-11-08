import { expect } from 'chai'
import { History } from '../src/index'

describe('index', () => {
  it('has History class', () => {
    const history = new History('test title', 'test url')
    expect(history.title).to.equal('test title')
    expect(history.url).to.equal('test url')
  })
})
