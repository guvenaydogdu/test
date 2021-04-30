import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Avatar, Card, CardHeader, Grid, IconButton, Box } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { GLModal } from '../Common/GLModal'
import { colors } from '../../theme'
import { GLButton } from '../Common/Forms/GLButtons'
import { GLTitleLine } from '../Common/GLTitleLine'
import { IUser } from '../../interfaces/User'

interface IUserCardProps {
  name?: string
  surName?: string
  email?: string
  image?: string
  user: IUser
}

export const UserCard: FC<IUserCardProps> = ({ name, surName, email, image, user }) => {
  const classes = useStyles()

  const [statusModalMemberInfo, setStatusModalMemberInfo] = useState<boolean>(false)

  const handleModalChangeMemberInfo = () => {
    setStatusModalMemberInfo((prev) => !prev)
    setAnchorEl(null)
  }

  const [, setAnchorEl] = React.useState(null)

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <img src={image} alt="" />
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleModalChangeMemberInfo}>
                <MoreVertIcon />
              </IconButton>
            </>
          }
          title={name + ' ' + surName}
          subheader={email}
          className={classes.cardHeader}
        />
      </Card>
      <GLModal
        maxWidth="548px"
        statusModal={statusModalMemberInfo}
        handleModalChange={handleModalChangeMemberInfo}
      >
        <Box className={classes.userInfo}>
          <GLTitleLine title="Kişisel Bilgiler" size="medium" />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">İsim</Typography>
              <Typography>{name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">İsim</Typography>
              <Typography>{surName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">E-Posta Adresi</Typography>
              <Typography>{email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Telefon Numarası</Typography>
              <Typography>{user.phone}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Ülke</Typography>
              <Typography>{user.country?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Şehir</Typography>
              <Typography>{user.city?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Departman</Typography>
              <Typography>{user?.department}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Pozisyon</Typography>
              <Typography>{user?.jobTitle}</Typography>
            </Grid>
            <Grid item xs={6}>
              <GLButton
                text="Kapat"
                textColor={colors.grayMedium}
                textColorHover={colors.blueDark}
                bgColor="transparent"
                bgColorHover={colors.graySoft}
                onClick={handleModalChangeMemberInfo}
              />
            </Grid>
            <Grid item xs={6}>
              <GLButton
                text="Tamam"
                textColor={colors.white}
                textColorHover={colors.white}
                bgColor={colors.sea}
                bgColorHover={colors.seaHover}
                onClick={handleModalChangeMemberInfo}
              />
            </Grid>
          </Grid>
        </Box>
      </GLModal>
    </>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  cardHeader: {
    flexBasis: '100%',
  },
  userInfo: {
    '& h5': {
      fontSize: '14px',
      fontWeight: 'bold',
      margin: '0 0 3px 0',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
    },

    '& p': {
      fontSize: '13px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
    },
  },
})
