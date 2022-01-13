import { useMemo, useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  const VisibilityToggle = useMemo(() => (
    <IconButton onClick={() => setShowPassword((prevState) => !prevState)}>
      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </IconButton>), [showPassword])

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: VisibilityToggle,
      }}
      {...props}
    />
  )
}

export { PasswordField }
