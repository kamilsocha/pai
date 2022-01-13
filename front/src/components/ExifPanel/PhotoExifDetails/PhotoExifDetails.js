import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { Button, TextField, Typography } from '@material-ui/core'

import { getCoordinates, getExifData } from 'utils/piexifFun'
import { formatAltitude } from './utils'
import * as Styled from './PhotoExifDetails.styles'

const PhotoExifDetails = ({ photo, onSubmit, onRemove: handleRemove }) => {
  const { t } = useTranslation()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      lat: '',
      lng: '',
    },
    onSubmit,
  })

  useEffect(() => {
    setError(null)
    if (photo) {
      const { image } = photo
      const coordinates = getCoordinates(image)
      if (coordinates.lat && coordinates.lng) {
        const { lat, lng } = coordinates
        resetForm({
          values: {
            lat,
            lng,
          },
        })
      } else {
        const { error: err } = coordinates
        setError(err)
        resetForm({
          values: {
            lat: '',
            lng: '',
          },
        })
      }
      const exifData = getExifData(image)
      setData(exifData)
    } else {
      resetForm({
        values: {
          lat: '',
          lng: '',
        },
      })
      setData(null)
    }
  }, [photo, resetForm])

  const displayAltitude = () => {
    if (data) {
      const { altitude: { altitudeDecimal, altitudeRef } } = data
      if (altitudeDecimal && altitudeRef !== null) {
        return formatAltitude(t, altitudeDecimal, altitudeRef)
      }
    }
    return null
  }

  return (
    <Styled.Form onSubmit={(e) => {
      handleSubmit(e)
      setError(null)
    }}
    >
      <div>
        <TextField
          id='lat'
          name='lat'
          variant='standard'
          fullWidth
          margin='normal'
          type='number'
          inputProps={{
            step: 0.000001,
          }}
          label='Szerokość geograficzna'
          value={values.lat}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched && errors.lat}
          helperText={touched ? errors.lat : null}
        />
        <TextField
          id='lng'
          name='lng'
          variant='standard'
          fullWidth
          margin='normal'
          type='number'
          inputProps={{
            step: 0.000001,
          }}
          label='Długość geograficzna'
          value={values.lng}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched && errors.lng}
          helperText={touched ? errors.lng : null}
        />
        <Typography color='error'>
          {t(error)}
        </Typography>
      </div>
      <Styled.ButtonContainer>
        <Button
          type='button'
          variant='outlined'
          onClick={handleRemove}
        >
          {t('common.remove')}
        </Button>
        <Button
          type='submit'
          variant='outlined'
        >
          {t('common.save')}
        </Button>
      </Styled.ButtonContainer>
      {/* {data && (
        <Styled.DataContainer>
          <Styled.Section>
            <Styled.Title>
              {t('exifData.device')}
            </Styled.Title>
            <Styled.Row>
              <Styled.Value>
                {data?.device.make}
              </Styled.Value>
              <Styled.Value>
                {data?.device.model}
              </Styled.Value>
              <Typography>
                OS
              </Typography>
              <Styled.Value>
                {data?.device.OSVersion}
              </Styled.Value>
            </Styled.Row>
          </Styled.Section>
          <Styled.Section>
            <Styled.Title>
              {t('exifData.time')}
            </Styled.Title>
            <Styled.Value>
              {data?.device.dateTime}
            </Styled.Value>
            <Styled.Value>
              {data?.device.dateTimeOriginal}
            </Styled.Value>
            <Styled.Value>
              {data?.device.subsecOriginal}
            </Styled.Value>
          </Styled.Section>
          <Styled.Section>
            <Styled.Title>
              {t('exifData.altitude')}
            </Styled.Title>
            {displayAltitude()}
          </Styled.Section>
        </Styled.DataContainer>
      )} */}
    </Styled.Form>
  )
}

PhotoExifDetails.defaultProps = {
  photo: null,
}

PhotoExifDetails.propTypes = {
  photo: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export { PhotoExifDetails }
