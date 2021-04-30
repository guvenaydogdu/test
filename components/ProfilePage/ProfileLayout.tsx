import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Container, Grid } from '@material-ui/core'
import React, { FC } from 'react'
import { colors } from '../../theme'
import { classNames } from '../../utils/styles'
import makeStyles from '@material-ui/styles/makeStyles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAuth } from '../../providers/AuthProvider'
import { GLProfileImage } from './ProfileImage'
export const ProfileLayout: FC = ({ children }) => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation()
  const auth = useAuth()
  return (
    <div className={classes.pageContent}>
      <Container maxWidth="lg">
        <Grid container className={classes.container} spacing={0}>
          <Grid item xs={12} md={3}>
            <Box className={classes.aside}>
              <GLProfileImage
                image={'https://loremflickr.com/96/96/user'}
                name={auth.user?.fullName}
                company="Arkas Lojistik A.Ş."
              />

              <Box className={classes.asideWrapper}>
                <Link href={'/profile'}>
                  <Button
                    fullWidth
                    className={classNames([
                      classes.asideItem,
                      router.route == '/profile' && classes.active,
                    ])}
                  >
                    <span>{t('my_personal_information')}</span>
                    <FontAwesomeIcon icon={faChevronRight} color={colors.white} />
                  </Button>
                </Link>
                <Link href={'/profile/company'}>
                  <Button
                    fullWidth
                    className={classNames([
                      classes.asideItem,
                      router.route == '/profile/company' && classes.active,
                    ])}
                  >
                    <span>{t('my_company_information')}</span>
                    <FontAwesomeIcon icon={faChevronRight} color={colors.white} />
                  </Button>
                </Link>
                <Link href={'/profile/messages'}>
                  <Button
                    fullWidth
                    className={classNames([
                      classes.asideItem,
                      router.route == '/profile/messages' && classes.active,
                    ])}
                  >
                    <span>{t('my_messages')}</span>
                    <FontAwesomeIcon icon={faChevronRight} color={colors.white} />
                  </Button>
                </Link>
                <Link href={'/profile/demands'}>
                  <Button
                    fullWidth
                    className={classNames([
                      classes.asideItem,
                      router.route == '/profile/demands' && classes.active,
                    ])}
                  >
                    <span>{t('my_demands')}</span>
                    <FontAwesomeIcon icon={faChevronRight} color={colors.white} />
                  </Button>
                </Link>
                <Link href={'/profile/reservations'}>
                  <Button
                    fullWidth
                    className={classNames([
                      classes.asideItem,
                      router.route == '/profile/reservations' && classes.active,
                    ])}
                  >
                    <span>{t('my_reservations')}</span>
                    <FontAwesomeIcon icon={faChevronRight} color={colors.white} />
                  </Button>
                </Link>

                {auth?.user?.roles?.includes('Arkas') && (
                  <>
                    <Link href={'/profile/allUser'}>
                      <Button
                        fullWidth
                        className={classNames([
                          classes.asideItem,
                          router.route == '/profile/allUser' && classes.active,
                        ])}
                      >
                        <span>Tüm Kullanıcılar</span>
                        <FontAwesomeIcon icon={faChevronRight} color={colors.white} />
                      </Button>
                    </Link>
                    <Link href={'/profile/allDemands'}>
                      <Button
                        fullWidth
                        className={classNames([
                          classes.asideItem,
                          router.route == '/profile/allDemands' && classes.active,
                        ])}
                      >
                        <span>Tüm Talepler</span>
                        <FontAwesomeIcon icon={faChevronRight} color={colors.white} />
                      </Button>
                    </Link>
                  </>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box>{children}</Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  pageContent: {
    // '& .MuiGrid-container': {
    //   marginTop: '0',
    //   marginBottom: '0',
    //   borderRadius: '10px',
    // },

    // '& .MuiGrid-item': {
    //   paddingTop: '0',
    //   paddingBottom: '0',
    // },
    margin: '90px 0 30px 0',
  },
  container: {
    backgroundColor: colors.white,
    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '0 10px 10px 0',
  },
  aside: {
    backgroundColor: colors.sea,
    height: '100%',
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',

    '& img': {
      borderRadius: '47px',
      borderWidth: '2px',
      borderColor: colors.grayLight,
      borderStyle: 'solid',
      margin: '22px 0 22px 0',
      width: '94px',
    },
  },
  userName: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '26px',
    color: colors.white,

    '& span': {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '26px',
    },
  },
  companyName: {
    color: colors.lightSea,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '26px',
  },
  asideWrapper: {
    padding: '0 0 38px 0',
  },
  asideItem: {
    padding: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0.5,
    textTransform: 'none',
    '& span': {
      color: colors.white,
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: '19px',
    },
  },
  active: {
    opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}))
