import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from '@material-ui/core'

import * as Styled from './Dialog.styles'

const Dialog = ({ open, title, content, onCancel: handleCancel, onOk: handleOk }) => {
  const { t } = useTranslation()

  return (
    <Styled.Dialog
      open={open}
    >
      {title && (
        <Styled.DialogTitle>
          {title}
        </Styled.DialogTitle>
      )}
      <Styled.DialogContent>
        {content}
      </Styled.DialogContent>
      <Styled.DialogActions>
        <Button
          onClick={handleCancel}
        >
          {t('common.cancel')}
        </Button>
        <Button
          onClick={handleOk}
        >
          {t('common.ok')}
        </Button>
      </Styled.DialogActions>
    </Styled.Dialog>
  )
}

Dialog.defaultProps = {
  content: null,
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
}

export { Dialog }
