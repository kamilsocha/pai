import piexif from 'piexifjs'

const getCoordinates = (file) => {
  const exifObj = piexif.load(file)
  const { GPS: { 1: latRef, 2: latTable, 3: lngRef, 4: lngTable } } = exifObj
  let lat
  let lng
  let error = null
  if (latRef && latTable && lngRef && lngTable) {
    lat = piexif.GPSHelper.dmsRationalToDeg(latTable, latRef)
    lng = piexif.GPSHelper.dmsRationalToDeg(lngTable, lngRef)
  } else {
    lat = null
    lng = null
    error = 'common.getCoordinatesError'
  }

  return {
    lat,
    lng,
    error,
  }
}

const setCoordinates = (file, coordinates) => {
  try {
    const exifObj = piexif.load(file)
    const { lat, lng } = coordinates
    if (lat >= 0) {
      exifObj.GPS[piexif.GPSIFD.GPSLatitudeRef] = 'N'
    } else {
      exifObj.GPS[piexif.GPSIFD.GPSLatitudeRef] = 'S'
    }
    exifObj.GPS[piexif.GPSIFD.GPSLatitude] = piexif.GPSHelper.degToDmsRational(Math.abs(lat))

    if (lng >= 0) {
      exifObj.GPS[piexif.GPSIFD.GPSLongitudeRef] = 'E'
    } else {
      exifObj.GPS[piexif.GPSIFD.GPSLongitudeRef] = 'W'
    }
    exifObj.GPS[piexif.GPSIFD.GPSLongitude] = piexif.GPSHelper.degToDmsRational(Math.abs(lng))

    const exifStr = piexif.dump(exifObj)
    const inserted = piexif.insert(exifStr, file)
    return inserted
  } catch (err) {
    // eslint-disable-next-line
    console.log('error', err)
    return null
  }
}

const rationalToDecimal = (rational) => rational[0] / rational[1]

const getExifData = (file) => {
  const exifObj = piexif.load(file)

  if (exifObj) {
    const make = exifObj['0th'][piexif.ImageIFD.Make] ? exifObj['0th'][piexif.ImageIFD.Make] : null
    const model = exifObj['0th'][piexif.ImageIFD.Model] ? (
      exifObj['0th'][piexif.ImageIFD.Model]
    ) : null
    const OSVersion = exifObj['0th'][piexif.ImageIFD.Software] ? (
      exifObj['0th'][piexif.ImageIFD.Software]
    ) : null

    const dateTime = exifObj['0th'][piexif.ImageIFD.DateTime] ? (
      exifObj['0th'][piexif.ImageIFD.DateTime]
    ) : null
    const dateTimeOriginal = exifObj?.Exif[piexif.ExifIFD.DateTimeOriginal] ? (
      exifObj?.Exif[piexif.ExifIFD.DateTimeOriginal]
    ) : null
    const subsecTimeOriginal = exifObj?.Exif[piexif.ExifIFD.SubSecTimeOriginal] ? (
      exifObj?.Exif[piexif.ExifIFD.SubSecTimeOriginal]
    ) : null

    const altitudeRational = exifObj.GPS[piexif.GPSIFD.GPSAltitude] ? (
      exifObj.GPS[piexif.GPSIFD.GPSAltitude]
    ) : null
    const altitudeRef = exifObj.GPS[piexif.GPSIFD.GPSAltitudeRef] ? (
      exifObj.GPS[piexif.GPSIFD.GPSAltitudeRef]
    ) : null
    const altitudeDecimal = altitudeRational ? rationalToDecimal(altitudeRational) : null

    return {
      device: {
        make,
        model,
        OSVersion,
      },
      time: {
        dateTime,
        dateTimeOriginal,
        subsecTimeOriginal,
      },
      altitude: {
        altitudeDecimal,
        altitudeRef,
      },
    }
  }
  return null
}

export {
  getCoordinates,
  setCoordinates,
  getExifData,
}
