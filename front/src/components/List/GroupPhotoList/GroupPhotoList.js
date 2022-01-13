import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Tooltip, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ZoomInIcon from '@material-ui/icons/ZoomIn'

import { useSetPreviewPhoto } from 'providers/PhotoPreviewProvider'
import { PhotoItem } from 'components/List/ListItem/PhotoItem/PhotoItem'
import { ITEM_TYPES } from 'constants/ItemTypes'
import * as CommonStyled from '../List.styles'
import * as Styled from './GroupPhotoList.styles'

const GroupPhotoList = ({ groupId, photoItems, onRemove: handleRemove }) => {
  const { t } = useTranslation()
  const setPreviewPhoto = useSetPreviewPhoto()

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData(
      'itemInfo', JSON.stringify({ type: ITEM_TYPES.GROUP_PHOTO, groupId, photoId: id }),
    )
  }

  return (
    <Styled.List>
      {photoItems.length ? (
        photoItems.map(({ id, photo }) => (
          <PhotoItem
            key={id}
            id={id}
            photo={photo}
            onDragStart={handleDragStart}
            hidePhoto
            actions={(
              <>
                <Tooltip title={t('common.preview')}>
                  <CommonStyled.IconButton
                    onClick={() => setPreviewPhoto(photo)}
                  >
                    <ZoomInIcon />
                  </CommonStyled.IconButton>
                </Tooltip>
                <Tooltip title={t('common.remove')}>
                  <CommonStyled.IconButton
                    onClick={() => handleRemove(id)}
                  >
                    <DeleteIcon />
                  </CommonStyled.IconButton>
                </Tooltip>
              </>
            )}
          />
        ))
      ) : (
        <Typography variant='subtitle1'>
          {t('mapSection.grouping.group.empty')}
        </Typography>
      )}
    </Styled.List>
  )
}

GroupPhotoList.defaultProps = {
  photoItems: [],
}

GroupPhotoList.propTypes = {
  groupId: PropTypes.string.isRequired,
  photoItems: PropTypes.array,
  onRemove: PropTypes.func.isRequired,
}

export { GroupPhotoList }
