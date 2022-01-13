import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  Button as MuiButton,
  Card as MuiCard,
  CircularProgress,
  Typography,
} from '@material-ui/core'
import { GetApp, Delete } from '@material-ui/icons'

const Container = styled(MuiCard)`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(1)}px;
  display: flex;
  flex-direction: column;
`

const ImageContainer = styled.div`
  display: block;
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  padding: 66% 0 0 0;
`

const Image = styled.img`
  margin: auto;
  display: block;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
`

const DetailsContainer = styled.div``

const Row = styled.div`
  display: flex;
`

const Label = styled(Typography)`
  font-weight: bold;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`

const Value = styled(Typography)``

const LoadingIndicator = styled((props) => (
  <CircularProgress color='secondary' {...props} />
))``

const CenteredMessage = styled((props) => (
  <Typography align='center' {...props} />
))``

const buttonStyles = ({ theme }) => css`
  flex: 1;
  margin: ${theme.spacing(1)}px;
  max-width: 200px;
`

const DownloadButton = styled((props) => (
  <MuiButton variant='contained' startIcon={<GetApp />} {...props} />
))`
  ${buttonStyles};
`

const DeleteButton = styled((props) => (
  <MuiButton variant='contained' startIcon={<Delete />} {...props} />
))`
  ${buttonStyles};
`

export {
  Container,
  ImageContainer,
  Image,
  ActionsContainer,
  DetailsContainer,
  Row,
  Label,
  Value,
  LoadingIndicator,
  CenteredMessage,
  DownloadButton,
  DeleteButton,
}
