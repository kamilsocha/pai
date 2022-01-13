import React, { forwardRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { ListItemText, ListItemIcon } from '@material-ui/core'

import * as Styled from './styles'

const NavigationListItem = ({ to, name, selected, icon }) => {
  /* eslint-disable */
  const renderLink = useMemo(() => to ? (
    forwardRef((itemProps, ref) => (<RouterLink to={to} ref={ref} {...itemProps} />))
  ) : 'div', [to])
  /* eslint-enable */

  return (
    <Styled.ListItem
      button
      selected={selected}
      component={renderLink}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={name} />
    </Styled.ListItem>
  )
}

NavigationListItem.defaultProps = {
  icon: null,
}

NavigationListItem.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  icon: PropTypes.node,
}

export { NavigationListItem }
