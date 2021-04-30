import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { colors } from '../../theme'
import { GLIconPhoto } from '../Common/GLIcons'

interface IGLProfileImage {
  image: string
  name?: string
  company: string
}

export const GLProfileImage: FC<IGLProfileImage> = ({ image, name, company }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Card className={classes.profileCard}>
      <CardActionArea>
        <CardMedia image={image} title={name}>
          <span>
            <GLIconPhoto color={colors.white} />
          </span>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {t('hello')}, <strong>{name}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {company}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const useStyles = makeStyles(() => ({
  profileCard: {
    borderRadius: 0,
    textAlign: 'center',
    backgroundColor: 'transparent',
    boxShadow: 'none',

    '& .MuiCardMedia-root': {
      position: 'relative',
      overflow: 'hidden',
      width: '96px',
      height: '96px',
      border: `2px solid ${colors.white}`,
      borderRadius: '50%',
      boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)',

      '& span': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        height: '50%',
        backgroundColor: colors.iron,
        transition: 'all .2s ease',

        '& svg': {
          width: '18px',
          height: '18px',
        },
      },
    },

    '&:hover': {
      '& .MuiCardMedia-root': {
        '& span': {
          top: '50%',
        },
      },
    },

    '& .MuiCardActionArea-root': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '2rem',

      '& .MuiCardContent-root': {
        padding: '24px 0 0 0',

        '& h2': {
          fontWeight: 'normal',
          fontSize: '14px',
          lineHeight: '186%',
          textAlign: 'center',
          color: colors.white,
          margin: 0,
        },

        '& p': {
          fontSize: '14px',
          lineHeight: '186%',
          textAlign: 'center',
          color: colors.air,
          margin: 0,
        },
      },
    },
  },
}))
