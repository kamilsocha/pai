import { format, formatISO } from 'date-fns'

export const formatDateToISO = (dateTime) => formatISO(new Date(dateTime))

export const formatDate = (dateTime) =>
  format(new Date(dateTime), 'yyyy-MM-dd')

export const formatDateWithTime = (dateTime) => format(new Date(dateTime), 'yyyy-MM-dd HH:mm')

export const inputFormatDateWithTime = (dateTime) =>
  format(new Date(dateTime), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
