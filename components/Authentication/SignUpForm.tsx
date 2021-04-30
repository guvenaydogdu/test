import React, { FC, useEffect, useState } from 'react'
import { colors } from '../../theme'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useForm, Controller } from 'react-hook-form'
import Requests from '../../requests'
import { Container, Grid, Box, Button, Link, Modal, Typography } from '@material-ui/core'
import { useTranslation } from 'next-i18next'
import { GLCheckBox, GLInput, GLInputPassword, GLPhoneInput } from '../FormItems/GLInput'
import { makeStyles } from '@material-ui/core/styles'
import {
  ICitiesResponse,
  ICityPagerInput,
  ICountriesResponse,
  ICountryPagerInput,
} from '../../interfaces/City'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { GLAutoComplete } from '../FormItems/GLAutoComplete'
import { IRegister } from '../../interfaces/Auth'
import { maskedPhoneToNumber } from '../../utils/validation'
import { useRouter } from 'next/router'
import { useAuth } from '../../providers/AuthProvider'
import { GLGoogleButton } from './GLGoogleButton'
import GLLinkedinButton from './GLLinkedinButton'

const countriesParametes: ICountryPagerInput = {
  pageNumber: 1,
  pageSize: 1000,
  sortDescending: true,
}

const signupFormSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  companyName: yup.string().required(),
  //companyPhone: yup.string().required(),
  companyTaxOffice: yup.string().required(),
  companyTaxNumber: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordAgain: yup.string().required(),
  countryId: yup.number().required(),
  cityId: yup.number().required(),
  advertisement: yup.boolean(),
  membership: yup.boolean(),
})

type ISignUpFormData = yup.InferType<typeof signupFormSchema>

