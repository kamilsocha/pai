import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  CardContent as MuiCardContent,
  CardActions as MuiCardActions,
  Typography,
} from '@material-ui/core'

const Card = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== '$width',
})`
  ${({ $width }) => css`
    width: ${$width || '70px'};
    display: flex;
    flex-direction: column;
    :hover {
      transform: scale3d(1.1, 1.1, 1);
    }
  `}
`

const CardMedia = styled(MuiCardMedia)`
  height: 0;
  padding-top: 56.25%;
`

const CardContent = styled(MuiCardContent)`
  display: flex;
  justify-content: center;
  padding: 0;
  :last-child {
    padding-bottom: 0;
  }
`

const PhotoName = styled(Typography)`
  padding: 0 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const CardActions = styled(MuiCardActions)`
  flex: 1;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export {
  Card,
  CardMedia,
  CardContent,
  PhotoName,
  CardActions,
}
