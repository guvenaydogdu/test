import { FC, ReactElement } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { colors } from '../../theme'

interface IGLTitleLineProps {
  title: string
  message?: string | ReactElement
  size?: 'medium'
  children?: ReactElement
}

export const GLTitleLine: FC<IGLTitleLineProps> = ({ title, message, size, children }) => {
  const classes = useStyles()
  return (
    <Typography className={`${classes.title} ${size == 'medium' && classes.titleMedium}`}>
      <span className="title">{title}</span>
      {message && <span className="message">{message}</span>}
      {children && children}
    </Typography>
  )
}

const useStyles = makeStyles(() => ({
  title: {
    position: 'relative',
    fontWeight: 800,
    fontSize: '18px !important',
    lineHeight: '150%',
    fontFeatureSettings: "'pnum' on, 'lnum' on",
    color: colors.sea,
    padding: '0 0 15px 0',
    marginBottom: '32px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& .message': {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '16px',
      textAlign: 'right',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.iron,
    },

    '&:before': {
      content: "''",
      position: 'absolute',
      left: 0,
      top: '100%',
      display: 'block',
      border: 'none',
      borderBottom: `1px solid ${colors.sea}`,
      margin: 0,
      width: '100%',
    },
  },
  titleMedium: {
    fontSize: '14px !important',
    lineHeight: '16px',
  },
}))
