import { FC, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { IconCircle } from './IconCircle'
import { GLIconUp } from '../Common/GLIcons'
import { colors } from '../../theme'

const toTop = () => {
  if (window) window.scroll({ top: 0, left: 0, behavior: 'smooth' })
}

export const GLUp: FC = () => {
  const classes = useStyles()

  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {scrollPosition > 100 && (
        <IconButton className={classes.up} onClick={toTop}>
          <IconCircle icon={<GLIconUp />} bgColor={colors.sea} />
          <strong>Yukarı Çık</strong>
        </IconButton>
      )}
    </>
  )
}

const useStyles = makeStyles(() => ({
  up: {
    position: 'fixed',
    zIndex: 90,
    right: '30px',
    bottom: '30px',

    '& .MuiIconButton-label': {
      flexDirection: 'column',

      '& strong': {
        display: 'block',
        fontSize: '14px',
        lineHeight: '16px',
        textAlign: 'center',
        fontWeight: 700,
        color: colors.grayMedium,
        marginTop: '8px',
      },

      '& .MuiBox-root': {
        '& svg': {
          width: '26px',
        },
      },
    },
  },
}))
