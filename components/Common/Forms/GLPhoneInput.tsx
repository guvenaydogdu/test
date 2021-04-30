import React, { FC, ReactElement } from 'react'
import InputMask from 'react-input-mask'
import { FormControl, makeStyles, TextField } from '@material-ui/core'
import { colors } from '../../../theme'

interface IGLPhoneInputProps {
  mask?: string
  error?: boolean
  label: string
  labelIcon?: ReactElement
  placeholder?: string
  onChange: () => void
  value: string
}

export const GLPhoneInput: FC<IGLPhoneInputProps> = ({
  mask = '(599) 999 99 99',
  error,
  label,
  labelIcon,
  placeholder,
  onChange,
  value,
}) => {
  const classes = useStyle()

  return (
    <FormControl className={classes.formInput}>
      {label && (
        <label>
          {label} {labelIcon && labelIcon}
        </label>
      )}
      <InputMask mask={mask} value={value} onChange={onChange} maskPlaceholder={placeholder}>
        {(inputProps: any) => {
          return (
            <TextField
              {...inputProps}
              type="tel"
              id="form-item"
              label={label}
              onChange={inputProps.onChange}
              value={inputProps.value}
              error={error}
            />
          )
        }}
      </InputMask>
    </FormControl>
  )
}

const useStyle = makeStyles({
  formInput: {
    display: 'block',

    '& > label': {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 800,
      lineHeight: '150%',
      color: colors.grayMedium,
      paddingBottom: '16px',

      '& > .MuiIconButton-root': {
        marginLeft: '16px',
      },
    },

    '& .MuiTextField-root': {
      display: 'block',

      '& .MuiInputBase-root': {
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
          fontWeight: 400,
          color: colors.black,
          letterSpacing: '0.1em',
          fontFeatureSettings: "'pnum' on, 'lnum' on",
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

        '&.Mui-error': {
          borderColor: colors.danger,
        },
      },
    },
  },
})
