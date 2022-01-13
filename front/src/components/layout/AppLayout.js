import React from 'react'

import PropTypes from 'prop-types'
import { AppBar } from 'components/AppBar/AppBar'
import { AppFooter } from 'components/AppFooter/AppFooter'
import { useIsAuthPage } from 'hooks/useIsAuthPage'
import * as Styled from './AppLayout.styles'

const AppLayout = ({ children }) => {
  const isAuthPage = useIsAuthPage()

  return (
    <Styled.Container>
      {!isAuthPage && (
        <Styled.HeaderContainer>
          <AppBar />
        </Styled.HeaderContainer>
      )}
      <Styled.ContentContainer>
        {children}
      </Styled.ContentContainer>
      {!isAuthPage && (
        <Styled.FooterContainer>
          <AppFooter />
        </Styled.FooterContainer>
      )}
    </Styled.Container>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { AppLayout }
