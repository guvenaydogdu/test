import React, { FC } from 'react'
import { makeStyles, Switch, FormControlLabel, Theme } from '@material-ui/core'
import { colors } from '../../theme'
import { GLIconTickCircle, GLIconCancelCircle, GLIconInfo } from './GLIcons'
import { GLTooltip } from './GLTooltip'

interface StyleProps {
  color?: string
}

interface IGLSwitchProps {
  label?: string
  labelPosition?: string
  tooltiptext?: string
  color?: string
  value: boolean
  onChange: (...event: any[]) => void
}

export const GLSwitch: FC<IGLSwitchProps> = ({
  label,
  labelPosition,
  tooltiptext,
  color = colors.sea,
  value,
  onChange,
}) => {
  const classes = useStyles({ color })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onChange(checked)
  }

  return (
    <div
      className={`
                ${classes.customSwitch}
                ${labelPosition == 'top' && classes.labelTop}
                ${labelPosition == 'right' && classes.labelRight}
                ${labelPosition == 'bottom' && classes.labelBottom}
                ${labelPosition == 'left' && classes.labelLeft}
            `}
    >
      <label>{label}</label>
      <FormControlLabel
        label=""
        control={
          <>
            <Switch
              icon={<GLIconCancelCircle />}
              checkedIcon={<GLIconTickCircle />}
              focusVisibleClassName={classes.focusVisible}
              onChange={handleChange}
              checked={value}
              disableRipple
              classes={{ root: classes.SwitchRoot }}
            />
            {tooltiptext && (
              <span className={classes.iconInfoWrapper}>
                <GLTooltip title={tooltiptext}>
                  <GLIconInfo />
                </GLTooltip>
              </span>
            )}
          </>
        }
      />
    </div>
  )
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  customSwitch: {
    display: 'inline-flex',
    alignItems: 'flex-start',

    '& .MuiFormControlLabel-root': {
      margin: 0,
      padding: 0,
    },

    '& > label': {
      fontSize: '14px',
      fontWeight: 800,
      lineHeight: '150%',
      color: colors.grayMedium,
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

    '& > label': {
      marginLeft: '16px',
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
  root: {
    width: 80,
    height: 32,
    padding: 0,
  },
  iconInfoWrapper: () => ({
    marginLeft: '16px',

    // '&:hover svg': {
    //   fill: props.color,
    // },
  }),
  SwitchRoot: (props) => ({
    width: '80px',
    height: '32px',
    padding: '0',

    '& > .MuiButtonBase-root': {
      opacity: 1,
      padding: '1px',
      backgroundColor: colors.grayMedium,

      '& .MuiIconButton-label': {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: colors.danger,

        '& svg': {
          width: '12px',

          '& path': {
            fill: colors.white,
          },
        },
      },

      '& + .MuiSwitch-track': {
        opacity: 1,
        borderRadius: '50px',
        backgroundColor: colors.grayLight,
      },

      '&.Mui-checked': {
        transform: 'translateX(48px)',

        '& .MuiIconButton-label': {
          '& svg': {
            width: '32px',

            '& path': {
              fill: props.color,
            },
          },
        },

        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: props.color,
        },
      },
    },
  }),
}))
