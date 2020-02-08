import moment from 'moment'

const formatAsDateTime = (date:Date) => {
  return `${moment(date).format('DD/MM/YYYY')} às ${moment(date).format('HH:mm')}`
}

export { formatAsDateTime }
