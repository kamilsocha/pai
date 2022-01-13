import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@material-ui/core'

import { NAVIGATION_TABS } from 'constants/NavigationTabs'
import { useNavigationTabs } from 'hooks/useNavigationTabs'
import { PATHS } from 'routes/Routes'
import { useMutationLogout } from 'api/useMutationLogout'
import { signOutAction } from 'store/authReducer'
import { resetAllAction } from 'store/appReducer'

import { NavigationList } from './Navigation/NavigationList'
import * as Styled from './AppBar.styles'

const AppBar = () => {
  const loggedIn = useSelector((state) => state.root.auth.loggedIn)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const tabs = useNavigationTabs(NAVIGATION_TABS)

  const {
    mutate: logoutMutate,
  } = useMutationLogout({
    onSuccess: () => {
      dispatch(signOutAction())
      dispatch(resetAllAction())
    },
  })

  return (
    <Styled.AppBar position='static' color='default'>
      <Styled.Toolbar>
        <Typography variant='h6'>
          {t('title')}
        </Typography>
        {loggedIn && (
          <NavigationList tabs={tabs} />
        )}
        <Styled.ItemsContainer>
          {loggedIn ? (
            <Button type='button' onClick={logoutMutate}>{t('common.signOut')}</Button>
          ) : (
            <>
              <Button component={Link} to={PATHS.SIGN_IN}>{t('common.signIn')}</Button>
              <Button component={Link} to={PATHS.SIGN_UP}>{t('common.signUp')}</Button>
            </>
          )}
        </Styled.ItemsContainer>
      </Styled.Toolbar>
    </Styled.AppBar>
  )
}

export { AppBar }
