import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'
import L from 'leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen'
// eslint-disable-next-line
import { updateModifiedItemsAction, removeItemCoordinatesAction } from 'store/appReducer'
import { ITEM_TYPES } from 'constants/ItemTypes'
import { setCoordinates } from 'utils/piexifFun'

/** default icon imports */
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

/** styles imports */
import './styles.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import 'leaflet-geosearch/dist/geosearch.css'

import { SearchControl } from './Controls/SearchControl/SearchControl'
import { LocateMeControl } from './Controls/LocateMeControl/LocateMeControl'
import { LoadingIndicator } from './Controls/LoadingIndicator/LoadingIndicator'
import { MapItem } from './MapItem/MapItem'

// fix issue with not displaying marker icon
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})
L.Marker.prototype.options.icon = DefaultIcon

const MapWrapper = styled.div`
  > * {
    color: black;
  }
`

const loadingReducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return true
    case 'end':
      return false
    default:
      return state
  }
}

const Map = () => {
  const mapRef = useRef()
  const provider = useMemo(() => new OpenStreetMapProvider(), [])
  const photoItems = useSelector((state) => state.root.app.photoItems)
  const groupItems = useSelector((state) => state.root.app.groupItems)
  const mapItems = useMemo(() => [
    ...groupItems.filter((groupItem) => !!groupItem.coordinates),
    ...photoItems.filter((photoItem) => !!photoItem.coordinates),
  ], [groupItems, photoItems])
  const [loading, loadingDispatch] = useReducer(loadingReducer, false)
  const dispatch = useDispatch()

  const processItems = useCallback((type, id, coordinates) => (
    new Promise((resolve, reject) => {
      try {
        if (type !== ITEM_TYPES.GROUP_PHOTO) {
          if (type === ITEM_TYPES.PHOTO) {
            const photoItem = photoItems.find((item) => item.id === id)
            const updatedImage = setCoordinates(photoItem.photo.image, coordinates)
            const modifiedPhotoItem = {
              ...photoItem,
              photo: {
                ...photoItem.photo,
                image: updatedImage,
              },
              coordinates,
            }
            resolve(modifiedPhotoItem)
          } else {
            const groupItem = groupItems.find((item) => item.id === id)
            const modifiedGroupPhotoItems = [...groupItem.photoItems]
            const updatedImages = []
            modifiedGroupPhotoItems.forEach((item) => {
              const updatedImage = setCoordinates(item.photo.image, coordinates)
              updatedImages.push({ ...item, photo: { ...item.photo, image: updatedImage } })
            })
            const modifiedGroupItem = {
              ...groupItem,
              photoItems: updatedImages,
              coordinates,
            }
            resolve(modifiedGroupItem)
          }
        }
      } catch (err) {
        reject(err)
      }
    })
  ), [photoItems, groupItems])

  const updateItem = useCallback(async (type, id, coordinates) => {
    const result = await processItems(type, id, coordinates)
    dispatch(updateModifiedItemsAction(result))
  }, [dispatch, processItems])

  const handleDrop = useCallback(async (e) => {
    const { current } = mapRef
    const itemInfo = JSON.parse(e.dataTransfer.getData('itemInfo'))
    const { type, id } = itemInfo
    const { target, clientX, clientY } = e
    const { x, y } = target.getBoundingClientRect()
    const coordinates = current.containerPointToLatLng(L.point([clientX - x, clientY - y]))
    loadingDispatch({ type: 'start' })
    await updateItem(type, id, coordinates)
    loadingDispatch({ type: 'end' })
  }, [updateItem, loadingDispatch])

  const handleCreated = (mapInstance) => {
    mapRef.current = mapInstance
    const { _container: container } = mapInstance
    container.ondragover = (e) => {
      e.preventDefault()
      e.stopPropagation()
      e.dataTransfer.dropEffect = 'move'
    }
    container.ondrop = (e) => {
      e.preventDefault()
      e.stopPropagation()
      handleDrop(e)
    }
  }

  useEffect(() => {
    if (mapRef.current) {
      const { current: { _container: container } } = mapRef
      container.ondrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        handleDrop(e)
      }
    }
  }, [handleDrop])

  const handleSaveChanges = async (type, id, coordinates) => {
    loadingDispatch({ type: 'start' })
    await updateItem(type, id, coordinates)
    loadingDispatch({ type: 'end' })
  }

  const handleRemove = (type, id) => dispatch(removeItemCoordinatesAction({ type, id }))

  return (
    <MapWrapper>
      <LeafletMapContainer
        center={[0, 0]}
        zoom={4}
        zoomControl={false}
        fullscreenControl
        fullscreenControlOptions={{
          position: 'topright',
        }}
        whenCreated={handleCreated}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <SearchControl provider={provider} />
        <ZoomControl position='bottomright' />
        <LocateMeControl />
        {loading ? <LoadingIndicator /> : null}
        {mapItems?.length && (
          mapItems.map((item) => (
            <MapItem
              key={item.id}
              item={item}
              onSaveChanges={handleSaveChanges}
              onRemove={handleRemove}
              loading={loading}
            />
          ))
        )}
      </LeafletMapContainer>
    </MapWrapper>
  )
}

export { Map }
