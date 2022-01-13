import styled from '@emotion/styled'
import { List as MuiList, ListItem as MuiListItem } from '@material-ui/core'

const List = styled(MuiList)`
  display: flex;
  align-items: center;
  margin: 0 -8px;
  > * {
    margin: 0 8px;
  }
`

const ListItem = styled(MuiListItem)`
  border-radius: 5px;
  margin: 0;
  .MuiListItemText-root {
    /* margin-right: 8px; */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .MuiListItemIcon-root {
    min-width: 0;
    padding-right: 12px;
  }
`

export { List, ListItem }
