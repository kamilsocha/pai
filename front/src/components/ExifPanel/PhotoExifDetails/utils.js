const formatAltitude = (t, altitude, altitudeRef) => {
  let altitudeRefText
  if (altitudeRef === 0) {
    altitudeRefText = 'aboveSeaLevel'
  } else if (altitudeRef === 1) {
    altitudeRefText = 'belowSeaLevel'
  }
  return t('altitude.text', { meters: altitude, level: altitudeRefText })
}

export {
  formatAltitude,
}
