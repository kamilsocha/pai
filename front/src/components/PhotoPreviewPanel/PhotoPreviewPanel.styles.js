import styled from '@emotion/styled'
import { Card, IconButton, Modal, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled(Card)`
  position: relative;
  padding: 26px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* max-height: 90%;
  max-width: 60%;
  min-height: 60%;
  min-width: 40%; */
  /* max-height: 80vh;
  max-width: 50vw; */
  height: 80vh;
  width: 50vw;
`

const CloseButton = styled((props) => (
  <IconButton {...props}>
    <CloseIcon />
  </IconButton>
))`
  position: absolute;
  top: 0;
  right: 0;
`

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
  /* background-image: ${({ $image }) => `url(${$image})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center; */
  display: block;
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  padding: 34.37% 0 0 0;
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

const CoordinatesContainer = styled.div`
  display: flex;
`

const CoordinateContainer = styled.div`
  display: flex;
  margin: 4px 16px;
`

const CoordinatesLabel = styled(Typography)`
  margin-right: 8px;
  font-weight: bold;
`

export {
  StyledModal as Modal,
  ModalContent,
  CloseButton,
  ImageContainer,
  Image,
  CoordinatesContainer,
  CoordinateContainer,
  CoordinatesLabel,
}
