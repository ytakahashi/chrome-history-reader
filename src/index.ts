import * as os from 'os'
import * as fs from 'fs'

import Database from 'better-sqlite3'

export class History {
  constructor(public readonly title: string, public readonly url: string) {}
}

export class ChromeHistoryReader {
  #db: Database.Database

  constructor() {
    const file = `${os.homedir()}/Library/Application Support/Google/Chrome/Default/History`
    const dbFile = `${__dirname}/../db/history.db`

    fs.copyFileSync(file, dbFile)

    const options = { readonly: true, fileMustExist: true }
    this.#db = new Database(dbFile, options)
  }

  readHistory = (): Array<History> => {
    const query =
      'SELECT url, title FROM urls ORDER BY last_visit_time DESC LIMIT 10'
    const statement = this.#db.prepare(query)

    return statement.all().map((r) => new History(r.title, r.url))
  }
}
