import styled from '@emotion/styled'
import { Button } from '@material-ui/core'

const Container = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`

const DetailsContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(0.5)}px;
  display: flex;
`

const FilesContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(0.5)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UploadFilesButton = styled(Button)`
  width: 100%;
  max-width: 400px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export {
  Container,
  DetailsContainer,
  FilesContainer,
  UploadFilesButton,
}
