import React from 'react'
import { useTranslation } from 'react-i18next'

import { GroupListContainer } from './GroupListContainer/GroupListContainer'
import { AddGroupForm } from './AddGroupForm/AddGroupForm'
import * as Styled from './GroupingSection.styles'

const GroupingSection = () => {
  const { t } = useTranslation()

  return (
    <>
      <Styled.Title>
        {t('mapSection.grouping.title')}
      </Styled.Title>
      <Styled.AddingCard>
        <Styled.InstructionText>
          {t('mapSection.grouping.instruction')}
        </Styled.InstructionText>
        <AddGroupForm />
      </Styled.AddingCard>
      <Styled.ListCard>
        <GroupListContainer />
      </Styled.ListCard>
    </>
  )
}

export { GroupingSection }
