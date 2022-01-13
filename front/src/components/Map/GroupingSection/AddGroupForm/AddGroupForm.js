import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { TextField, Typography } from '@material-ui/core'

import { addGroupItemAction } from 'store/appReducer'
import * as Styled from './AddGroupForm.styles'

const AddGroupForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    values: { groupName: groupNameValue },
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      groupName: '',
    },
    onSubmit: ({ groupName }, { resetForm }) => {
      dispatch(addGroupItemAction(groupName))
      resetForm()
    },
  })

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.FormContentContainer>
        <Styled.TextField
          size='small'
          id='groupName'
          name='groupName'
          variant='outlined'
          label={t('mapSection.grouping.groupName')}
          value={groupNameValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Styled.Button
          size='small'
          type='submit'
          variant='contained'
        >
          {t('mapSection.grouping.addGroup')}
        </Styled.Button>
      </Styled.FormContentContainer>
      <Typography>
        {t('mapSection.grouping.helperText')}
      </Typography>
    </Styled.Form>
  )
}

export { AddGroupForm }
