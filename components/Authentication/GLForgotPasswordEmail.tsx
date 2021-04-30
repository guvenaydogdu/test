import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import Requests from '../../requests'
import { colors } from '../../theme'
import { GLButton } from '../Common/Forms/GLButtons'
import { GLInput } from '../Common/Forms/GLInput'
import { GLIconNext, GLIconUploadFiles } from '../Common/GLIcons'

export const GLForgotPasswordEmail: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const request = Requests()

  const [close, setClose] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const ResetPassEmail = yup.object().shape({
    email: yup.string().email().required(),
  })

  type IResetPassData = yup.InferType<typeof ResetPassEmail>

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(ResetPassEmail),
  })

  const onSubmit = (data: IResetPassData) => {
    console.log(data)
    setLoading(true)

    request.AuthRequest.forgotPassword(data)
      .then((res) => {
        if (res.isSuccess) {
          setClose(true)
          setLoading(false)
        }
      })
      .catch((err) => console.log(err))
  }

  console.log(errors)
  return (
    <>
      <Typography variant="h1">{t('forgot_password')}</Typography>
      <hr className={classes.hr} />
      <Typography>{t('forgot_password_email_text')}</Typography>
      <br />
      {close ? (
        <Typography style={{ color: colors.iron }}>{t('reset_pass_success_email')}</Typography>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} className={classes.actionButtons}>
          <Grid item md={6}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => {
                return (
                  <GLInput
                    //label={t('e_mail_address')}
                    placeholder={t('e_mail_adress')}
                    value={value}
                    onChange={onChange}
                    error={errors?.email ? true : false}
                  />
                )
              }}
            />

            {errors.email ? (
              <Typography variant="h6" className={classes.formError}>
                {t('reset_pass_valid_email')}
              </Typography>
            ) : null}
          </Grid>

          <Grid item md={6}>
            <GLButton
              text={loading ? t('sending') : t('send')}
              textColor={colors.white}
              textColorHover={colors.white}
              bgColor={colors.sea}
              bgColorHover={colors.seaHover}
              iconSize="8px"
              endIcon={loading ? <GLIconUploadFiles /> : <GLIconNext />}
              type="submit"
            />
          </Grid>
        </Grid>
      </form>
    </>
  )
}

const useStyles = makeStyles(() => ({
  hr: {
    border: 'none',
    borderBottom: `1px solid ${colors.grayLight}`,
    margin: '20px 0 32px 0',
  },
  actionButtons: {
    padding: '64px 0',
  },
  formError: {
    fontSize: '14px',
    color: colors.danger,
    padding: '1rem 0',
  },
}))
