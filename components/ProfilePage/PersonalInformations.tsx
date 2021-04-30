import { Box, Container, Grid } from '@material-ui/core'
import makeStyles from '@material-ui/styles/makeStyles'
import React, { useEffect, useState } from 'react'
import { colors } from '../../theme'
import { GLButton } from '../Common/Forms/GLButtons'
import { GLCheckBox } from '../Common/Forms/GLCheckBox'
import Collapse from '@material-ui/core/Collapse'
import { GLInput } from '../Common/Forms/GLInput'
import Requests from '../../requests'
import { useAuth } from '../../providers/AuthProvider'
import { useTranslation } from 'next-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { PasswordChange } from './PasswordChange'
import { GLTitleLine } from '../Common/GLTitleLine'
import Link from 'next/link'
import { GLIconPrev } from '../Common/GLIcons'
import { GLCountryAutoComplete, countrySchema } from '../AutoCompletes/GLCountryAutoComplete'
import { GLCityAutoComplete, citySchema } from '../AutoCompletes/GLCityAutoComplete'
import { GLPhoneInput } from '../Common/Forms/GLPhoneInput'
import { maskedPhoneToNumber } from '../../utils/validation'

const personalInformationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  country: countrySchema,
  city: citySchema,
  department: yup.string().required(),
  jobTitle: yup.string().required(),
})

export type IPersonalInformationtFormData = yup.InferType<typeof personalInformationSchema>

export const PersonalInformation = () => {
  const classes = useStyles()
  const requests = Requests()
  const auth = useAuth()
  const { t } = useTranslation()
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true)
  const [isSucces, setIsSucces] = useState<boolean>(false)

  const { control, reset, watch, handleSubmit, errors } = useForm({
    resolver: yupResolver(personalInformationSchema),
  })

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = () => {
    if (auth.user?.userId) {
      requests.UserRequest.get(auth.user?.userId)
        .then((res) => {
          reset({
            ...res.data,
          })
        })
        .catch((err) => console.log(err))
    }
  }

  const onSubmit = (data: IPersonalInformationtFormData) => {
    if (auth.user?.userId) {
      requests.UserRequest.update({
        id: Number(auth.user?.userId),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: maskedPhoneToNumber(data.phone),
        countryId: data.country.id,
        cityId: data.city.id,
        department: data.department,
        jobTitle: data.jobTitle,
      })
        .then((res) => {
          if (res.isSuccess) {
            getUserData()
            setIsSucces(true)

            setTimeout(() => {
              setIsReadOnly(true)
            }, 1000)

            setTimeout(() => {
              setIsSucces(false)
            }, 6000)
          }
        })
        .catch((err) => console.log(err))
    }
  }
  return (
    <Container className={classes.contentContainer}>
      <GLTitleLine
        title={t('my_personal_information')}
        message={isSucces ? t('information_changed_succesed') : undefined}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('name')}</span>
                <span className="text">{watch('firstName')}</span>
              </Box>
            ) : (
              <Controller
                name="firstName"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('name')}
                      onChange={onChange}
                      value={value}
                      error={errors?.firstName ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('surname')}</span>
                <span className="text">{watch('lastName')}</span>
              </Box>
            ) : (
              <Controller
                name="lastName"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('surname')}
                      onChange={onChange}
                      value={value}
                      error={errors?.lastName ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('e_mail_adress')}</span>
                <span className="text">{watch('email')}</span>
              </Box>
            ) : (
              <Controller
                name="email"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('e_mail_adress')}
                      onChange={onChange}
                      value={value}
                      error={errors?.email ? true : false}
                      disabled={true}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('phone')}</span>
                <span className="text">{watch('phone')}</span>
              </Box>
            ) : (
              <Controller
                name="phone"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLPhoneInput
                      label={t('phone')}
                      onChange={onChange}
                      value={value}
                      mask="(599) 999 99 99"
                      placeholder="(5__) ___ __ __"
                      error={errors?.phone ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('country')}</span>
                <span className="text">{watch('country')?.name}</span>
              </Box>
            ) : (
              <Controller
                name="country"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLCountryAutoComplete
                      label={t('country')}
                      onChange={onChange}
                      value={value}
                      error={errors?.country ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('city')}</span>
                <span className="text">{watch('city')?.name}</span>
              </Box>
            ) : (
              <Controller
                name="city"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLCityAutoComplete
                      label={t('city')}
                      onChange={onChange}
                      countryId={watch('country')?.id}
                      value={value}
                      error={errors?.city ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('department')}</span>
                <span className="text">{watch('department')}</span>
              </Box>
            ) : (
              <Controller
                name="department"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('department')}
                      onChange={onChange}
                      value={value}
                      error={errors?.department ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('job_position')}</span>
                <span className="text">{watch('jobTitle')}</span>
              </Box>
            ) : (
              <Controller
                name="jobTitle"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('job_position')}
                      onChange={onChange}
                      value={value}
                      error={errors?.jobTitle ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            {isReadOnly && (
              <GLCheckBox
                value={false}
                onChange={() => {
                  console.log('t')
                }}
              >
                <Link href="/">Üyelik Sözleşmesi</Link> şartlarını okudum kabul ediyorum,
                shipeedy.com&apos;a üye olarak <Link href="/">KVKK Aydınlatma Metni</Link>&apos;ni
                okudum, Kabul ediyorum.
              </GLCheckBox>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2} justify="flex-end">
          {!isReadOnly && (
            <Grid item xs={3}>
              <GLButton
                text="Geri Dön"
                textColor={colors.grayMedium}
                textColorHover={colors.blueDark}
                borderColor="transparent"
                bgColor="transparent"
                bgColorHover={colors.graySoft}
                shadow={false}
                iconSize="8px"
                startIcon={<GLIconPrev />}
                onClick={() => {
                  setIsReadOnly(!isReadOnly)
                  reset()
                }}
              />
            </Grid>
          )}
          <Grid item xs={3}>
            {isReadOnly && (
              <GLButton
                text={'Düzenle'}
                onClick={() => {
                  setIsReadOnly(!isReadOnly)
                }}
                bgColor={colors.white}
                bgColorHover={colors.sea}
                textColor={colors.sea}
                textColorHover={colors.white}
                borderColor={colors.sea}
                shadow={false}
              />
            )}
            {!isReadOnly && (
              <GLButton
                text={'Güncelle'}
                bgColor={colors.white}
                bgColorHover={colors.sea}
                textColor={colors.sea}
                textColorHover={colors.white}
                borderColor={colors.sea}
                shadow={false}
                type={'submit'}
              />
            )}
          </Grid>
        </Grid>
      </form>
      <Collapse in={isReadOnly}>
        <br />
        <hr />
        <PasswordChange />
      </Collapse>
    </Container>
  )
}

const useStyles = makeStyles(() => ({
  contentContainer: {
    padding: '32px 65px',

    '& hr': {
      border: 'none',
      height: '1px',
      margin: '0',
      backgroundColor: colors.grayLight,
      marginBottom: '28px',
    },
  },
  formView: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    lineHeight: '16px',

    '& .title': {
      display: 'block',
      fontWeight: 700,
      color: colors.grayMedium,
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      paddingBottom: '.5rem',
    },
    '& .text': {
      display: 'block',
      fontWeight: 400,
      color: colors.black,
      fontFeatureSettings: "'pnum' on, 'lnum' on",
    },
  },
}))
