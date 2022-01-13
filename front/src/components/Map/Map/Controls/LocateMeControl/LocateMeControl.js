import React from 'react'
import styled from '@emotion/styled'
import { useMap } from 'react-leaflet'
import { IconButton } from '@material-ui/core'
import MyLocationIcon from '@material-ui/icons/MyLocation'

const ControlContainer = styled.div`
  background-color: white;
`

const LocateMeButton = styled(IconButton)`
  color: rgba(0, 0, 0, 0.8);
`

const LocateMeControl = () => {
  const map = useMap()

  return (
    <div className='leaflet-bottom leaflet-left'>
      <ControlContainer className='leaflet-control leaflet-bar'>
        <LocateMeButton onClick={() => {
          map.locate({
            setView: true,
          })
        }}
        >
          <MyLocationIcon />
        </LocateMeButton>
      </ControlContainer>
    </div>
  )
}

export { LocateMeControl }
