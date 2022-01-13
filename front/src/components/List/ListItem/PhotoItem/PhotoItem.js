import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './PhotoItem.styles'

const PhotoItem = ({
  id,
  photo: { image, name },
  hidePhoto = false,
  actions,
  draggable = true,
  onDragStart: handleDragStart,
}) => (
  <Styled.Card
    draggable={draggable}
    onDragStart={(event) => handleDragStart(event, id)}
  >
    {!hidePhoto && <Styled.CardMedia image={image} />}
    <Styled.CardContent>
      <Styled.PhotoName>
        {name}
      </Styled.PhotoName>
    </Styled.CardContent>
    <Styled.CardActions>
      {actions}
    </Styled.CardActions>
  </Styled.Card>
)

PhotoItem.propTypes = {
  photo: PropTypes.object.isRequired,
}

export { PhotoItem }
