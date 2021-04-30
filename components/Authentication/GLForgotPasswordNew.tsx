import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Requests from '../../requests'
import { colors } from '../../theme'
import { GLButton } from '../Common/Forms/GLButtons'
import { GLInputPassword } from '../FormItems/GLInput'
import { GLIconNext } from '../Common/GLIcons'
import { useRouter } from 'next/router'

export const GLForgotPasswordNew: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()
  const request = Requests()

  const token = router.query

  const activationCode = token.token?.toString()

  const [success, setSuccess] = useState<boolean>(false)

  const ResetPassEmail = yup.object().shape({
    password: yup.string().required(),
    passwordAgain: yup.string().required(),
  })

  type IResetPass = yup.InferType<typeof ResetPassEmail>

  const { control, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(ResetPassEmail),
  })

  const onSubmit = (data: IResetPass) => {
    console.log(data)

    if (data.password != data.passwordAgain) {
      setError('password', {
        type: 'manual',
        message: 'They are not same',
      })
    } else {
      request.ForgotPasswordRequest.changePassword(
        activationCode,
        data.password,
        data.passwordAgain
      )
        .then((res) => (res.isSuccess ? setSuccess(true) : null))
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      <Typography variant="h1">{t('forgot_password')}</Typography>
      <hr className={classes.hr} />
      <Typography>{t('forgot_password_newpass_text')}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.password || errors.passwordAgain ? (
          <p style={{ color: colors.danger }}>{t('register_error2')}</p>
        ) : null}{' '}
        <br />
        {success ? (
          <Typography style={{ color: colors.iron }}>{t('change_password_success')}</Typography>
        ) : null}
        <Grid container spacing={2} className={classes.actionButtons}>
          <Grid item xs={12}>
            <Typography>{t('new_pass')}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => {
                return (
                  <GLInputPassword
                    label={t('password')}
                    value={value}
                    onChange={onChange}
                    error={errors?.password ? true : false}
                  />
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="passwordAgain"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => {
                return (
                  <GLInputPassword
                    label={t('password_again')}
                    value={value}
                    onChange={onChange}
                    error={errors?.passwordAgain ? true : false}
                  />
                )
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="flex-end">
          <Grid item xs={6}>
            <GLButton
              text={t('send')}
              textColor={colors.white}
              textColorHover={colors.white}
              bgColor={colors.sea}
              bgColorHover={colors.seaHover}
              iconSize="8px"
              endIcon={<GLIconNext />}
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
    padding: '50px 0 30px 0',
  },
  errorText: {
    color: colors.danger,
  },
}))
