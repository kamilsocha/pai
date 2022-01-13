import styled from '@emotion/styled'
import {
  Dialog as MuiDialog,
  List as MuiList,
  ListItem as MuiListItem,
  LinearProgress as MuiLinearProgress,
} from '@material-ui/core'
import MuiCheckIcon from '@material-ui/icons/Check'
import MuiAlert from '@material-ui/lab/Alert'

const Dialog = styled(MuiDialog)``

const Container = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
`

const FileInput = styled.input`
  display: none;
`

const ActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const List = styled(MuiList)`
  max-height: 200px;
  overflow: auto;
  margin: ${({ theme }) => theme.spacing(2, 0)};
`

const ListItem = styled(MuiListItem)`
  padding-bottom: 0;

  & .MuiListItemText-primary {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const CheckIcon = styled(MuiCheckIcon)`
  height: 48px;
  width: 48px;
  padding: 12px;
`

const LinearProgress = styled(MuiLinearProgress)`
  width: 95%;
  margin: 0 auto;
  opacity: ${({ $isUpdating }) => ($isUpdating ? 1 : 0)};
  transition: opacity 800ms ease-in-out;
`

const Alert = styled(MuiAlert)`
  &.MuiPaper-root {
    margin-top: ${({ theme }) => theme.spacing(1)};
  }
`

const SizeSpan = styled.span`
  ${({ isTooBig, theme }) => `
    ${isTooBig && `color: ${theme.palette.error.main}`};
    margin-right: ${theme.spacing(1)};
  `};
`

export {
  Container,
  ActionsRow,
  List,
  ListItem,
  CheckIcon,
  FileInput,
  LinearProgress,
  Alert,
  SizeSpan,
}
