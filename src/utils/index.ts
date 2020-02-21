import moment from 'moment'

const timeLabel = (timestamp: number) => {
  const m = moment(timestamp)

  return m.format(`YYYY-MM-DD HH:mm:ss (${m.fromNow()})`)
}

module.exports = { timeLabel }
