import { IconButton, InputAdornment } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React, { FC, useState } from 'react'
import { colors } from '../../../theme'
import { GLIconKey } from '../GLIcons'
import { GLInput } from './GLInput'

interface IGLPasswordInputProps {
  label?: string
}

export const GLPasswordInput: FC<IGLPasswordInputProps> = ({ label }) => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  })

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  return (
    <GLInput
      startIcon={<GLIconKey color={colors.sea} />}
      label={label}
      type={values.showPassword ? 'text' : 'password'}
      onChange={() => handleChange('password')}
      endIcon={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {values.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
  )
}
