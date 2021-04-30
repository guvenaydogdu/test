import { Input, InputAdornment, makeStyles } from '@material-ui/core'
import React, { FC, ReactElement } from 'react'

interface IGLSearchBarLineProps {
  startIcon?: ReactElement
  endIcon?: ReactElement
  placeholder?: string
}

export const GLSearchBarLine: FC<IGLSearchBarLineProps> = ({ startIcon, endIcon, placeholder }) => {
  const classes = useStyles()

  return (
    <Input
      id="searchBarLine"
      onChange={() => {
        console.log('test')
      }}
      startAdornment={<InputAdornment position="end">{startIcon && startIcon}</InputAdornment>}
      endAdornment={<InputAdornment position="end">{endIcon && endIcon}</InputAdornment>}
      aria-describedby="searchBarLine-text"
      placeholder={placeholder}
      className={classes.searchBarLine}
    />
  )
}

const useStyles = makeStyles(() => ({
  searchBarLine: {
    '& #searchBarLine': {
      padding: '6px 8px',
    },

    '& .MuiInputAdornment-root': {
      '& svg': {
        width: '18px',
        height: '18px',
      },
    },
  },
}))
