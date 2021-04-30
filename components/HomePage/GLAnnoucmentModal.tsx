import { makeStyles, Typography } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { IAnnouncementResponse } from '../../interfaces/Announcement'
import { colors } from '../../theme'
import { GLModal } from '../Common/GLModal'

interface IAnnouncementModalProps {
  data: IAnnouncementResponse
}

const GLAnnoucmentModal: FC<IAnnouncementModalProps> = ({ data }) => {
  const classes = useStyles()
  const [status, setStatus] = useState<boolean>(data.isSuccess ? true : false)
  const handelModal = () => {
    setStatus((prev) => !prev)
  }
  return (
    <GLModal
      closeButton={true}
      closeButtonColor={colors.iron}
      maxWidth="730px"
      statusModal={status}
      handleModalChange={handelModal}
    >
      <div className={classes.infoModalBody}>
        <Typography variant="h6">{data?.data?.title}</Typography>
        <Typography>{data?.data?.body}</Typography>
      </div>
    </GLModal>
  )
}
export default GLAnnoucmentModal

const useStyles = makeStyles(() => ({
  infoModalBody: {
    '& h6': {
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '150%',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      margin: '0 0 24px 0',
    },
    '& p': {
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '150%',
    },
  },
}))
