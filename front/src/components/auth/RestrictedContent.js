import PropTypes from 'prop-types'
import { useIsAuthenticated } from 'hooks/useIsAuthenticated'

const RestrictedContent = ({ children, fallback, ...rest }) => {
  const isAllowed = useIsAuthenticated()

  return isAllowed
    ? typeof children === 'function'
      ? children(rest)
      : children
    : fallback
}

RestrictedContent.defaultProps = {
  children: null,
  fallback: null,
}

RestrictedContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  fallback: PropTypes.node,
}

export default RestrictedContent
