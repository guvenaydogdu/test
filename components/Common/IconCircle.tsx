import React, { FC } from 'react'
import { makeStyles, Theme, Box } from '@material-ui/core'
import { colors } from '../../theme'

interface IIconCircle {
  icon: any
  bgColor: any
}

export interface StyleProps {
  bgColor?: string
}

export const IconCircle: FC<IIconCircle> = ({ icon, bgColor }) => {
  const classes = useStyles({ bgColor })

  return <Box className={classes.iconStyle}>{icon}</Box>
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  iconStyle: (props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '96px',
    height: '96px',
    backgroundColor: props.bgColor,
    border: `2px solid ${colors.white}`,
    borderRadius: '50%',
    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)',

    '& svg': {
      width: '50%',
      height: 'auto',

      '& path': {
        fill: colors.white,
      },
    },
  }),
}))
