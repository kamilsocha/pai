import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Tooltip, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ZoomInIcon from '@material-ui/icons/ZoomIn'

import { useSetPreviewPhoto } from 'providers/PhotoPreviewProvider'
import { PhotoItem } from 'components/List/ListItem/PhotoItem/PhotoItem'
import { ITEM_TYPES } from 'constants/ItemTypes'
import * as Styled from '../List.styles'

const PhotoList = ({ photoItems, onRemove: handleRemove }) => {
  const { t } = useTranslation()
  const setPreviewPhoto = useSetPreviewPhoto()

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData('itemInfo', JSON.stringify({ id, type: ITEM_TYPES.PHOTO }))
  }

  return (
    <Styled.HorizontalList>
      {photoItems.length ? (
        photoItems.map(({ id, photo }) => (
          <PhotoItem
            key={id}
            id={id}
            photo={photo}
            onDragStart={handleDragStart}
            actions={(
              <>
                <Tooltip title={t('common.preview')}>
                  <Styled.IconButton
                    onClick={() => setPreviewPhoto(photo)}
                  >
                    <ZoomInIcon />
                  </Styled.IconButton>
                </Tooltip>
                <Tooltip title={t('common.remove')}>
                  <Styled.IconButton
                    onClick={() => handleRemove(id)}
                  >
                    <DeleteIcon />
                  </Styled.IconButton>
                </Tooltip>
              </>
            )}
          />
        ))
      ) : (
        <Typography variant='subtitle1'>
          {t('uploadSection.noPhotos')}
        </Typography>
      )}
    </Styled.HorizontalList>
  )
}

PhotoList.defaultProps = {
  photoItems: [],
}

PhotoList.propTypes = {
  photoItems: PropTypes.array,
}

export { PhotoList }
