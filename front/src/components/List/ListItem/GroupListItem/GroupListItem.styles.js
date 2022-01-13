import styled from '@emotion/styled'
import { Card, Typography } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const Container = styled(Card)`
  padding: 8px;
`

const HeaderContainer = styled(Card)`
  display: flex;
  justify-content: space-between;
  padding: 4px 8px;
  margin-bottom: 4px;
`

const HeaderLeftColumn = styled.div``

const HeaderRightColumn = styled.div`
  display: flex;
  align-items: center;
`

const DragText = styled(Typography)`
  margin-right: 16px;
  padding: 8px;
  border: 4px solid gray;
  border-radius: 5px;
`

const Row = styled.div`
  display: flex;
`

const Label = styled(Typography)`
  margin-right: 8px;
  font-weight: bold;
`

const ContentContainer = styled.div`
  display: flex;
  margin: 0 -4px;
  > * {
    margin: 0 4px;
  }
`

const PhotoDropBox = styled.div`
  height: 100px;
  width: 100px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 4px dashed gray;
`

const PhotoDropBoxText = styled(Typography)`
  text-align: center;
`

const UploadIcon = styled(CloudUploadIcon)`
  width: 36px;
  height: 36px;
`

const PhotoListContainer = styled.div`
  flex: 1;
  position: relative;
  overflow-x: auto;
  border: 4px solid gray;
`

export {
  Container,
  HeaderContainer,
  HeaderLeftColumn,
  HeaderRightColumn,
  DragText,
  Row,
  Label,
  ContentContainer,
  PhotoDropBox,
  PhotoDropBoxText,
  UploadIcon,
  PhotoListContainer,
}
