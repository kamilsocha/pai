import styled from '@emotion/styled'
import { CircularProgress as MuiCircularProgress, Typography } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const DropContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 4px dashed gray;
  margin-bottom: 4px;
`

const ContentContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const UploadIcon = styled(CloudUploadIcon)`
  width: 32px;
  height: 32px;
`

const UploadInput = styled.input`
  display: none;
`

const CircularProgressContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(120, 120, 120, 0.6);
`

const CircularProgress = styled(MuiCircularProgress)`
  color: #fff;
  opacity: 1;
`

const FileFormatText = styled(Typography)`
  text-align: center;
`

export {
  DropContainer,
  ContentContainer,
  UploadIcon,
  UploadInput,
  CircularProgressContainer,
  CircularProgress,
  FileFormatText,
}
