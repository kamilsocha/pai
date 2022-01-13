import styled from '@emotion/styled'

const Container = styled.div`
  min-width: 0; // overflow fix
  flex: 1;
  display: flex;
  margin: 0 -8px;
  > * {
    margin: 0 8px;
  }
`

const DropzoneContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`

const PhotoListContainer = styled.div`
  flex: 1;
  display: flex;
  overflow-x: auto;
  padding: 4px;
  border: 4px solid gray;
`

export {
  Container,
  DropzoneContainer,
  PhotoListContainer,
}
