import { FC } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import { colors } from '../../theme'

interface IFilterAreaProps {
  title: string
}

export const GLFilterArea: FC<IFilterAreaProps> = ({ title, children }) => {
  const classes = useStyles()

  return (
    <Box className={classes.glFilterArea}>
      <h4>{title}</h4>
      {children}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  glFilterArea: {
    padding: '0',

    '& h4': {
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '150%',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.sea,
      margin: '0 0 16px 0',
      padding: '16px 0 15px 0',
      borderBottom: `1px solid ${colors.sea}`,
    },
  },
}))
