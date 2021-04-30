import { FC } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { colors } from '../../theme'

interface IGLTitleHalfLineProps {
  title: string
}

export const GLTitleHalfLine: FC<IGLTitleHalfLineProps> = ({ title }) => {
  const classes = useStyles()
  return <Typography className={classes.title}>{title}</Typography>
}

const useStyles = makeStyles(() => ({
  title: {
    position: 'relative',
    fontWeight: 800,
    fontSize: '18px',
    lineHeight: '150%',
    fontFeatureSettings: "'pnum' on, 'lnum' on",
    color: colors.sea,
    padding: '0 0 15px 0',
    marginBottom: '32px',

    '&:before': {
      content: "''",
      position: 'absolute',
      left: 0,
      top: '100%',
      display: 'block',
      border: 'none',
      borderBottom: `1px solid ${colors.sea}`,
      margin: 0,
      minWidth: '215px',
    },
  },
}))
