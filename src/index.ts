import * as os from 'os'
import * as fs from 'fs'

import Database from 'better-sqlite3'

export type HistoryReaderOption = {
  historyFilePath?: string
}

export class History {
  constructor(public readonly title: string, public readonly url: string) {}
}

export class ChromeHistoryReader {
  #db: Database.Database

  constructor(public readonly option?: HistoryReaderOption) {
    const file = option?.historyFilePath ? option?.historyFilePath : `${os.homedir()}/Library/Application Support/Google/Chrome/Default/History`
    const dbFile = `${__dirname}/../db/history.db`

    fs.copyFileSync(file, dbFile)

    const options = { readonly: true, fileMustExist: true }
    this.#db = new Database(dbFile, options)
  }

  execute = (): Array<History> => {
    const query =
      'SELECT url, title FROM urls ORDER BY last_visit_time DESC LIMIT 100'
    const statement = this.#db.prepare(query)

    return statement.all().map((r) => new History(r.title, r.url))
  }
}
