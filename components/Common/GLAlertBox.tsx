import React, { FC, ReactElement } from 'react'
import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { colors } from '../../theme'

export interface StyleProps {
  titleColor?: string
  iconColor: string
}

interface IGLAlertBoxProps {
  icon: ReactElement
  iconColor: string
  title: string
  titleColor: string
}

export const GLAlertBox: FC<IGLAlertBoxProps> = ({
  icon,
  iconColor,
  title,
  titleColor,
  children,
}) => {
  const classes = useStyles({ titleColor, iconColor })

  return (
    <Box className={classes.alertBox}>
      <Box className={classes.alertBoxTitle}>
        {icon}
        <Typography>{title}</Typography>
      </Box>
      <Box className={classes.alertBoxBody}>{children}</Box>
    </Box>
  )
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  alertBoxTitle: (props) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: props.titleColor,
    padding: '10px 40px',
    minHeight: '66px',

    '& svg': {
      width: 'auto',
      height: '24px',
      fill: props.iconColor,
      marginRight: '12px',
    },

    '& .MuiTypography-root': {
      fontWeight: 800,
      fontSize: '18px',
      lineHeight: '150%',
      color: colors.white,
      fontFeatureSettings: "'pnum' on, 'lnum' on",
    },
  }),
  alertBoxBody: {
    backgroundColor: colors.white,
    padding: '40px',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 400,
  },
  alertBox: {
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '40px',
  },
}))
