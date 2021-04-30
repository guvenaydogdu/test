import React, { FC, ReactElement } from 'react'
import { colors } from '../../../theme'
import { makeStyles, FormControl, Input, InputAdornment, IconButton } from '@material-ui/core'

interface IGLInputProps {
  error?: boolean
  label?: string
  placeholder?: string
  labelIcon?: ReactElement
  startIcon?: ReactElement
  endIcon?: ReactElement
  type?: string
  onChange?: (...event: any[]) => void
  onClick?: () => void
  onFocus?: () => void
  value?: string | null
  defaultValue?: string
  disabled?: boolean
}
export const GLInput: FC<IGLInputProps> = ({
  error,
  label,
  placeholder,
  startIcon,
  endIcon,
  labelIcon,
  type,
  onChange,
  onClick,
  value,
  disabled,
  defaultValue,
}) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formInput}>
      {label && (
        <label>
          {label} {labelIcon && labelIcon}
        </label>
      )}
      <Input
        disabled={disabled}
        type={type}
        error={error}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        startAdornment={
          startIcon && (
            <IconButton>
              <InputAdornment position="start">{startIcon}</InputAdornment>
            </IconButton>
          )
        }
        endAdornment={
          endIcon && (
            <IconButton>
              <InputAdornment position="end">{endIcon}</InputAdornment>
            </IconButton>
          )
        }
        onChange={onChange}
        onClick={onClick}
      />
    </FormControl>
  )
}

const useStyles = makeStyles(() => ({
  formInput: {
    display: 'block',

    '& > label': {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: '150%',
      color: colors.grayMedium,
      paddingBottom: '16px',

      '& > .MuiIconButton-root': {
        marginLeft: '16px',
      },
    },

    '& .MuiInput-root': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      border: `1px solid ${colors.grayMedium}`,
      borderRadius: '10px',
      margin: 0,

      '&:before, &:after': {
        display: 'none',
      },

      '& .MuiInput-input': {
        fontWeight: 700,
        fontFeatureSettings: "'pnum' on, 'lnum' on",
        color: colors.black,
        padding: '.99999999rem 1.142rem',
        boxSizing: 'border-box',
        height: 'auto',
        width: '100%',
      },

      '& svg': {
        width: '24px',
        height: '24px',
        fill: colors.grayMedium,
      },

      '&.MuiInputBase-adornedEnd': {
        '& > .MuiIconButton-root': {
          padding: '0',
          margin: '10px 16px 10px 8px',
        },

        '& .MuiInputBase-inputAdornedEnd': {
          paddingRight: 0,
        },
      },

      '&.MuiInputBase-adornedStart': {
        '& > .MuiIconButton-root': {
          padding: '0',
          margin: '10px 8px 10px 16px',
        },

        '& .MuiInputBase-inputAdornedStart': {
          paddingLeft: 0,
        },
      },

      '&.Mui-focused': {
        borderColor: colors.sea,
      },

      '&.Mui-error': {
        borderColor: colors.danger,
      },
    },
  },
}))
