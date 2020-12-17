import { expect } from 'chai'
import { History, ChromeHistoryReader, HistoryReaderOption } from '../src/index'
import path from 'path'

describe('index', () => {
  it('has History class', () => {
    const history = new History('test title', 'test url', '1234567')
    expect(history.title).to.equal('test title')
    expect(history.url).to.equal('test url')
    expect(history.lastVisitTime).to.equal('1234567')
  })
})

describe('ChromeHistoryReader class', () => {
  const option: HistoryReaderOption = {
    historyFilePath: path.resolve(__dirname, 'resources/history-test.db'),
  }
  const sut = new ChromeHistoryReader(option)

  describe('execute method', () => {
    it('reads history file without argument', () => {
      const actual = sut.execute()

      expect(actual.length).to.equal(6)
      expect(actual[0].title).to.equal('Apple')
      expect(actual[0].url).to.equal('https://www.apple.com/')
      expect(actual[0].lastVisitTime).to.equal('13252500732574622')
    })

    it('reads history file with limit=2, ascending order', () => {
      const actual = sut.execute({
        resultLimit: 2,
        sort: 'ASC',
      })

      expect(actual.length).to.equal(2)
      expect(actual[0].title).to.equal('Google')
      expect(actual[0].url).to.equal('https://www.google.com/')
      expect(actual[0].lastVisitTime).to.equal('13252500674394960')
    })
  })

  describe('buildQuery method', () => {
    it('builds query without argument', () => {
      const actual = sut.buildQuery()
      expect(actual).to.equal(
        'SELECT url, title, last_visit_time FROM urls ORDER BY last_visit_time DESC LIMIT 20'
      )
    })

    it('builds query with empty argument', () => {
      const actual = sut.buildQuery({})
      expect(actual).to.equal(
        'SELECT url, title, last_visit_time FROM urls ORDER BY last_visit_time DESC LIMIT 20'
      )
    })

    it('builds query with limit', () => {
      const actual = sut.buildQuery({
        resultLimit: 123,
      })
      expect(actual).to.equal(
        'SELECT url, title, last_visit_time FROM urls ORDER BY last_visit_time DESC LIMIT 123'
      )
    })

    it('builds query with sort', () => {
      const actual = sut.buildQuery({
        sort: 'ASC',
      })
      expect(actual).to.equal(
        'SELECT url, title, last_visit_time FROM urls ORDER BY last_visit_time ASC LIMIT 20'
      )
    })

    it('builds query with limit/sort', () => {
      const actual = sut.buildQuery({
        resultLimit: 123,
        sort: 'ASC',
      })
      expect(actual).to.equal(
        'SELECT url, title, last_visit_time FROM urls ORDER BY last_visit_time ASC LIMIT 123'
      )
    })
  })
})
