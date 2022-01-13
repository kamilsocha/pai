import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  Card as MuiCard,
  Typography,
} from '@material-ui/core'

const Title = styled((props) => (
  <Typography variant='h6' {...props} />
))`
  display: flex;
  justify-content: center;
`

const AddingCard = styled(MuiCard)`
  ${({ theme }) => css`
    flex: 1;
    margin: 0 ${theme.spacing(1)}px;
    padding: ${theme.spacing(1)}px;
    overflow-y: auto;
  `}
`

const InstructionText = styled(Typography)`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing(1)}px;
    text-align: center;
  `}
`

const ListCard = styled(MuiCard)`
  ${({ theme }) => css`
    flex: 2;
    margin: ${theme.spacing(1)}px;
    position: relative;
    overflow-y: auto;
    min-height: 40px;
  `}
`

export {
  Title,
  AddingCard,
  InstructionText,
  ListCard,
}
