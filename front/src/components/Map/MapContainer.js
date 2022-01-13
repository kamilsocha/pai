import React from 'react'

import { GroupingSection } from './GroupingSection/GroupingSection'
import { Map } from './Map/Map'
import * as Styled from './MapContainer.styles'

const MapContainer = () => (
  <Styled.Container>
    <Styled.PhotoGroupsContainer>
      <GroupingSection />
    </Styled.PhotoGroupsContainer>
    <Styled.MapWrapper>
      <Map />
    </Styled.MapWrapper>
  </Styled.Container>
)

export { MapContainer }
