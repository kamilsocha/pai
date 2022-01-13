import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  Avatar as MuiAvatar,
  CircularProgress,
  IconButton as MuiIconButton,
  ListItem as MuiListItem,
  ListItemAvatar as MuiListItemAvatar,
  ListItemText as MuiListItemText,
  ListItemIcon as MuiListItemIcon,
} from '@material-ui/core'

const ListItem = styled((props) => (
  <MuiListItem button {...props} />
))`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing(1)}px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
                0px 1px 1px 0px rgb(0 0 0 / 14%),
                0px 1px 3px 0px rgb(0 0 0 / 12%);
    cursor: pointer;
    :hover {
      transform: scale3d(1.05, 1.05, 1);
    }
  `}
`

const LoadingIndicator = styled((props) => (
  <CircularProgress {...props} />
))``

const ListItemAvatar = styled(MuiListItemAvatar)`
  height: 56px;
  width: 56px;
`

const Avatar = styled(MuiAvatar)`
  height: 100%;
  width: 100%;
`

const ListItemText = styled(MuiListItemText)`
  padding-left: ${({ theme }) => theme.spacing(2)}px;
`

const ListItemIcon = styled(MuiListItemIcon)`
  min-width: 0;
  & .MuiButtonBase-root {
    padding: ${({ theme }) => theme.spacing(1)}px;
  }
`

const IconButton = styled(MuiIconButton)`
  position: relative;
`

const IconButtonLoadingIndicator = styled((props) => (
  <CircularProgress color='secondary' size={20} thickness={6} {...props} />
))`
  position: absolute;
`

export {
  ListItem,
  LoadingIndicator,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
  IconButton,
  IconButtonLoadingIndicator,
}
