import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
`

const HeaderContainer = styled.div`
  flex: 0;
`

const ContentContainer = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: ${theme.spacing(0.5)}px ${theme.spacing(1)}px;
    & > * {
      padding: ${theme.spacing(0.5)}px 0;
    }
    overflow: hidden;
  `}
`

const FooterContainer = styled.div`
  flex: 0;
`

export {
  Container,
  HeaderContainer,
  ContentContainer,
  FooterContainer,
}
