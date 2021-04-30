import { FC } from 'react'
import { makeStyles, Box, Typography } from '@material-ui/core'
import { colors } from '../../theme'

interface IGLSectionTitle {
  title: string
  subTitle?: string
}

export const GLSectionTitle: FC<IGLSectionTitle> = ({ title, subTitle }) => {
  const classes = useStyles()

  return (
    <Box className={classes.sectionTitle}>
      <div>
        <Typography component="h1" gutterBottom>
          {title}
        </Typography>
        <hr />
        <Typography component="p" gutterBottom>
          {subTitle}
        </Typography>
      </div>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  sectionTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '48px',

    '& hr': {
      width: '100%',
      maxWidth: '400px',
      border: 'none',
      borderTop: `1px solid ${colors.grayMedium}`,
      margin: '16px auto 22px auto',
    },

    '& h1': {
      fontSize: '42px',
      fontWeight: 'bold',
      lineHeight: '49px',
      color: colors.black,
      margin: '0',
    },

    '& p': {
      fontSize: '18px',
      lineHeight: '120%',
      color: colors.grayMedium,
      margin: '0',
      maxWidth: '400px',
    },
  },
}))
