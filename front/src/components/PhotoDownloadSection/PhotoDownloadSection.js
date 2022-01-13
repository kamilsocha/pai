import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { removeModifiedItemAction } from 'store/appReducer'
import { ModifiedList } from 'components/List/ModifiedList/ModifiedList'
import * as Styled from './PhotoDownloadSection.styles'

const PhotoDownloadSection = () => {
  const items = useSelector((state) => state.root.app.modifiedItems)
  const dispatch = useDispatch()

  const handleItemRemove = (id) => dispatch(removeModifiedItemAction({ id }))

  return (
    <Styled.Container>
      <ModifiedList items={items} onRemove={handleItemRemove} />
    </Styled.Container>
  )
}

export { PhotoDownloadSection }
