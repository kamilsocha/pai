import styled from '@emotion/styled'

const Container = styled.div`
  overflow: hidden;
  flex: 1;
  display: flex;
  margin: 0 -8px;
  > * {
    margin: 0 8px;
  }
`

const PhotoContainer = styled.div`
  flex: 2;
  display: flex;
  border: 4px solid gray;
`

const ExifDetailsContainer = styled.div`
  flex: 1;
`

export {
  Container,
  PhotoContainer,
  ExifDetailsContainer,
}
