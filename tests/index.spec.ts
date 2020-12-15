import { expect } from 'chai'
import { History, ChromeHistoryReader, HistoryReaderOption } from '../src/index'
import path from 'path'

describe('index', () => {
  it('has History class', () => {
    const history = new History('test title', 'test url')
    expect(history.title).to.equal('test title')
    expect(history.url).to.equal('test url')
  })

  it('reads history file', () => {
    const option: HistoryReaderOption = {
      historyFilePath: path.resolve(__dirname, 'resources/history-test.db')
    }
    const historyReader = new ChromeHistoryReader(option)

    const actual = historyReader.execute()

    expect(actual.length).to.equal(6)
    expect(actual[0].title).to.equal('Apple')
    expect(actual[0].url).to.equal('https://www.apple.com/')
  })
})
