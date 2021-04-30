import { FC, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Fade, Backdrop } from '@material-ui/core'

interface IGLAdminModal {
  status: boolean
  handleCloseModal?: () => void
}

const GLAdminModal: FC<IGLAdminModal> = ({ children, status, handleCloseModal }) => {
  const rootRef = useRef(null)
  const classes = useStyles()
  return (
    <div className={classes.root} ref={rootRef}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={status}
        onClose={handleCloseModal ? handleCloseModal : undefined}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={status}>
          <div className={classes.paper}>{children}</div>
        </Fade>
      </Modal>
    </div>
  )
}

export default GLAdminModal

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 700,
    transform: 'translateZ(0)',
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '100%',
    maxWidth: 700,
    maxHeight: '90vh',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderWidth: '0',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
}))
