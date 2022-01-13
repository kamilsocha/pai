import { useSelector } from 'react-redux'

const useIsAuthenticated = () => {
  const loggedIn = useSelector((state) => state.root.auth.loggedIn)
  return loggedIn
}

export { useIsAuthenticated }
