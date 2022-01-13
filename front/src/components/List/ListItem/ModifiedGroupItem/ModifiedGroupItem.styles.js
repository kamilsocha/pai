import styled from '@emotion/styled'
import { Card as MuiCard, Typography } from '@material-ui/core'

const Card = styled(MuiCard)`
  display: flex;
  flex-direction: column;
  padding: 4px;
`

const TopContainer = styled.div``

const BottomContainer = styled.div`
  position: relative;
  flex: 1;
  width: 200px;
  overflow: auto;
  display: flex;
`

const Row = styled.div`
  display: flex;
`

const Label = styled(Typography)`
  margin-right: 8px;
  font-weight: bold;
`

const List = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    margin: 0 8px;
  }
  padding: 8px;
  border: 4px solid gray;
`

const Image = styled.img`
  width: 50px;
  height: auto;
`

export {
  Card,
  TopContainer,
  Row,
  Label,
  BottomContainer,
  List,
  Image,
}
