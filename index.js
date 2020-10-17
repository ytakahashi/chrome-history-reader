const fs = require('fs')
const os = require('os')
const Database = require('better-sqlite3')

const file = `${os.homedir()}/Library/Application Support/Google/Chrome/Default/History`
const dbFile = `${__dirname}/db/history.db`

fs.copyFileSync(file, dbFile)

const options = { readonly: true, fileMustExist: true }

const db = new Database(dbFile, options);

const query = 'SELECT url, title FROM urls ORDER BY last_visit_time DESC LIMIT 10'

const statement = db.prepare(query)
console.log(statement.all())
