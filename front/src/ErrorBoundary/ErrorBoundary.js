/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'

import { resetAllAction } from 'store/appReducer'
import * as Styled from './ErrorBoundary.styles'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log('error', error, errorInfo)
  }

  render() {
    const { children, t, resetAll } = this.props
    const { hasError } = this.state

    if (hasError) {
      return (
        <Styled.Container>
          <Styled.ResetForm>
            <Styled.ErrorText>
              {t('common.error')}
            </Styled.ErrorText>
            <Button
              variant='outlined'
              color='secondary'
              onClick={resetAll}
            >
              {t('common.reload')}
            </Button>
          </Styled.ResetForm>
        </Styled.Container>
      )
    }

    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  resetAll: () => {
    dispatch(resetAllAction())
    window.location.reload(false)
  },
})

export default connect(undefined, mapDispatchToProps)(withTranslation()(ErrorBoundary))
