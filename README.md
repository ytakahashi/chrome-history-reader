# chrome-history-reader

A library to read the browsing history of Google Chrome.

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
