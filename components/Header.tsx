import React, { useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import {
  Box,
  Avatar,
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { useAuth } from '../providers/AuthProvider'
import { colors } from '../theme'
import { GLModal } from '../components/Common/GLModal'
import Link from 'next/link'
import Image from 'next/image'
import { LoginForm } from './Authentication/LoginForm'
import { useTranslation } from 'next-i18next'
import useChangeLanguage from '../lib/Language'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { GLLoadTrackForm } from './Common/GLLoadTrackForm'
import {
  useDataContext,
  SET_LOAD_TRACKING_OPEN,
  SET_LOAD_TRACKING_CLOSE,
} from '../providers/DataProvider'

const Header = () => {
  const classes = useStyles()
  const auth = useAuth()
  const { dispatch, globalState } = useDataContext()
  const { t, i18n } = useTranslation()
  const { changeLanguage } = useChangeLanguage()
  const router = useRouter()
  const handleLoadTrackModal = () => {
    if (globalState.trackingModalStatus) dispatch({ type: SET_LOAD_TRACKING_CLOSE })
    else dispatch({ type: SET_LOAD_TRACKING_OPEN })
  }

  const [anchorElLanguage, setAnchorElLanguage] = useState(null)
  const [anchorElProfile, setAnchorElProfile] = useState(null)

  const handleClickLanguage = (event: any) => {
    setAnchorElProfile(null)
    setAnchorElLanguage(event.currentTarget)
  }

  const handleClickProfile = (event: any) => {
    setAnchorElLanguage(null)
    setAnchorElProfile(event.currentTarget)
  }

  const handleLanguageMenuItemClick = (language: string) => {
    changeLanguage(language, { cookie: true })

    setAnchorElLanguage(null)
  }

  const handleCloseLanguage = () => {
    setAnchorElLanguage(null)
  }
  const handleCloseProfile = () => {
    setAnchorElProfile(null)
  }
  const loginModalChange = () => {
    auth.changeLoginModalStatus()
  }
  const logout = () => {
    handleCloseProfile()
    auth.logout()
  }

  return (
    <>
      <Container maxWidth={false} className={classes.header}>
        <Box className={classes.headerLogo}>
          <Link href={'/'}>
            <Button aria-label="logo" color="primary" className={classes.logo}>
              <Image
                src="/images/logo-shipeedy.svg"
                alt="Shipeedy"
                width={160}
                height={60}
                priority={true}
              />
            </Button>
          </Link>
          <span className={classes.logoLine}></span>
        </Box>
        <Box className={classes.menuWrapper}>
          <Box className={classes.menu}>
            <List className={classes.nav} component="nav" aria-label="secondary mailbox folder">
              <ListItem
                button
                className={classes.menuItem}
                selected={router.pathname == '/services'}
              >
                <Link href={'/services'}>
                  <ListItemText primary={t('services')} className={classes.menuText} />
                </Link>
              </ListItem>
              <ListItem
                button
                className={classes.menuItem}
                selected={router.pathname == '/how-to-work'}
              >
                <Link href={'/how-to-work'}>
                  <ListItemText primary={t('how_to_work')} className={classes.menuText} />
                </Link>
              </ListItem>
              <ListItem
                button
                className={classes.menuItem}
                selected={router.pathname == '/about-us'}
              >
                <Link href={'/about-us'}>
                  <ListItemText primary={t('about_us')} className={classes.menuText} />
                </Link>
              </ListItem>
              <ListItem
                button
                className={classes.menuItem}
                selected={router.pathname == '/information-bank'}
              >
                <Link href={'/information-bank'}>
                  <ListItemText primary={t('information_bank')} className={classes.menuText} />
                </Link>
              </ListItem>

              <ListItem button className={classes.menuItem} onClick={handleLoadTrackModal}>
                <ListItemText primary={t('load_tracking')} className={classes.menuText} />
              </ListItem>
            </List>
            <Box className={classes.profile}>
              {auth.isAuthenticated && (
                <Button onClick={handleClickProfile}>
                  <Box className={classes.profileImgWrapper}>
                    <img alt="profile" src={'https://via.placeholder.com/31'} />
                  </Box>
                  <Box className={classes.profileInfoWrapper}>
                    <span>Merhaba,</span>
                    <span>{auth.user?.fullName}</span>
                  </Box>
                  <FontAwesomeIcon icon={faCaretDown} color={colors.white} />
                </Button>
              )}
              {!auth.isAuthenticated && (
                <Box className={classes.authWrapper}>
                  <Button
                    aria-label="login"
                    className={classes.btnLogIn}
                    variant="outlined"
                    startIcon={<Avatar alt="login" src={'/images/icon-log-in.svg'} />}
                    onClick={() => loginModalChange()}
                  >
                    {t('login')}
                  </Button>
                  <Link href={'/register'}>
                    <Button
                      aria-label="register"
                      className={classes.btnSignUp}
                      variant="contained"
                      startIcon={<Avatar alt="sign-up" src={'/images/icon-add-user.svg'} />}
                    >
                      {t('sign_up')}
                    </Button>
                  </Link>
                </Box>
              )}
              {/*auth.isAuthenticated && (
                <>
                  {auth?.user?.roles && auth?.user?.roles?.length > 1 && (
                    <Link href={'/admin/announcement'}>
                      <Button
                        aria-label="admin"
                        className={classes.btnAdmin}
                        variant="outlined"
                        startIcon={<FontAwesomeIcon size="6x" icon={faUserTie} />}
                      >
                        {t('admin_panel')}
                      </Button>
                    </Link>
                  )}
                  <Button
                    aria-label="logout"
                    className={classes.btnLogIn}
                    variant="outlined"
                    startIcon={<Avatar alt="logout" src={'/images/icon-log-out.svg'} />}
                    onClick={logout}
                  >
                    {t('logout')}
                  </Button>
                </>
                  )*/}
              <Button
                aria-label="locale"
                className={classes.btnLanguage}
                aria-controls="menuLanguage"
                aria-haspopup="true"
                onClick={handleClickLanguage}
              >
                <Image src="/images/icon-globe.svg" alt="globe" width="24px" height="24px" />
                <span className={classes.btnLanguageArrow}></span>
              </Button>
              <Menu
                id="menuLanguage"
                className={classes.menuLanguage}
                anchorEl={anchorElLanguage}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                keepMounted
                open={Boolean(anchorElLanguage)}
                onClose={handleCloseLanguage}
              >
                {globalState.languages?.map((language) => {
                  return (
                    <MenuItem
                      key={language.id}
                      selected={i18n.language === language.code}
                      onClick={() => {
                        handleLanguageMenuItemClick(language.code)
                      }}
                    >
                      {t(language.code)}
                    </MenuItem>
                  )
                })}
              </Menu>
              <Menu
                id="menuProfile"
                className={classes.menuProfile}
                anchorEl={anchorElProfile}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                keepMounted
                open={Boolean(anchorElProfile)}
                onClose={handleCloseProfile}
              >
                <Link href={'/profile'}>
                  <MenuItem selected={router.route == '/profile'}>Kişisel Bilgilerim</MenuItem>
                </Link>
                <Link href={'/profile/company'}>
                  <MenuItem selected={router.route == '/profile/company'}>
                    Şirket Bilgilerim
                  </MenuItem>
                </Link>
                <Link href={'/profile/messages'}>
                  <MenuItem selected={router.route == '/profile/messages'}>Mesajlarım</MenuItem>
                </Link>
                <Link href={'/profile/demands'}>
                  <MenuItem selected={router.route == '/profile/demands'}>Taleplerim</MenuItem>
                </Link>
                <Link href={'/profile/reservations'}>
                  <MenuItem selected={router.route == '/profile/reservations'}>
                    Rezervasyonlarım
                  </MenuItem>
                </Link>
                {auth?.user?.roles?.includes('Arkas') && (
                  <>
                    <Link href={'/profile/allUser'}>
                      <MenuItem selected={router.route == '/profile/allUser'}>
                        Tüm Kullanıcılar
                      </MenuItem>
                    </Link>
                    <Link href={'/profile/allDemands'}>
                      <MenuItem selected={router.route == '/profile/allDemands'}>
                        Tüm Talepler
                      </MenuItem>
                    </Link>
                  </>
                )}
                {auth?.user?.roles?.includes('Admin') && (
                  <Link href={'/admin/announcement'}>
                    <MenuItem>{t('admin_panel')}</MenuItem>
                  </Link>
                )}

                <MenuItem onClick={logout}>Çıkış</MenuItem>
              </Menu>
            </Box>
          </Box>
          <span className={classes.menuLine}></span>
        </Box>
      </Container>
      <GLModal
        maxWidth="350px"
        statusModal={auth.isLoginModalOpen}
        handleModalChange={loginModalChange}
      >
        <LoginForm />
      </GLModal>
      <GLModal
        maxWidth="350px"
        statusModal={globalState.trackingModalStatus}
        handleModalChange={handleLoadTrackModal}
      >
        <GLLoadTrackForm handleModalChange={handleLoadTrackModal} />
      </GLModal>
    </>
  )
}

export default Header

const logoWrapper = 355

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 0,
    },
    headerLogo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
      width: logoWrapper,
      padding: '0',
      marginLeft: 0,
    },
    logoLine: {
      flexGrow: 1,
      display: 'block',
      width: '100%',
      height: 8,
      backgroundColor: '#A3C86B',
      paddingLeft: 10000,
    },
    logo: {
      padding: '15px 30px 21px 30px',
    },
    menuWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      width: `calc(100% - ${logoWrapper}px)`,
      backgroundColor: '#4489C9',
      padding: '0 30px 0 0',
      '& .MuiButton-root': {
        '& .MuiAvatar-root': {
          backgroundColor: 'transparent',
        },
      },
    },
    menu: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: `calc(100% - 8px)`,
      width: '100%',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      width: '100%',
      maxWidth: 660,
      height: 'calc(100% - 8px)',
    },
    menuLine: {
      display: 'block',
      height: 8,
      backgroundColor: colors.air, //"#59C2F0",
      paddingRight: 10000,
    },
    menuItem: {
      width: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      '&.Mui-selected': {
        backgroundColor: 'transparent',
      },
      '&.Mui-selected .MuiListItemText-root': {
        opacity: 1,
      },
    },
    menuText: {
      textAlign: 'center',
      margin: 0,
      opacity: 0.5,
      '& .MuiTypography-root': {
        lineHeight: '16.44px',
        fontWeight: 700,
        color: colors.white,
      },
    },
    btnLogIn: {
      width: 120,
      height: 48,
      fontSize: 14,
      fontWeight: 700,
      color: colors.white,
      textTransform: 'none',
      borderColor: colors.white,
      borderRadius: 10,
      marginRight: '20px',
      whiteSpace: 'nowrap',
      '& .MuiButton-startIcon': {
        '& .MuiAvatar-root': {
          width: '16px',
          '& img': {
            width: '16px',
            height: 'auto',
          },
        },
      },
    },
    btnAdmin: {
      width: 150,
      height: 48,
      fontSize: 14,
      fontWeight: 700,
      color: colors.white,
      textTransform: 'none',
      borderColor: colors.white,
      borderRadius: 10,
      marginRight: '20px',
      whiteSpace: 'nowrap',
      '& .MuiButton-startIcon': {
        '& .MuiAvatar-root': {
          width: '16px',
          '& img': {
            width: '16px',
            height: 'auto',
          },
        },
      },
    },
    btnSignUp: {
      width: 120,
      height: 48,
      fontSize: '14px',
      lineHeight: '16.44px',
      fontWeight: 700,
      color: colors.sea,
      textTransform: 'none',
      backgroundColor: colors.white,
      borderColor: colors.white,
      borderRadius: 10,
      marginRight: '20px',
      '& .MuiButton-startIcon': {
        '& .MuiAvatar-root': {
          width: '16px',
          '& img': {
            width: '16px',
            height: 'auto',
          },
        },
      },
    },
    btnLanguage: {
      margin: '20px 20px 20px 0',
    },
    btnLanguageArrow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 0,
      height: 0,
      marginLeft: '6px',
      borderLeft: '3px solid transparent',
      borderRight: '3px solid transparent',
      borderTop: `3px solid ${colors.white}`,
    },
    menuLanguage: {
      padding: '10px',
      '& .MuiMenu-paper': {
        position: 'relative',
        width: '160px',
        marginTop: '20px',
        padding: 0,
        backgroundColor: 'transparent',
        boxShadow:
          '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 11px 14px 2px rgb(0 0 0 / 12%)',
        '&::before': {
          content: '""',
          display: 'block',
          width: '15px',
          height: '15px',
          borderRadius: 4,
          backgroundColor: colors.white,
          margin: '3px auto -20px auto',
          transform: 'rotate(45deg)',
        },
        '& .MuiMenu-list': {
          padding: '10px 0 0 0',

          '& .MuiListItem-root': {
            fontSize: '14px',
            lineHeight: '16.44px',
            fontWeight: 700,
            justifyContent: 'center',
            backgroundColor: colors.white,
            minHeight: '48px',
            '&.Mui-selected': {
              color: colors.sea,
              backgroundColor: colors.white,
            },
          },
        },
      },
    },
    profile: {
      display: 'flex',
      height: '100%',
      '& > button': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        textTransform: 'none',
        textAlign: 'left',
      },
    },
    profileImgWrapper: {
      marginRight: '10px',
      '& > img': {
        borderRadius: 17,
        borderWidth: '2px',
        borderColor: colors.grayLight,
        borderStyle: 'solid',
      },
    },
    profileInfoWrapper: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '32px',
      '& > :first-child': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '15px',
        color: colors.white,
      },
      '& > :last-child': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '15px',
        color: colors.white,
      },
    },
    authWrapper: {
      display: 'flex',
      height: '100%',
      alignItems: 'center',
    },
    menuProfile: {
      padding: '10px',
      '& .MuiMenu-paper': {
        position: 'relative',
        width: '220px',
        padding: 0,
        backgroundColor: 'transparent',
        boxShadow:
          '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 11px 14px 2px rgb(0 0 0 / 12%)',
        '&::before': {
          content: '""',
          display: 'block',
          width: '15px',
          height: '15px',
          borderRadius: 4,
          backgroundColor: colors.white,
          margin: '3px auto -20px auto',
          transform: 'rotate(45deg)',
        },
        '& .MuiMenu-list': {
          padding: '10px 0 0 0',

          '& .MuiListItem-root': {
            fontSize: '14px',
            lineHeight: '16.44px',
            fontWeight: 700,
            justifyContent: 'center',
            backgroundColor: colors.white,
            minHeight: '48px',
            '&.Mui-selected': {
              color: colors.sea,
              backgroundColor: colors.white,
            },
          },
        },
      },
    },
  })
)
