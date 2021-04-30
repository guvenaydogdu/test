import React, { FC } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import { colors } from '../../theme'

export const GLStepper: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.stepperWrapper}>
      <Box className={classes.stepper}>
        <span className={` ${classes.step} ${classes.stepCompleted}`}>
          <span>Arama Sonuçları</span>
        </span>
        <span className={` ${classes.step} ${classes.stepActive}`}>
          <span>Talep Detayları</span>
        </span>
        <span className={` ${classes.step}`}>
          <span>Talep Sonucu</span>
        </span>
      </Box>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  stepperWrapper: {
    padding: '0 0 32px 0',
  },
  stepper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grayLight,
    borderRadius: '50px',

    '& > *:first-child': {
      marginLeft: 0,
      paddingLeft: 0,

      '& span:before': {
        display: 'none',
      },
    },
  },
  step: {
    position: 'relative',
    width: '100%',
    fontSize: '14px',
    lineHeight: '16px',
    textAlign: 'center',
    color: colors.grayMedium,
    borderRadius: '50px',

    '& span': {
      display: 'block',
      padding: '16px 0',

      '&:before': {
        content: '""',
        position: 'absolute',
        left: '24px',
        top: '50%',
        margin: '-4px 0 0 0',
        display: 'block',
        width: '8px',
        height: '8px',
        opacity: '.5',
        borderRadius: '50%',
        backgroundColor: colors.grayMedium,
      },
    },
  },
  stepActive: {
    backgroundColor: colors.white,
    fontWeight: 800,
    color: colors.sea,
    marginLeft: '-38px',
    paddingLeft: '38px',
  },
  stepCompleted: {
    backgroundColor: colors.white,
    color: colors.grayMedium,
    fontWeight: 'normal',
    marginLeft: '-38px',
    paddingLeft: '38px',
  },
}))
