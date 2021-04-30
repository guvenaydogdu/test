import { GoogleLogin } from 'react-google-login'
import { Button } from '@material-ui/core'
import { colors } from '../../theme'
import Image from 'next/image'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'next-i18next'
import Requsts from '../../requests'
import { useAuth } from '../../providers/AuthProvider'
import { useRouter } from 'next/router'
const googleClientId = process.env.GOOGLE_CLIENT_ID as string
export const GLGoogleButton = () => {
  const request = Requsts()
  const classes = useStyles()
  const auth = useAuth()
  const router = useRouter()
  const { t } = useTranslation()
  const onGoogleResponse = (googleResponse: any) => {
    if (googleResponse.tokenId) {
      request.AuthRequest.googleLogin(googleResponse.tokenId)
        .then((res) => {
          if (res.data.token) {
            router
              .push('/')
              .then(() => {
                auth.changeLoginModalStatus()
              })
              .finally(() => {
                if (res.data.token) {
                  auth.login(res.data.token)
                }
              })
          }
        })
        .catch((err) => console.log(err))
    } else {
      console.log('Google Error')
    }
  }

  return (
    <GoogleLogin
      clientId={googleClientId}
      render={(renderProps: any) => {
        return (
          <Button
            aria-label="google-login"
            className={`${classes.btnLogInOutsource} ${classes.margin}`}
            variant="contained"
            color="primary"
            onClick={renderProps.onClick}
            endIcon={<ChevronRightIcon />}
            disabled={renderProps.disabled}
          >
            <span className="icon">
              <Image src="/images/icon-google.svg" alt="google" width="16px" height="16px" />
            </span>
            <span className="text">{t('continue_with_google')}</span>
          </Button>
        )
      }}
      buttonText="Login"
      onSuccess={onGoogleResponse}
      onFailure={onGoogleResponse}
    />
  )
}

const useStyles = makeStyles(() => ({
  margin: {
    margin: '0 0 16px 0',
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
}))
