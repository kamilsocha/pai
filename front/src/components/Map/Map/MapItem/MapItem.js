import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Button } from '@material-ui/core'

import albumImage from 'assets/album.png'
import { ITEM_TYPES } from 'constants/ItemTypes'
import * as Styled from './MapItem.styled'

const iconSize = [50, 50]

const MapItem = ({ item, onSaveChanges: handleSaveChanges, onRemove: handleRemove, loading }) => {
  const { t } = useTranslation()
  const { id, type, coordinates } = item
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(null)
  const groupPhotoItemsRef = useRef(null)
  const [groupPhotoItemsChanged, setGroupPhotoItemsChanged] = useState(false)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(() => ({
    dragend() {
      const { current } = markerRef
      if (current !== null) {
        setPosition(current.getLatLng())
      }
    },
  }), [])
  const toggleDraggable = useCallback(() => setDraggable((prevState) => !prevState), [])

  const icon = useMemo(() => {
    if (type === ITEM_TYPES.PHOTO) {
      return new L.Icon({
        iconUrl: item.photo.image,
        iconSize,
      })
    }
    return new L.Icon({
      iconUrl: albumImage,
      iconSize,
    })
  }, [item, type])

  useEffect(() => {
    const { current } = markerRef
    if (current) current.openPopup()
  }, [])

  useEffect(() => {
    setPosition(coordinates)
  }, [coordinates])

  useEffect(() => {
    if (!groupPhotoItemsRef.current) {
      groupPhotoItemsRef.current = item.photoItems
    }
    if (groupPhotoItemsRef.current !== item.photoItems) {
      setGroupPhotoItemsChanged(true)
      groupPhotoItemsRef.current = item.photoItems
    }
  }, [item.photoItems])

  const didChange = () => (
    !(position.lat !== coordinates.lat
      || position.lng !== coordinates.lng
      || groupPhotoItemsChanged)
  )

  return (
    <>
      {position && (
        <Marker
          position={position}
          draggable={draggable}
          eventHandlers={eventHandlers}
          ref={markerRef}
          icon={icon}
        >
          <Popup>
            <Styled.Container>
              <Styled.Row>
                <Styled.Label>
                  {t('common.name')}:
                </Styled.Label>
                <Styled.NameText>
                  {item.name}
                </Styled.NameText>
              </Styled.Row>
              <Button
                variant='outlined'
                type='button'
                color='secondary'
                onClick={toggleDraggable}
              >
                {draggable ? (
                  t('mapSection.map.item.draggable')
                ) : (
                  t('mapSection.map.item.notDraggable')
                )}
              </Button>
              <div>
                <Styled.DetailsText>
                  {`${t('common.latitude')} ${position.lat}`}
                </Styled.DetailsText>
                <Styled.DetailsText>
                  {`${t('common.longitude')} ${position.lng}`}
                </Styled.DetailsText>
              </div>
              <Styled.ButtonsContainer>
                <Button
                  variant='outlined'
                  type='button'
                  color='secondary'
                  disabled={didChange()}
                  onClick={() => {
                    handleSaveChanges(type, id, position)
                    setGroupPhotoItemsChanged(false)
                  }}
                >
                  {loading && 'loading'}
                  {t('common.save')}
                </Button>
                <Button
                  variant='outlined'
                  type='button'
                  color='secondary'
                  onClick={() => handleRemove(type, id)}
                >
                  {t('common.remove')}
                </Button>
              </Styled.ButtonsContainer>
            </Styled.Container>
          </Popup>
        </Marker>
      )}
    </>
  )
}

export { MapItem }
