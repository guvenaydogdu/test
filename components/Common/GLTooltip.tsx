import React, { FC } from 'react'
import { makeStyles, Tooltip, IconButton, Theme } from '@material-ui/core'
import { colors } from './../../theme'

interface StyleProp {
  color?: string
}

interface IGLTooltip {
  placement?: string
  title: string
  color?: string
}

export const GLTooltip: FC<IGLTooltip> = ({ title, color = colors.sea, children }) => {
  const classes = useStyles({ color })

  return (
    <Tooltip title={title} placement="top" classes={{ tooltip: classes.tooltip }}>
      <IconButton className={classes.iconInfo}>{children}</IconButton>
    </Tooltip>
  )
}

const useStyles = makeStyles<Theme, StyleProp>(() => ({
  iconInfo: (props) => ({
    width: '24px',
    padding: '2px',

    '& svg': {
      width: '16px',
      height: '16px',
      fill: colors.grayMedium,
    },

    '&:hover': {
      '& svg': {
        fill: props.color,
      },
    },
  }),
  tooltip: (props) => ({
    backgroundColor: props.color,
    color: colors.white,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '26px',
    padding: '16px 30px',
    maxWidth: '250px',
    textShadow: 'none',
    margin: '0 0 10px 0',

    '&:after': {
      content: '""',
      position: 'absolute',
      left: 'calc(50% - 10px)',
      top: 'calc(100% - 10px)',
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderTop: `10px solid ${props.color}`,
    },
  }),
}))
