import React from 'react'
import { useSelector } from 'react-redux'

import { GroupList } from 'components/List/GroupList/GroupList'
import * as Styled from './GroupListContainer.styles'

const GroupListContainer = () => {
  const groupItems = useSelector((state) => state.root.app.groupItems)

  return (
    <Styled.GroupListContainer>
      <GroupList groupItems={groupItems} />
    </Styled.GroupListContainer>
  )
}

export { GroupListContainer }
