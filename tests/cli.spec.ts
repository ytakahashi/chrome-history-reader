import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { printHistories } from '../src/cli'
import { History } from '../src/index'

chai.use(sinonChai)

describe('printHistories method', () => {
  beforeEach(() => {
    sinon.stub(console, 'log')
  })

  afterEach(() => {
    sinon.restore()
  })

  const history1 = new History('Title1', 'Url1', 'LastVisit1')
  const history2 = new History('Title2', 'Url2', 'LastVisit2')

  it('prints empty history in text format', () => {
    printHistories([], 'text')

    expect(console.log).to.have.been.calledWith('')
  })

  it('prints a history in text format', () => {
    printHistories([history1], 'text')

    expect(console.log).to.have.been.calledWith('Url1\tTitle1')
  })

  it('prints histories in text format', () => {
    printHistories([history1, history2], 'text')

    expect(console.log).to.have.been.calledWith('Url1\tTitle1\nUrl2\tTitle2')
  })

  it('prints empty history in json format', () => {
    printHistories([], 'text')

    expect(console.log).to.have.been.calledWith('')
  })

  it('prints a history in json format', () => {
    printHistories([history1], 'json')

    expect(console.log).to.have.been.calledWith(
      '[{"title":"Title1","url":"Url1"}]'
    )
  })

  it('prints histories in json format', () => {
    printHistories([history1, history2], 'json')

    expect(console.log).to.have.been.calledWith(
      '[{"title":"Title1","url":"Url1"},{"title":"Title2","url":"Url2"}]'
    )
  })
})
