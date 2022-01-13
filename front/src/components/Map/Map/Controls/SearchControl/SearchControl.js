import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { GeoSearchControl } from 'leaflet-geosearch'

const SearchControl = ({ provider }) => {
  const map = useMap()

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider,
    })

    map.addControl(searchControl)
    return () => map.removeControl(searchControl)
  }, [map, provider])

  return null
}

export { SearchControl }
