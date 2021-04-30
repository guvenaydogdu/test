import React from 'react'
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Link as MLink,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../theme'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import useChangeLanguage from '../lib/Language'
import {
  useDataContext,
  SET_LOAD_TRACKING_OPEN,
  SET_LOAD_TRACKING_CLOSE,
} from '../providers/DataProvider'

const Footer = () => {
  const classes = useStyles()
  const { dispatch, globalState } = useDataContext()
  const { t, i18n } = useTranslation()
  const { changeLanguage } = useChangeLanguage()

  const handleChangeFooterLanguage = (event: any) => {
    changeLanguage(event.target.value)
  }
  const handleLoadTrackModal = () => {
    if (globalState.trackingModalStatus) dispatch({ type: SET_LOAD_TRACKING_CLOSE })
    else dispatch({ type: SET_LOAD_TRACKING_OPEN })
  }

  return (
    <footer className={classes.footer}>
      <div className={classes.footerSocial}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs={12} md={6}>
              <Link href="/">
                <Image src="/images/logo-shipeedy.svg" alt="Shipeedy" width="160px" height="60px" />
              </Link>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.socialMedia}>
                <span>{t('follow_us')}</span>
                <Box>
                  <Link href="https://www.facebook.com">
                    <Image
                      src="/images/icon-facebook-circle.svg"
                      alt="Facebook | Shipeedy"
                      width="36px"
                      height="36px"
                    />
                  </Link>
                  <Link href="https://www.twitter.com">
                    <Image
                      src="/images/icon-twitter-circle.svg"
                      alt="Twitter | Shipeedy"
                      width="36px"
                      height="36px"
                    />
                  </Link>
                  <Link href="https://www.linkedin.com">
                    <Image
                      src="/images/icon-linkedin-circle.svg"
                      alt="Linkedin | Shipeedy"
                      width="36px"
                      height="36px"
                    />
                  </Link>
                  <Link href="https://www.instagram.com">
                    <Image
                      src="/images/icon-instagram-circle.svg"
                      alt="Instagram | Shipeedy"
                      width="36px"
                      height="36px"
                    />
                  </Link>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.footerTop}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justify="space-between">
            <Grid item xs={12} md={4} lg={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <div className="links">
                    <Link href={'/services'}>{t('services')}</Link>
                    <Link href={'/about-us'}>{t('about_us')}</Link>
                    <Link href="#">{t('contact')}</Link>
                    <Link href={'/information-bank'}>{t('information_bank')}</Link>
                    <MLink onClick={handleLoadTrackModal}>{t('load_tracking')}</MLink>
                    <Link href="#">Blog</Link>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className="links">
                    <Link href={'/services/seaway-service'}>{t('seaway')}</Link>
                    <Link href={'/services/airway-service'}>{t('airway')}</Link>
                    <Link href={'/services/railway-service'}>{t('railway')}</Link>
                    <Link href={'/services/special-service'}>{t('special_services')}</Link>
                    <Link href="#">Operasyonel STC</Link>
                    <Link href="#">{t('faq')}</Link>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className="links">
                    <Link href="#">{t('terms_of_use')}</Link>
                    <Link href="#">{t('operation_guide')}</Link>
                    <Link href="#">{t('cancellation_refund_conditions')}</Link>
                    <Link href="#">{t('prohibited_products')}</Link>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} lg={5}>
              <div className={classes.newsletter}>
                <p>{t('get_new_from_us')}</p>
                <FormControl className={classes.selectLanguage}>
                  <Select
                    id="footerMenuLanguage"
                    value={i18n.language}
                    onChange={handleChangeFooterLanguage}
                    MenuProps={{
                      id: 'footerMenuLanguage',
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    }}
                  >
                    {globalState.languages?.map((language) => {
                      return (
                        <MenuItem key={language.code} value={language.code}>
                          {t(language.code)}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <div className="form">
                  <TextField
                    id="newsletter-textField"
                    label={t('e_mail_adress')}
                    variant="filled"
                  />
                  <Button aria-label="sign_up">{t('sign_up')}</Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.footerBottom}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <div className="links">
                <Link href="#">{t('kvkk_clarification_text')}</Link>
                <Link href="#">{t('kvkk_and_privacy_policy')}</Link>
                <Link href="#">{t('kvkk_application_form')}</Link>
                <Link href="#">{t('cookie_policy')}</Link>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <p>{t('brand_of_arkas')}</p>
            </Grid>
          </Grid>
        </Container>
      </div>
    </footer>
  )
}

export default Footer

const useStyles = makeStyles((theme) => ({
  footer: {
    '& .MuiGrid-container': {
      marginTop: 0,
      marginBottom: 0,

      '& .MuiGrid-item': {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    '& a': {
      cursor: 'pointer',
    },
  },
  footerSocial: {
    backgroundColor: colors.white,
    paddingTop: '27px',
    paddingBottom: '31px',
  },
  socialMedia: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',

    '& > span': {
      fontSize: '14px',
      lineHeight: '16.44px',
      fontWeight: 700,
      color: colors.sea,
    },

    '& > .MuiBox-root > *': {
      marginLeft: theme.spacing(1) + 'px !important',
    },
  },
  footerTop: {
    backgroundColor: colors.sea,
    padding: '30px 0',

    '& .links': {
      fontSize: '14px',
      lineHeight: '16.44px',
      fontWeight: 700,
      color: colors.white,

      '& a': {
        display: 'block',
        color: colors.white,
        textDecoration: 'none',
        margin: '10px 0',
      },
    },
  },
  footerBottom: {
    backgroundColor: colors.blueDark2,
    fontSize: '14px',
    lineHeight: '26px',
    fontWeight: 400,
    textAlign: 'right',
    color: colors.white,
    padding: '23px 0',

    '& .links': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '670px',

      '& a': {
        color: colors.white,
        textDecoration: 'none',
      },
    },
  },
  '#footerMenuLanguage': {
    width: '160px',

    '& .MuiPaper-root': {
      width: '160px',
    },
  },
  selectLanguage: {
    marginBottom: '24px',

    '& .MuiInputBase-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${colors.white}`,
      borderRadius: '10px',
      width: '160px',
      height: '48px',

      '&::after, &::before': {
        display: 'none',
      },
      '& .MuiSelect-root': {
        width: 'auto',
        fontSize: '14px',
        lineHeight: '16.44px',
        fontWeight: '700',
        color: colors.white,
        paddingRight: '8px',
      },
      '& .MuiSvgIcon-root': {
        position: 'relative',
        top: 'auto',
        right: 'auto',
        color: colors.white,
      },
    },
  },
  newsletter: {
    '& p': {
      fontSize: '14px',
      lineHeight: '26px',
      fontWeight: '700',
      color: colors.white,
      margin: '10px 0 11px 0',
    },

    '& .form': {
      display: 'flex',
      width: '100%',

      '& .MuiTextField-root': {
        width: 'calc(100% - 160px)',
        border: `1px solid ${colors.white}`,
        borderRight: 'none',
        borderRadius: '10px 0 0 10px',
        overflow: 'hidden',

        '& .MuiInputLabel-root': {
          fontSize: '14px',
          fontWeight: '400',
          color: colors.white,
        },
        '& .MuiInputBase-root': {
          backgroundColor: 'transparent',

          '& input': {
            color: colors.white,
          },

          '&::before, &::after': {
            display: 'none',
          },
        },
      },

      '& .MuiButton-root': {
        fontSize: '14px',
        lineHeight: '16.44px',
        fontWeight: '700',
        color: colors.white,
        backgroundColor: colors.iron,
        width: '160px',
        margin: '0',
        borderRadius: '0 10px 10px 0',
      },
    },
  },
}))
