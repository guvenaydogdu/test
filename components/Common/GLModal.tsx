import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { IconButton, Paper } from '@material-ui/core'
import { GLIconClose } from './GLIcons'
import { colors } from '../../theme'

interface IStyleProps {
  isDemandForm: boolean
  maxWidth: string
  closeButtonColor?: string
}
interface IProps {
  isDemandForm?: boolean
  closeButton?: boolean
  closeButtonColor?: string
  maxWidth: string
  statusModal: boolean
  handleModalChange: (statusModal: boolean) => void
}

export const GLModal: FC<IProps> = ({
  isDemandForm = false,
  children,
  closeButtonColor,
  maxWidth,
  statusModal,
  handleModalChange,
}) => {
  const classes = useStyles({ isDemandForm, maxWidth, closeButtonColor })

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={statusModal}
      onClose={() => handleModalChange(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={statusModal}>
        <Paper className={`${classes.paper} ${isDemandForm && classes.isDemandForm}`}>
          {closeButtonColor && (
            <IconButton className={classes.modalClose} onClick={() => handleModalChange(false)}>
              <GLIconClose />
            </IconButton>
          )}
          {children}
        </Paper>
      </Fade>
    </Modal>
  )
}

const useStyles = makeStyles<Theme, IStyleProps>((theme) => ({
  paper: (props) => ({
    display: 'flex',
    alignItems: 'flex-start',
    maxWidth: props.maxWidth,
    position: 'relative',
    width: '100%',
    maxHeight: '85%',
    overflow: 'visible',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 5,
    outline: 'none',
    borderTopLeftRadius: props?.closeButtonColor ? 0 : 5,

    '& > .MuiIconButton-root': {
      position: 'absolute',
      right: '100%',
      top: 0,
      backgroundColor: props?.closeButtonColor,
      borderRadius: '5px 0 0 5px',

      '& .MuiIconButton-label': {
        '& svg': {
          width: '24px',
          height: '24px',
          fill: colors.white,
        },
      },
    },

    '& > div': {
      width: '100%',
      maxHeight: '65vh',
      overflow: 'auto',
      padding: '30px 48px',
    },

    '& .round-0': {
      borderRadius: 0,
    },
  }),
  isDemandForm: () => ({
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderRadius: '10px',
    overflow: 'hidden',

    '& > div': {
      padding: 0,
      maxHeight: '85vh',

      '& [class*="insidePage"]': {
        padding: 0,

        '& .MuiContainer-maxWidthLg': {
          maxWidth: 'none',
          paddingLeft: '15px',
          paddingRight: '15px',

          '& .MuiGrid-grid-xs-10': {
            maxWidth: '100%',
            flexBasis: '100%',
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,

            '& [class*="glBox"]': {
              margin: 0,
            },
          },
        },
      },
    },
  }),
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalClose: {},
}))