export const SignUpForm: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const request = Requests()
  const classes = useStyles()
  const [countries, setCountries] = useState<ICountriesResponse | null>(null)
  const { changeLoginModalStatus } = useAuth()
  const [cities, setCities] = useState<ICitiesResponse | null>(null)
  const [close, setClose] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { control, handleSubmit, errors, watch, setError } = useForm({
    resolver: yupResolver(signupFormSchema),
  })

  useEffect(() => {
    getCountries()
  }, [])

  useEffect(() => {
    getCities()
  }, [watch('countryId')])

  const getCities = () => {
    if (watch('countryId')) {
      const citiesParameterst: ICityPagerInput = {
        pageNumber: 1,
        pageSize: 1000,
        sortDescending: true,
        includeCountry: false,
        countryId: Number(watch('countryId')),
      }
      request.CityRequest.getList(citiesParameterst)
        .then((res) => {
          setCities(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const onClickLogin = () => {
    changeLoginModalStatus()
  }

  const getCountries = () => {
    request.CountryRequest.getList(countriesParametes)
      .then((res) => {
        setCountries(res)
      })
      .catch((err) => console.log(err))
  }

  const onSubmit = (data: ISignUpFormData) => {
    setLoading(true)
    if (data.advertisement && data.membership) {
      if (data.password !== data.passwordAgain) {
        setError('password', {
          type: 'manual',
          message: 'They are not same',
        })
        setError('passwordAgain', {
          type: 'manual',
          message: 'They are not same',
        })
        return
      }
      const temp: IRegister = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: maskedPhoneToNumber(data.phone),
        companyName: data.companyName,
        companyTaxOffice: data.companyTaxOffice,
        companyTaxNumber: data.companyTaxNumber,
        //companyPhone: maskedPhoneToNumber(data.companyPhone),
        password: data.password,
        passwordAgain: data.passwordAgain,
        countryId: data.countryId,
        cityId: data.cityId,
        companyCityId: data.cityId,
        companyCountryId: data.countryId,
      }
      request.AuthRequest.register(temp)
        .then((res) => {
          if (res.isSuccess) {
            console.log(res)
            setLoading(false)
            setTimeout(() => {
              setClose(true)
              router.push('/')
            }, 3000)
            setClose(false)
          }
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log('Show Error')
      //Show Error
    }
  }

  return (
    <Container maxWidth="md">
      <Modal
        open={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <Typography className={classes.successText} variant="subtitle1">
            Üyeliğiniz başarıyla oluşturulmuştur, Anasayfa&apos;ya yönlendiriliyorsunuz.
          </Typography>
        </div>
      </Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.register}>
          <h1 className={classes.title}>{t('sign_up')}</h1>
          <hr />
          <div>
            {errors.companyName ||
            errors.name ||
            errors.companyTaxNumber ||
            errors.firstName ||
            errors.lastName ||
            errors.email ||
            errors.password ||
            errors.passwordAgain ? (
              <p className={classes.errorText}>{t('register_error1')}</p>
            ) : null}
            {errors.password || errors.passwordAgain ? (
              <p className={classes.errorText}>{t('register_error2')}</p>
            ) : null}
            {errors.email ? <p className={classes.errorText}>{t('register_error3')}</p> : null}
          </div>
          <h4 className={classes.subTitle}>{t('personel_information')}</h4>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('name')}
                      value={value}
                      icon="/images/icon-user-circle.svg"
                      onChange={onChange}
                      error={errors?.firstName ? true : false}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('surname')}
                      value={value}
                      icon="/images/icon-user-circle.svg"
                      onChange={onChange}
                      error={errors?.lastName ? true : false}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                      onChange={onChange}
                      error={errors?.email ? true : false}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => {
                  return (
                    <GLPhoneInput
                      label={t('phone')}
                      value={value}
                      icon="/images/icon-phone.svg"
                      onChange={onChange}
                      error={errors?.phone ? true : false}
                    />
                  )
                }}
              />
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
          <h4 className={classes.subTitle}>{t('company_information')}</h4>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Controller
                name="companyName"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('company_name')}
                      value={value}
                      icon="/images/icon-company.svg"
                      onChange={onChange}
                      error={errors?.companyName ? true : false}
                    />
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="countryId"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => {
                  return (
                    <GLAutoComplete
                      data={countries?.data.map((country) => {
                        return {
                          id: country.id,
                          label: country.name,
                        }
                      })}
                      label={t('country')}
                      value={value}
                      onChange={onChange}
                      error={errors?.countryId ? true : false}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="cityId"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => {
                  return (
                    <GLAutoComplete
                      data={cities?.data.map((city) => {
                        return {
                          id: city.id,
                          label: city.name,
                        }
                      })}
                      label={t('city')}
                      value={value}
                      onChange={onChange}
                      error={errors?.cityId ? true : false}
                    />
                  )
                }}
              />
            </Grid>
          </Grid>
          <h4 className={classes.subTitle}>{t('company_tax_information')}</h4>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="companyTaxOffice"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('company_tax_office')}
                      value={value}
                      icon="/images/icon-pin.svg"
                      onChange={onChange}
                      error={errors?.companyTaxtOffice ? true : false}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="companyTaxNumber"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('company_tax_number')}
                      value={value}
                      icon="/images/icon-tax.svg"
                      onChange={onChange}
                      error={errors?.companyTaxtNumber ? true : false}
                    />
                  )
                }}
              />
            </Grid>
          </Grid>

          <div className={`${classes.orNot} ${classes.margin}`}>
            <span>{t('or')}</span>
          </div>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <GLLinkedinButton />
            </Grid>
            <Grid item xs={12} md={6}>
              <GLGoogleButton />
              {/*     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>*/}
            </Grid>
          </Grid>
          <Box className={classes.contract}>
            <Controller
              name="membership"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => {
                return (
                  <GLCheckBox
                    checked={value}
                    label={t('membership_policy_text')}
                    onChange={onChange}
                  />
                )
              }}
            />
            <Controller
              name="advertisement"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => {
                return (
                  <GLCheckBox
                    checked={value}
                    label={t('advertisement_policy_text')}
                    onChange={onChange}
                  />
                )
              }}
            />
          </Box>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={6}>
              <Button
                aria-label="register"
                className={`${classes.btnLogIn} ${classes.margin}`}
                variant="contained"
                color="primary"
                endIcon={<ChevronRightIcon />}
                type="submit"
              >
                <span className="text">{loading ? t('create_member') : t('sign_up')}</span>
              </Button>
            </Grid>
          </Grid>
          <div className={classes.youMember}>
            <span>{t('are_you_member')}</span>
            <Link onClick={onClickLogin} className={classes.loginLink}>
              {t('login')}
            </Link>
          </div>
        </Box>
      </form>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: '0 0 16px 0',
  },
  register: {
    maxWidth: 730,
    backgroundColor: colors.white,
    margin: '80px auto',
    padding: '23px 95px',
    '& hr': {
      border: 'none',
      height: '1px',
      margin: '0',
      backgroundColor: colors.grayLight,
    },
    '& .MuiGrid-container': {
      marginTop: 0,
      marginBottom: 0,
    },
    '& .MuiGrid-item': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  errorText: {
    color: '#E46D6D',
  },
  title: {
    fontSize: '18px',
    lineHeight: '21.13px',
    fontWeight: 700,
    textAlign: 'center',
    margin: '0',
    paddingBottom: '20px',
  },
  subTitle: {
    fontSize: '14px',
    lineHeight: '16.44px',
    fontWeight: 700,
    margin: '0',
    padding: '32px 0 16px 0',
    color: colors.grayMedium,
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
  contract: {
    padding: '30px 0',
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

    '& .MuiLink-root, & a': {
      display: 'inline-block',
      fontSize: '16px',
      lineHeight: '18.78px',
      fontWeight: '700',
      color: colors.sea,
      textDecoration: 'underline',
    },
  },
  loginLink: {
    cursor: 'pointer',
  },

  successText: {
    fontWeight: 'bold',
    color: colors.iron,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: colors.blueLight,
    border: `2px solid ${colors.sea}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))
