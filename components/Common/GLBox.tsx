import { FC } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import { classNames } from '../../utils/styles'
import { colors } from '../../theme'

interface IGLBoxProps {
  shadow?: boolean
}

export const GLBox: FC<IGLBoxProps> = ({ children, shadow }) => {
  const classes = useStyles()

  return <Box className={classNames([classes.glBox, shadow && classes.shadow])}>{children}</Box>
}

const useStyles = makeStyles(() => ({
  glBox: {
    backgroundColor: colors.white,
    borderRadius: '10px',
    padding: '16px 20px',
    marginBottom: '32px',
  },
  shadow: {
    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)',
  },
}))
