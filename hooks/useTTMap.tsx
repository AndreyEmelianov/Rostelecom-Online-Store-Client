import { useUnit } from 'effector-react'

import { $mapInstance } from '@/context/order/state'

export const useTTMap = () => {
  const mapInstance = useUnit($mapInstance)

  const handleSelectAddress = async (
    {
      lon1,
      lat1,
      lon2,
      lat2,
    }: { lon1: number; lat1: number; lon2: number; lat2: number },
    position: {
      lat: number
      lon: number
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialMapInstance?: any
  ) => {
    const tomtomMaps = await import(`@tomtom-international/web-sdk-maps`)

    const currentMap = mapInstance || initialMapInstance

    const ll1 = new tomtomMaps.LngLat(lon1, lat1)
    const ll2 = new tomtomMaps.LngLat(lon2, lat2)
    const llbounds = new tomtomMaps.LngLatBounds(ll1, ll2)

    currentMap.map.fitBounds(llbounds, { padding: 130, linear: true })

    const markerElement = document.createElement('div')
    markerElement.classList.add('map-marker')

    new tomtomMaps.Marker()
      .setLngLat([position.lon, position.lat])
      .addTo(currentMap)
  }

  return { handleSelectAddress }
}
