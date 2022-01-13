import styled from '@emotion/styled'
import PhotoIcon from '@material-ui/icons/Photo'

const PhotoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ImageContainer = styled.div`
  display: block;
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  padding: 36% 0 0 0;
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

const DropIcon = styled(PhotoIcon)`
  width: 36px;
  height: 36px;
`

export {
  PhotoContainer,
  ImageContainer,
  Image,
  DropIcon,
}
