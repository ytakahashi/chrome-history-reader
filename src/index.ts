import * as os from 'os'
import * as fs from 'fs'

import Database from 'better-sqlite3'

export type HistoryReaderOption = {
  historyFilePath?: string
}

export type SortOrder = 'ASC' | 'DESC'

export type HistoryReaderQueryParameter = {
  resultLimit?: string | number
  sort?: SortOrder
}

export class History {
  constructor(
    public readonly title: string,
    public readonly url: string,
    public readonly lastVisitTime: string
  ) {}
}

export class ChromeHistoryReader {
  #db: Database.Database

  constructor(readonly option?: HistoryReaderOption) {
    const file = option?.historyFilePath
      ? option?.historyFilePath
      : `${os.homedir()}/Library/Application Support/Google/Chrome/Default/History`
    const dbFile = `${__dirname}/../db/history.db`

    fs.copyFileSync(file, dbFile)

    const options = { readonly: true, fileMustExist: true }
    this.#db = new Database(dbFile, options)
  }

  execute = (parameter?: HistoryReaderQueryParameter): Array<History> => {
    const query = this.buildQuery(parameter)
    const statement = this.#db.prepare(query)

    return statement
      .all()
      .map((r) => new History(r.title, r.url, String(r.last_visit_time)))
  }

  buildQuery = (parameter?: HistoryReaderQueryParameter): string => {
    const limit = parameter?.resultLimit ?? 20
    const sort = parameter?.sort ?? 'DESC'

    return `SELECT url, title, last_visit_time FROM urls ORDER BY last_visit_time ${sort} LIMIT ${limit}`
  }
}
