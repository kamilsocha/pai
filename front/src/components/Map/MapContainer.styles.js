import styled from '@emotion/styled'

const Container = styled.div`
  flex: 1;
  display: flex;
`

const PhotoGroupsContainer = styled.div`
  width: 400px;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  border: 4px solid gray;
  display: flex;
  flex-direction: column;
`

const MapWrapper = styled.div`
  flex: 1;
  position: relative;
`

export {
  Container,
  PhotoGroupsContainer,
  MapWrapper,
}
