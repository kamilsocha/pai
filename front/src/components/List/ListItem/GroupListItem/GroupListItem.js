import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Tooltip, Typography, IconButton, Checkbox, FormControlLabel } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import { ITEM_TYPES } from 'constants/ItemTypes'
import {
  addPhotoItemToGroupAction,
  movePhotoItemToGroupAction,
  removeGroupItemAction,
  removePhotoItemFromGroupAction,
} from 'store/appReducer'
import { GroupPhotoList } from 'components/List/GroupPhotoList/GroupPhotoList'
import { Dialog } from 'components/Dialog/Dialog'
import * as Styled from './GroupListItem.styles'

const GroupListItem = ({ groupItem: { id: groupId, name, photoItems } }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [shouldDeletePhotos, setShouldDeletePhotos] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const itemInfo = JSON.parse(e.dataTransfer.getData('itemInfo'))
    const { type } = itemInfo
    if (type === ITEM_TYPES.PHOTO) {
      const { id: photoId } = itemInfo
      dispatch(addPhotoItemToGroupAction({ groupId, photoId }))
    } else if (type === ITEM_TYPES.GROUP_PHOTO) {
      const { groupId: srcGroupId, photoId } = itemInfo
      dispatch(movePhotoItemToGroupAction({ srcGroupId, destGroupId: groupId, photoId }))
    }
  }

  const handlePhotoRemove = (photoId) => {
    dispatch(removePhotoItemFromGroupAction({ groupId, photoId }))
  }

  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      'itemInfo', JSON.stringify({ type: ITEM_TYPES.GROUP, id: groupId }),
    )
  }

  return (
    <Styled.Container>
      <Styled.HeaderContainer
        draggable={!!photoItems?.length}
        onDragStart={handleDragStart}
      >
        <Styled.HeaderLeftColumn>
          <Styled.Row>
            <Styled.Label>{t('common.name')}:</Styled.Label>
            <Typography>{name}</Typography>
          </Styled.Row>
          <Styled.Row>
            <Styled.Label>{t('common.items')}:</Styled.Label>
            <Typography>{photoItems.length}</Typography>
          </Styled.Row>
        </Styled.HeaderLeftColumn>
        <Styled.HeaderRightColumn>
          <Styled.DragText>
            {t('mapSection.grouping.group.drag')}
          </Styled.DragText>
          <Tooltip title={t('common.remove')}>
            <IconButton onClick={() => setDialogOpen(true)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Styled.HeaderRightColumn>
        <Dialog
          open={dialogOpen}
          onCancel={() => setDialogOpen(false)}
          onOk={() => {
            dispatch(removeGroupItemAction(
              { groupId, shouldDeletePhotos },
            ))
            setDialogOpen(false)
          }}
          title={t('mapSection.grouping.group.confirmDeleting', { name })}
          content={(
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={shouldDeletePhotos}
                    onChange={(event) => setShouldDeletePhotos(event.target.checked)}
                  />
                }
                label={t('mapSection.grouping.group.shouldDeletePhotos')}
              />
            </>
          )}
        />
      </Styled.HeaderContainer>
      <Styled.ContentContainer>
        <Styled.PhotoDropBox
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Styled.PhotoDropBoxText>
            {t('mapSection.grouping.group.drop')}
          </Styled.PhotoDropBoxText>
          <Styled.UploadIcon />
        </Styled.PhotoDropBox>
        <Styled.PhotoListContainer>
          <GroupPhotoList
            groupId={groupId}
            photoItems={photoItems}
            onRemove={handlePhotoRemove}
          />
        </Styled.PhotoListContainer>
      </Styled.ContentContainer>
    </Styled.Container>
  )
}

export { GroupListItem }
