# chrome-history-reader

[![npm version](https://badge.fury.io/js/chrome-history-reader.svg)](https://badge.fury.io/js/chrome-history-reader)
[![Actions Status](https://github.com/ytakahashi/chrome-history-reader/workflows/Node.js%20CI/badge.svg)](https://github.com/ytakahashi/chrome-history-reader/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A library to read the browsing history of Google Chrome.

## Install

```shell
npm install chrome-bookmark-reader
```

or

```shell
yarn add chrome-bookmark-reader
```

## Usage

```typescript
import { ChromeHistoryReader } from 'chrome-history-reader'

const chromeHistoryReader = new ChromeHistoryReader({
  historyFilePath: '/path/to/Chrome/History',
})

console.log(chromeHistoryReader.execute())
// shows your histories
```

See following about location of Google Chrome history.

- https://www.foxtonforensics.com/browser-history-examiner/chrome-history-location

## Related Repositories

- [chrome-bookmark-reader](https://github.com/ytakahashi/chrome-bookmark-reader)
