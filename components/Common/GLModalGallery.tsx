import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { colors } from '../../theme'
import { GLIconClose } from './GLIcons'

interface IProps {
  statusModal: boolean
  handleModalChange: (statusModal: boolean) => void
}

export const GLModalGallery: FC<IProps> = ({ children, statusModal, handleModalChange }) => {
  const classes = useStyles()

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
        <div className={classes.paper}>
          <span
            tabIndex={0}
            role="button"
            className="btn-close"
            onClick={() => handleModalChange(false)}
            onKeyDown={() => handleModalChange(false)}
          >
            <GLIconClose />
          </span>
          {children}
        </div>
      </Fade>
    </Modal>
  )
}

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    width: '90%',
    maxWidth: '906px',
    height: '536px',
    maxHeight: '90%',
    overflow: 'auto',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    padding: '0',
    borderRadius: '10px',
    outline: 'none',

    '& .btn-close': {
      position: 'absolute',
      zIndex: 5,
      right: '100px',
      top: '16px',
      borderRadius: '50%',
      width: '48px',
      height: '48px',
      backgroundColor: colors.black,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',

      '& svg': {
        width: '24px',
        height: '24px',
        fill: colors.white,
      },
    },
  },
}))
