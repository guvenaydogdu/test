import React, { FC, ReactElement, useState } from 'react'
import Image from 'next/image'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  IconButton,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  FilledInput,
  Select,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from '@material-ui/core'
import { colors } from '../../theme'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import InputMask from 'react-input-mask'
interface IFormInputItemProps {
  label: string
  value: string
  icon?: string
  error?: boolean
  onChange: () => void
  title?: string
}

export const GLInput: FC<IFormInputItemProps> = ({
  label,
  value,
  icon,
  error,
  onChange,
  title,
}) => {
  const classes = useStyles()

  return (
    <>
      {title && <span className={classes.title}>{title}</span>}
      <FormControl fullWidth className={`${classes.formItemIcon} ${classes.margin}`}>
        <InputLabel htmlFor="form-item">
          {icon && <Image src={icon} alt="icon" width="16px" height="16px" />}
        </InputLabel>
        <TextField
          id="form-item"
          label={label}
          variant="filled"
          onChange={onChange}
          value={value}
          error={error}
        />
      </FormControl>
    </>
  )
}
export const GLPhoneInput: FC<IFormInputItemProps> = ({
  label,
  value,
  icon,
  error,
  onChange,
  title,
}) => {
  const classes = useStyles()

  return (
    <>
      {title && <span className={classes.title}>{title}</span>}
      <FormControl fullWidth className={`${classes.formItemIcon} ${classes.margin}`}>
        <InputLabel htmlFor="form-item">
          {icon && <Image src={icon} alt="icon" width="16px" height="16px" />}
        </InputLabel>
        <InputMask mask="(599) 999 99 99" value={value} onChange={onChange}>
          {(inputProps: any) => {
            return (
              <TextField
                {...inputProps}
                type="tel"
                id="form-item"
                label={label}
                variant="filled"
                onChange={inputProps.onChange}
                value={inputProps.value}
                error={error}
              />
            )
          }}
        </InputMask>
      </FormControl>
    </>
  )
}

export const GLInputPassword: FC<IFormInputItemProps> = ({
  label,
  value,
  error,
  onChange,
  title,
}) => {
  const classes = useStyles()
  const [isSecure, setIsSecure] = useState<boolean>(true)
  const handleClickShowPassword = () => {
    setIsSecure((prev) => !prev)
  }

  return (
    <>
      {title && <span className={classes.title}>{title}</span>}

      <FormControl
        fullWidth
        className={`${classes.formItemIconPassword} ${classes.margin}`}
        variant="filled"
      >
        <InputLabel htmlFor="form-item-password">{label}</InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type={isSecure ? 'password' : 'text'}
          value={value}
          onChange={onChange}
          error={error}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {isSecure ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  )
}

interface ISelectData {
  id: number
  label: string
}
interface ISelectInputProps {
  data: ISelectData[] | undefined
  label: string
  value: string | boolean
  icon?: string
  error?: boolean
  onChange: () => void
}

export const GLSelect: FC<ISelectInputProps> = ({ data, label, value, error, onChange }) => {
  const classes = useStyles()
  return (
    <FormControl fullWidth variant="filled" className={`${classes.formItem} ${classes.margin}`}>
      <InputLabel htmlFor="filled-label-native-simple">{label}</InputLabel>
      <Select native value={value} onChange={onChange} error={error}>
        <option aria-label="None" value="" />
        {data?.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          )
        })}
      </Select>
    </FormControl>
  )
}

