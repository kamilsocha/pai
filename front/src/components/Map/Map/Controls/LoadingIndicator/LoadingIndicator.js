import React from 'react'
import styled from '@emotion/styled'
import { CircularProgress } from '@material-ui/core'

const Box = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`

const LoadingSpinner = styled(CircularProgress)`
  color: white;
`

const LoadingIndicator = () => (
  <Box className='leaflet-bottom leaflet-left'>
    <LoadingSpinner />
  </Box>
)

export { LoadingIndicator }
