import React, { FC, useState } from 'react'
import { makeStyles, withStyles, Switch, FormControlLabel } from '@material-ui/core'
import { colors } from '../../../theme'
import { GLIconTickCircle, GLIconCancelCircle, GLIconInfo } from '../GLIcons'
import { GLTooltip } from '../GLTooltip'

const SwitchCustom = withStyles((theme) => ({
  root: {
    width: 80,
    height: 32,
    padding: 0,
  },
  iconInfoWrapper: {
    marginLeft: '16px',
  },
  switchBase: {
    padding: 1,
    transform: 'translateX(2px)',

    '& svg': {
      width: '30px',
      height: '30px',
    },

    '&$checked': {
      transform: 'translateX(48px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: colors.sea,
        opacity: 1,
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  track: {
    borderRadius: 80 / 2,
    backgroundColor: colors.grayLight,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }: any) => {
  return (
    <>
      <Switch
        icon={<GLIconCancelCircle />}
        checkedIcon={<GLIconTickCircle />}
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
      {props?.tooltipText && (
        <span className={classes.iconInfoWrapper}>
          <GLTooltip title={props.tooltipText}>
            <GLIconInfo />
          </GLTooltip>
        </span>
      )}
    </>
  )
})

interface IGLSwitchProps {
  label?: string
  labelPosition?: string
  tooltipText?: string
}

export const GLSwitch: FC<IGLSwitchProps> = ({ label, labelPosition, tooltipText }) => {
  const classes = useStyles()
  const [state, setState] = useState({ checkedIMO: true })

  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.checked })
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
      {label && <label>{label}</label>}
      <FormControlLabel
        label=""
        control={
          <SwitchCustom
            checked={state.checkedIMO}
            onChange={handleChange}
            name="checkedIMO"
            tooltipText={tooltipText}
          />
        }
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
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
}))
