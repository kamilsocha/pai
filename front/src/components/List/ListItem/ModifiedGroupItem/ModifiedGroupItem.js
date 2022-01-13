import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import * as Styled from './ModifiedGroupItem.styles'

const ModifiedGroupItem = ({ group }) => {
  const { t } = useTranslation()
  const { name, photoItems } = group

  return (
    <Styled.Card>
      <Styled.TopContainer>
        <Styled.Row>
          <Styled.Label>{t('common.name')}:</Styled.Label>
          <Typography>{name}</Typography>
        </Styled.Row>
        <Styled.Row>
          <Styled.Label>{t('common.items')}:</Styled.Label>
          <Typography>{photoItems?.length}</Typography>
        </Styled.Row>
      </Styled.TopContainer>
      <Styled.BottomContainer>
        <Styled.List>
          {photoItems.map(({ id, photo: { image } }) => (
            <Styled.Image key={id} src={image} />
          ))}
        </Styled.List>
      </Styled.BottomContainer>
    </Styled.Card>
  )
}

export { ModifiedGroupItem }
