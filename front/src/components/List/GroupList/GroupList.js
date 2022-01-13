import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { GroupListItem } from '../ListItem/GroupListItem/GroupListItem'
import * as CommonStyled from '../List.styles'
import * as Styled from './GroupList.styles'

const GroupList = ({ groupItems }) => {
  const { t } = useTranslation()

  return (
    <CommonStyled.VerticalList>
      {groupItems.length ? (
        groupItems.map((groupItem) => (
          <GroupListItem key={groupItem.id} groupItem={groupItem} />
        ))
      ) : (
        <Styled.NoGroupsMessage>
          {t('mapSection.grouping.noGroups')}
        </Styled.NoGroupsMessage>
      )}
    </CommonStyled.VerticalList>
  )
}

GroupList.defaultProps = {
  groupItems: [],
}

GroupList.propTypes = {
  groupItems: PropTypes.array,
}

export { GroupList }
