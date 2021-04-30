import { FC, ReactElement } from 'react'
import {
  makeStyles,
  Theme,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  Button,
} from '@material-ui/core'
import { colors } from '../../theme'
import { classNames } from '../../utils/styles'
import { IconCircle } from './IconCircle'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Link from 'next/link'

interface IGLServiceProps {
  bgImage: string
  icon?: ReactElement
  color?: string
  title?: string
  pathname?: string
  slug?: string
}

export interface StyleProps {
  color?: string
}

export const GLServiceBox: FC<IGLServiceProps> = ({
  bgImage,
  icon,
  color,
  title,
  pathname,
  slug,
}) => {
  const classes = useStyles({ color })

  return (
    <Link href={{ pathname, query: { detail: slug } }}>
      <Card className={classes.ServiceBox}>
        <CardActionArea>
          <CardMedia image={bgImage} title={title}>
            {icon && <IconCircle icon={icon} bgColor={color} />}
          </CardMedia>
        </CardActionArea>
        {title && (
          <CardActions>
            <Button
              aria-label="card-button"
              className={classNames([classes.btn, classes.btnColor])}
              variant="contained"
              endIcon={<ChevronRightIcon />}
            >
              <span className="text">{title}</span>
            </Button>
          </CardActions>
        )}
      </Card>
    </Link>
  )
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  btnColor: (props) => ({
    backgroundColor: props.color,

    '&:hover': {
      backgroundColor: props.color,
    },
  }),
  ServiceBox: {
    borderRadius: '10px',
    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)',

    '& .MuiButtonBase-root': {
      '& .MuiCardMedia-root': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '248px',
      },
    },

    '& .MuiCardActions-root': {
      fontSize: '18px',
      lineHeight: '150%',
      fontWeight: 'bold',
      color: colors.white,
      padding: '0',
    },
  },
  btn: {
    display: 'flex',
    width: '100%',
    height: '88px',
    boxShadow: 'none',
    borderRadius: '0',

    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '18px',
      lineHeight: '150%',
      fontWeight: '700',
      textTransform: 'none',
      color: colors.white,

      '& .text': {
        width: '100%',
        textAlign: 'center',
      },

      '& .MuiButton-endIcon': {
        width: '30px',

        '& > svg': {
          fontSize: '28px',
        },
      },
    },
  },
}))
