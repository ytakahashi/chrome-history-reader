import { homedir, type } from 'os'
import { ChromeHistoryReader, History } from './index'
import {
  makeBooleanFlag,
  makeStringFlag,
  makeCommand,
  reduceFlag,
} from 'catacli'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require('../package.json').version

const filePathOption = makeStringFlag('file', {
  alias: 'f',
  usage: 'File path to Google Chrome History file.',
})

const outputOption = makeStringFlag('output', {
  alias: 'o',
  usage:
    'Output format. One of "json" or "text" is available. Defaults to "text".',
})

const help = makeBooleanFlag('help', {
  alias: 'h',
  usage: 'show help message',
})

const flags = reduceFlag(help, filePathOption, outputOption)

type OutputType = 'json' | 'text'
const validateOutputOption = (value?: string): OutputType => {
  const isValid = (value: string): value is OutputType =>
    value === 'json' || value === 'text'

  if (value === undefined) {
    return 'text'
  }

  if (isValid(value)) {
    return value
  }
  console.log(
    'Error: Invalid value for "--output (-o)". See chrome-history --help.'
  )
  process.exit(1)
}

const getHistoryLocation = (location?: string): string => {
  if (location === undefined) {
    console.log(
      'Error: Option "--file (-f)" is required. See chrome-history --help.'
    )
    process.exit(1)
  }
  return location
}

const readHistories = (historyLocation: string): History[] => {
  const reader = new ChromeHistoryReader({
    historyFilePath: historyLocation,
  })
  return reader.execute()
}

export const printHistories = (
  histories: History[],
  output: OutputType
): void => {
  if (output === 'json') {
    const item = histories.map((h) => {
      return {
        title: h.title,
        url: h.url,
      }
    })
    console.log(JSON.stringify(item))
  } else {
    const str =
      histories.length === 0
        ? ''
        : histories
            .map((h) => `${h.url}\t${h.title}`)
            .reduce((a, b) => `${a}\n${b}`)
    console.log(str)
  }
}

const command = makeCommand({
  name: 'chrome-history',
  description: 'command line tool to read Google Chrome browsing histories',
  version: version,
  usage: 'chrome-history --history "/path/to/Chrome/History" [--output "text"]',
  flag: flags,
  handler: (_, opts) => {
    const output = validateOutputOption(opts.output.value)
    const historyLocation = getHistoryLocation(opts.file.value)
    const result = readHistories(historyLocation)
    printHistories(result, output)
  },
})

export const main = (): void => {
  command(process.argv.splice(2))
}
