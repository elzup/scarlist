// @flow
import _sensors from './sensors.json'

const TIMEOUT = 100

export function getSensors(cb: Function, timeout: number = TIMEOUT) {
  setTimeout(() => {
    cb(_sensors)
  }, timeout)
}
