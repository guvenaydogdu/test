import { FC, ReactElement } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import { colors } from '../../theme'

interface IFormWrapperProps {
  title: string
  startIcon?: ReactElement
  endIcon?: ReactElement
}

export const GLFormWrapper: FC<IFormWrapperProps> = ({ title, startIcon, endIcon, children }) => {
  const classes = useStyles()

  return (
    <Box className={classes.formWrapper}>
      <label>
        {startIcon && <span className={classes.startIcon}>{startIcon}</span>}
        {title}
        {endIcon && <span className={classes.endIcon}>{endIcon}</span>}
      </label>
      {children}
    </Box>
  )
}

const useStyles = makeStyles({
  formWrapper: {
    '& label': {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 800,
      fontSize: '14px',
      lineHeight: '16px',
      color: colors.grayMedium,
      padding: '0 0 16px 0',

      '& *': {
        margin: 0,
        padding: 0,
      },

      '& $startIcon': {
        margin: '0 16px 0 0',
        padding: 0,
      },

      '& $endIcon': {
        margin: '0 0 0 16px',
        padding: 0,
      },

      '& .MuiTypography-root': {
        margin: '0 0 0 9px',
        padding: 0,
      },
    },
  },
  startIcon: {},
  endIcon: {},
})
