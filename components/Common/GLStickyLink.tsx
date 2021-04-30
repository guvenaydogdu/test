import { FC } from 'react'
import { makeStyles } from '@material-ui/core'
import { GLIconBorderUp } from './GLIcons'
import { colors } from '../../theme'
import { GLButton } from './GLButton'

interface IGLStickyLinkProps {
  title: string
  onClick: () => void
}

export const GLStickyLink: FC<IGLStickyLinkProps> = ({ title, onClick }) => {
  const classes = useStyles()

  return (
    <div className={classes.stickyLink}>
      <GLButton
        buttonColor={colors.iron}
        buttonHoverColor={colors.ironHover}
        textColor={colors.white}
        onClick={onClick}
        type="button"
        variant="contained"
        text={title}
        endIcon={<GLIconBorderUp />}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  stickyLink: {
    position: 'fixed',
    right: 0,
    top: '40vh',
    display: 'inline-flex',
    height: '48px',
    transform: 'rotate(-90deg)',
    transformOrigin: 'bottom right',

    '& .MuiButtonBase-root': {
      borderRadius: '10px 10px 0 0',
      boxShadow: 'none',

      '& .MuiButton-label': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14px',
        lineHeight: '16.44px',
        fontWeight: '700',
        textTransform: 'none',

        '& .text': {
          width: '100%',
          textAlign: 'center',
        },

        '& .MuiButton-endIcon': {
          width: '20px',

          '& svg': {
            width: '9px',
            fill: colors.white,
          },
        },
      },
    },
  },
}))
