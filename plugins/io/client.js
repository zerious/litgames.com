import { EventEmitter } from 'events'
export default process.browser
  ? window.io.connect()
  : new EventEmitter()
