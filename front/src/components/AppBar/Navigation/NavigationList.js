import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { NavigationListItem } from './NavigationListItem'
import * as Styled from './styles'

const NavigationList = ({ tabs }) => {
  const { t } = useTranslation()

  return (
    <Styled.List>
      {tabs ? (
        tabs.map(({ to, name, selected, icon }) => (
          <NavigationListItem
            key={to}
            to={to}
            name={t(name)}
            selected={selected}
            icon={icon}
          />
        ))
      ) : null}
    </Styled.List>
  )
}

NavigationList.defaultProps = {
  tabs: [],
}

NavigationList.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    icon: PropTypes.node,
  })),
}

export { NavigationList }
