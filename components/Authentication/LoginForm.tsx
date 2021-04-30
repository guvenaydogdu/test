import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../theme'
import { Link, Button, Typography } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useForm, Controller } from 'react-hook-form'
import Requests from '../../requests'
import { useAuth } from '../../providers/AuthProvider'
import { useTranslation } from 'next-i18next'
import { GLInput, GLInputPassword } from '../FormItems/GLInput'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { GLGoogleButton } from './GLGoogleButton'

import dynamic from 'next/dynamic'

const GLLinkedinButtonDynamic = dynamic(() => import('./GLLinkedinButton'), {
  ssr: false,
})

const loginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

type ILoginFormData = yup.InferType<typeof loginFormSchema>

export const LoginForm: FC = () => {
  const { t } = useTranslation()

  const request = Requests()
  const classes = useStyles()
  const auth = useAuth()
  const router = useRouter()

  const [warn, setWarn] = useState<boolean>(false)

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginFormSchema),
  })

  const onSubmit = (data: ILoginFormData) => {
    setWarn(false)
    request.AuthRequest.login(data)
      .then((res) => {
        console.log(res)
        if (res.messages[0]) {
          setWarn(true)
        }
        if (res.data.token) {
          auth.changeLoginModalStatus()

          if (res.data.token) {
            auth.login(res.data.token)
          }
        }
      })
      .finally(() => {
        if (router.asPath == '/register') {
          router.push('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const navigateToRegister = () => {
    router.push('/register').then(() => {
      auth.changeLoginModalStatus()
    })
  }

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className={classes.modalTitle}>{t('login')}</h4>
        <hr />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => {
            return (
              <GLInput
                label={t('e_mail_adress')}
                value={value}
                icon="/images/icon-email.svg"
                error={errors?.email ? true : false}
                onChange={onChange}
              />
            )
          }}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => {
            return (
              <GLInputPassword
                label={t('password')}
                value={value}
                error={errors?.password ? true : false}
                onChange={onChange}
              />
            )
          }}
        />
        <div className={`${classes.forgotPassword} ${classes.margin}`}>
          <Link href="/reset-password">{t('forgot_password')}</Link>
        </div>
        {warn ? (
          <Typography className={classes.errorText}>Kulanıcı adı veya parola yanlış!</Typography>
        ) : null}
        <Button
          aria-label="login"
          className={`${classes.btnLogIn} ${classes.margin}`}
          variant="contained"
          color="primary"
          endIcon={<ChevronRightIcon />}
          type="submit"
        >
          <span className="text">{t('login')}</span>
        </Button>
        <div className={classes.orNot}>
          <span>{t('or')}</span>
        </div>
        <GLLinkedinButtonDynamic />
        <GLGoogleButton />
        <div className={classes.youMember}>
          <span>{t('are_you_not_a_member')}</span>

          <Link onClick={navigateToRegister}>{t('sign_up_now')}</Link>
        </div>
      </form>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '620px',
    '& hr': {
      height: '1px',
      border: 'none',
      margin: '0 0 24px 0',
      backgroundColor: colors.grayLight,
    },
  },
  modalTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '18.78px',
    color: colors.black,
    margin: '0 0 16px 0',
  },
  margin: {
    margin: '0 0 16px 0',
  },
  forgotPassword: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& .MuiLink-root': {
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '14.9px',
      color: colors.grayMedium,
      textDecoration: 'underline',
    },
  },
  btnLogIn: {
    display: 'flex',
    width: '100%',
    height: '48px',

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
      },
    },
  },
  btnLogInOutsource: {
    width: '100%',
    border: `1px solid ${colors.grayLight}`,
    backgroundColor: 'transparent',
    color: colors.black,
    borderRadius: '10px',
    boxShadow: 'none',

    '&:hover': {
      backgroundColor: colors.grayLight,
      boxShadow: 'none',
    },

    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '34px',

      '& .icon': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      '& .text': {
        width: '100%',
        fontSize: '14px',
        lineHeight: '16.44px',
        fontWeight: '700',
        color: colors.black,
        textTransform: 'none',
        padding: '0 14px',
      },

      '& .MuiButton-endIcon': {
        color: colors.grayMedium,
      },
    },
  },
  orNot: {
    position: 'relative',
    height: '1px',
    backgroundColor: colors.grayLight,
    margin: '35px 0 22px 0',

    '& span': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '16.44px',
      color: colors.grayMedium,
      textAlign: 'center',
      transform: 'translate(-50%, -50%)',
      backgroundColor: colors.white,
      padding: '0 20px',
    },
  },
  youMember: {
    textAlign: 'center',
    padding: '14px 0',

    '& > span': {
      display: 'block',
      fontSize: '14px',
      lineHeight: '16.44px',
      fontWeight: '400',
      color: colors.grayMedium,
      marginBottom: '7px',
    },
    '& a': {
      cursor: 'pointer',
    },

    '& .MuiLink-root, & a': {
      display: 'inline-block',
      fontSize: '16px',
      lineHeight: '18.78px',
      fontWeight: '700',
      color: colors.sea,
      textDecoration: 'underline',
    },
  },
  errorText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.danger,
    fontWeight: 'bold',
    margin: '10px 0 10px 0',
  },
}))
