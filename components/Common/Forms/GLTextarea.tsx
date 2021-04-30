import React, { FC, ReactElement } from 'react'
import { colors } from '../../../theme'
import { makeStyles, TextField } from '@material-ui/core'

interface IGLTextareaProps {
  label?: string
  placeholder?: string
  labelIcon?: ReactElement
  icon?: ReactElement
  onChange: (...event: any[]) => void
  value?: string
  error?: boolean
}
export const GLTextArea: FC<IGLTextareaProps> = ({
  label,
  placeholder,
  labelIcon,
  value,
  onChange,
  error,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.formTextarea}>
      {label && (
        <label>
          {label} {labelIcon && labelIcon}
        </label>
      )}
      <TextField
        label=""
        multiline
        rows={4}
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  formTextarea: {
    display: 'flex',
    flexDirection: 'column',

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
      '& .MuiInputBase-root': {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        border: `1px solid ${colors.grayMedium}`,
        borderRadius: '10px',
        margin: 0,

        '&:before, &:after, & fieldset': {
          display: 'none',
        },

        '&.Mui-focused': {
          borderColor: colors.sea,
        },

        '&.Mui-error': {
          borderColor: colors.danger,
        },
      },
    },
  },
}))