interface IGLSelectFilterData {
  id: number
  label: string
}
interface IGLSelectFilterProps {
  data: IGLSelectFilterData[] | undefined
  label?: string
  value: number
  onChange: (event: any) => void
}
export const GLSelectFilter: FC<IGLSelectFilterProps> = ({ data, value, onChange }) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.glSelectFilter}>
      {/* <InputLabel id="glSelectFilterLabel">{label}</InputLabel> */}
      <Select labelId="glSelectFilterLabel" id="glSelectFilter" value={value} onChange={onChange}>
        {data?.map((item) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              {item.label}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

const GreenCheckbox = withStyles({
  root: {
    color: colors.grayMedium,
    '&$checked': {
      color: colors.sea,
    },
  },
  checked: {},
})((props: { checked: boolean; onChange: any }) => <Checkbox color="default" {...props} />)

interface ICheckBoxInputProps {
  label: ReactElement | string
  checked: boolean
  error?: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}

export const GLCheckBox: FC<ICheckBoxInputProps> = ({ label, checked, onChange, disabled }) => {
  const classes = useStyles()
  return (
    <FormControlLabel
      className={classes.checkBox}
      disabled={disabled ? disabled : false}
      control={
        <GreenCheckbox checked={checked} onChange={(evt: any) => onChange(evt.target.checked)} />
      }
      label={label}
    />
  )
}

interface IGLTextareaProps {
  label?: string
  value: string
  rows?: number
  onChange: () => void
}

export const GLTextArea: FC<IGLTextareaProps> = ({ label }) => {
  const classes = useStyles()

  return (
    <TextField
      id="textarea"
      label={label}
      placeholder="Placeholder"
      variant="filled"
      multiline
      rows={4}
      className={classes.textarea}
    />
  )
}

const useStyles = makeStyles(() => ({
  margin: {
    margin: '0 0 16px 0',
  },
  formItem: {
    marginBottom: '16px',

    '& > .MuiInputLabel-root': {
      marginLeft: '10px',
    },

    '& > .MuiFilledInput-root': {
      borderRadius: '10px',
      // backgroundColor: 'transparent',
      border: `1px solid ${colors.grayMedium}`,
      backgroundColor: colors.white,

      '& .MuiInputBase-input': {
        padding: '23px 36px 7px 22px',
      },

      '&.Mui-focused': {
        borderColor: colors.sea,
      },

      '&.Mui-error': {
        borderColor: colors.danger,
      },

      '&::before, &::after': {
        display: 'none',
      },
    },
  },
  formItemIcon: {
    marginBottom: '16px',

    '& > .MuiInputLabel-root': {
      marginLeft: '10px',
      marginTop: '-6px',
    },

    '& > .MuiTextField-root': {
      '& .MuiInputLabel-root': {
        paddingLeft: '36px',
        marginTop: '-2px',
      },

      '& .MuiFilledInput-root': {
        borderRadius: '10px',
        backgroundColor: 'transparent',
        border: `1px solid ${colors.grayMedium}`,

        '& .MuiInputBase-input': {
          padding: '23px 12px 7px 36px',
        },

        '&.Mui-focused': {
          borderColor: colors.sea,
        },

        '&.Mui-error': {
          borderColor: colors.danger,
          background: "url('/images/icon-error.svg') no-repeat 95% 50%",
        },

        '&::before, &::after': {
          display: 'none',
        },
      },
    },
  },
  formItemIconPassword: {
    marginBottom: '16px',

    '& > .MuiInputLabel-root': {
      paddingLeft: '36px',
      marginTop: '-2px',
    },

    '& > .MuiFilledInput-root': {
      borderRadius: '10px',
      backgroundColor: 'transparent',
      border: `1px solid ${colors.grayMedium}`,
      background: "url('/images/icon-password.svg') no-repeat center left 10px",

      '& > .MuiFilledInput-input': {
        padding: '23px 12px 7px 36px',
      },

      '&.Mui-focused': {
        borderColor: colors.sea,
      },

      '&.Mui-error': {
        borderColor: colors.danger,
        paddingRight: 0,

        '& .MuiInputAdornment-root': {
          alignItems: 'center',
          width: '20px',
          height: '20px',
          margin: '0 13px 0 0',
          background: "url('/images/icon-error.svg') no-repeat center center",

          '& button': {
            display: 'none',
          },
        },
      },

      '&::before, &::after': {
        display: 'none',
      },
    },
  },
  checkBox: {
    alignItems: 'flex-start',
    margin: 0,

    '& > .MuiIconButton-root': {
      '& .MuiSvgIcon-root': {
        width: '20px',
        height: '20px',
      },
    },
    '& > .MuiFormControlLabel-label': {
      fontSize: '12px',
      fontWeight: '400',
      padding: '10px 0 0 0',
    },
  },
  glSelectFilter: {
    minWidth: 160,

    '& .MuiInputBase-root': {
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '16px',
      textAlign: 'center',

      '&.Mui-focused': {
        backgroundColor: 'transparent',
      },
    },
  },
  title: {
    display: 'inline-block',
    marginBottom: '16px',
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: colors.grayMedium,
  },
  textarea: {
    display: 'flex',
    backgroundColor: colors.white,
    border: `1px solid ${colors.grayMedium}`,
    boxSizing: 'border-box',
    borderRadius: '10px',

    '& > label': {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '16px',
    },

    '& .MuiInputBase-multiline': {
      backgroundColor: 'transparent',

      '&:before, &:after': {
        display: 'none',
      },
    },
  },
}))
