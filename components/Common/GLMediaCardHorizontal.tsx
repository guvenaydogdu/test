import React, { FC } from 'react'
import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core'
import { colors } from '../../theme'
import ChevronRight from '@material-ui/icons/ChevronRight'
import { IconCircle } from './IconCircle'
import { GLIconStar } from '../Common/GLIcons'
import Link from 'next/link'

interface IGLMediaCardHorizontalProp {
  title: string
  description?: string
  linkTitle: string
}

export const GLMediaCardHorizontal: FC<IGLMediaCardHorizontalProp> = ({
  title,
  description,
  linkTitle,
}) => {
  const classes = useStyles()

  return (
    <Card className={classes.mediaHorizontal}>
      <CardActionArea disableRipple>
        <CardMedia image="/images/special-service.jpg" title={title}>
          <IconCircle icon={<GLIconStar />} bgColor={colors.blueMedium} />
          <GLIconStar />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.cardDescription}
          >
            {description}
          </Typography>
          <Link href={'/services/special-service'}>
            <Button
              aria-label="media-card"
              size="small"
              color="primary"
              className={classes.cardLink}
            >
              <>
                <span>{linkTitle}</span>
                <ChevronRight />
              </>
            </Button>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const useStyles = makeStyles(() => ({
  mediaHorizontal: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '320px',
    borderRadius: '10px',
    boxShadow: 'none',
    border: 'none',
    margin: '66px 0',
    padding: 0,

    '& .MuiCardActionArea-root': {
      display: 'flex',

      '& .MuiCardMedia-root': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexBasis: '50%',
        height: '100%',
        minHeight: '100px',

        '& > svg': {
          display: 'none',
        },
      },

      '& .MuiCardContent-root': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: '100%',
        width: '50%',
        padding: '32px 36px',
        border: `1px solid ${colors.grayLight}`,
      },
    },
  },
  cardTitle: {
    fontWeight: 800,
    fontSize: '18px',
    lineHeight: '150%',
    color: colors.black,
    margin: '8px 0 32px 0',
  },
  cardDescription: {
    flexBasis: '100%',
    fontSize: '16px',
    lineHeight: '150%',
    color: colors.grayMedium,
  },
  cardLink: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 700,
    opacity: '.5',
    color: colors.blueMedium,
    textTransform: 'none',
    padding: 0,
  },
}))
