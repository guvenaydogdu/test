import React, { FC, ReactElement } from 'react'
import { colors } from '../../../theme'
import { makeStyles, FormControlLabel, Checkbox, Theme } from '@material-ui/core'

interface StyleProps {
  color?: string
}

interface IGLCheckBoxProps {
  label?: string
  labelPosition?: 'top' | 'right' | 'bottom' | 'left'
  placeholder?: string
  labelIcon?: ReactElement
  icon?: ReactElement
  color?: string
  onChange: (...event: any[]) => void
  value: boolean
  error?: boolean
}
export const GLCheckBox: FC<IGLCheckBoxProps> = ({
  label,
  labelPosition = 'right',
  labelIcon,
  color = colors.sea,
  children,
  value,
  onChange,
  error = false,
}) => {
  const classes = useStyles({ color })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onChange(checked)
  }

  return (
    <div
      className={`
                ${classes.formCheckBox}
                ${labelPosition == 'top' && classes.labelTop}
                ${labelPosition == 'right' && classes.labelRight}
                ${labelPosition == 'bottom' && classes.labelBottom}
                ${labelPosition == 'left' && classes.labelLeft}
            `}
    >
      {label && (
        <label className="text">
          {label} {labelIcon && labelIcon}
        </label>
      )}
      <FormControlLabel
        className={classes.formControl}
        control={
          <Checkbox
            color="default"
            className={`${classes.customCheckBox} ${error && 'error'}`}
            checked={value}
            onChange={handleChange}
            name="checkedA"
          />
        }
        label={children}
      />
    </div>
  )
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  customCheckBox: (props) => ({
    color: colors.grayMedium,

    '&.Mui-checked': {
      color: props.color,
    },

    '&.error': {
      '& svg': {
        '& path': {
          color: colors.danger,
        },
      },
    },
  }),
  formControl: {
    marginRight: 0,
  },
  formCheckBox: {
    display: 'flex',
    flexDirection: 'column',

    '& .MuiFormControlLabel-root': {
      alignItems: 'flex-start',

      '& > .MuiTypography-root': {
        fontSize: '14px',
        color: colors.black,
        paddingTop: '10px',

        '& a': {
          color: colors.sea,
          textDecoration: 'underline',
        },
      },
    },
  },
  labelTop: {
    flexDirection: 'column',

    '& label': {
      paddingBottom: '16px',
    },
  },
  labelRight: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',

    '& .text': {
      margin: '0',
    },
  },
  labelBottom: {
    flexDirection: 'column-reverse',

    '& label': {
      paddingTop: '16px',
    },
  },
  labelLeft: {
    alignItems: 'center',

    '& > label': {
      marginRight: '16px',
    },
  },
}))
