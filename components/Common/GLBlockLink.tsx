import React, { FC } from 'react'
import { makeStyles, Theme, Box, Button } from '@material-ui/core'
import { IconCircle } from './IconCircle'
import { classNames } from '../../utils/styles'
import { colors } from '../../theme'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
interface IGLBLockLinkProps {
  icon: any
  bgColor?: string
  bgImage?: string
  title: string
  description?: string
  href: string
}

export interface StyleProps {
  bgColor?: string
}

export const GLBLockLink: FC<IGLBLockLinkProps> = ({
  icon,
  bgColor,
  bgImage,
  title,
  description,
  href,
}) => {
  const classes = useStyles({ bgColor })
  const { t } = useTranslation()
  return (
    <Box className={classNames([classes.boxLink, classes.bgColor])}>
      <IconCircle icon={icon} bgColor={bgColor} />
      <Box className={classes.boxLinkContent}>
        <h4 className={classes.color}>{title}</h4>
        <p>{description}</p>
        <div className="link">
          <Link href={href}>
            <Button aria-label="icon-link">
              <>
                <span className={classes.color}>{t('more')}</span>
                <ChevronRight className={classes.color} />
              </>
            </Button>
          </Link>
        </div>
      </Box>
      {bgImage && <img src={bgImage} alt="link" />}
    </Box>
  )
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  bgColor: (props) => ({
    backgroundColor: props.bgColor,
  }),
  color: (props) => ({
    color: props.bgColor,
  }),
  boxLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    marginTop: '50px',
    marginBottom: '56px',
    padding: '40px 32px 32px 32px',
    borderRadius: '5px',
    overflow: 'hidden',

    '& > *': {
      position: 'relative',
      zIndex: '2',
    },

    '& > img': {
      position: 'absolute',
      zIndex: '1',
      left: 0,
      bottom: 0,
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
    },

    '&:hover .link .MuiButtonBase-root': {
      opacity: '1',
    },
  },
  boxLinkContent: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    width: '100%',
    background: colors.white,
    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    marginTop: '32px',
    padding: '24px',

    '& h4': {
      fontWeight: 800,
      fontSize: '18px',
      lineHeight: '150%',
      margin: '0 0 32px 0',
    },

    '& p': {
      flexBasis: '125px',
      fontSize: '16px',
      lineHeight: '150%',
      color: colors.grayMedium,
      margin: '0 0 30px 0',
      overflow: 'hidden',
    },

    '& .link': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',

      '& .MuiButtonBase-root': {
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '16px',
        opacity: '.5',
        textDecoration: 'none',
        textTransform: 'none',
      },
    },
  },
}))
