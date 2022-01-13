import styled from '@emotion/styled'
import { Card, Typography } from '@material-ui/core'

const Container = styled(Card)`
  padding-right: 8px;
  display: flex;
`

const DetailsContainer = styled.div`
  padding: 0 8px;
  width: 120px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const GeoLocationContainer = styled.div`
  flex: 1;
`

const DetailsText = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const ButtonsContainer = styled.div`
  padding: 4px;
  display: flex;
  justify-content: space-between;
`

export {
  Container,
  DetailsContainer,
  GeoLocationContainer,
  DetailsText,
  ButtonsContainer,
}
