import { Box, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import makeStyles from '@material-ui/styles/makeStyles'
import { GLButton } from '../Common/Forms/GLButtons'
import { colors } from '../../theme'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import Requests from '../../requests'
import { useAuth } from '../../providers/AuthProvider'

import { GLTitleLine } from '../Common/GLTitleLine'
import { GLPasswordInput } from '../Common/Forms/GLPasswordInput'

const passwordInformationSchema = yup.object({
  currentPassword: yup.string().required(),
  newPassword: yup.string().required(),
  newPasswordAgain: yup.string().required(),
})

export type IPasswordInformationtFormData = yup.InferType<typeof passwordInformationSchema>

export const PasswordChange = () => {
  const requests = Requests()
  const classes = useStyles()
  const { t } = useTranslation()
  const { user } = useAuth()
  const [isSucces, setIsSucces] = useState<boolean>(false)

  const { handleSubmit } = useForm({
    resolver: yupResolver(passwordInformationSchema),
  })

  const onSubmit = (data: IPasswordInformationtFormData) => {
    if (user?.userId) {
      requests.UserRequest.changePassword({ ...data, id: user?.userId })
        .then((res) => {
          if (res.isSuccess) {
            setIsSucces(true)
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setIsSucces(false)
          }, 6000)
        })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GLTitleLine
        title={t('password')}
        message={isSucces ? t('information_changed_succesed') : undefined}
      />

      <Box className={classes.passwordArea}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <GLPasswordInput label="Güncel Şifreniz" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <GLPasswordInput label="Yeni Şifreniz" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <GLPasswordInput label="Yeni Şifrenizi Tekrarlayın" />
          </Grid>
        </Grid>

        <Grid container justify="flex-end" spacing={2}>
          <Grid item xs={3}>
            <GLButton
              text={'Güncelle'}
              onClick={() => {
                console.log('test')
              }}
              bgColor={colors.white}
              bgColorHover={colors.sea}
              textColor={colors.sea}
              textColorHover={colors.white}
              borderColor={colors.sea}
              shadow={false}
              type="button"
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}

const useStyles = makeStyles(() => ({
  passwordArea: {
    '& svg': {
      width: '1rem !important',
    },
  },
}))
