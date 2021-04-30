import { Box, Container, Grid } from '@material-ui/core'
import makeStyles from '@material-ui/styles/makeStyles'
import React, { useEffect, useState } from 'react'
import { colors } from '../../theme'
import { GLButton } from '../Common/Forms/GLButtons'
import { GLInput } from '../Common/Forms/GLInput'

import { useTranslation } from 'next-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import Requests from '../../requests'
import { useAuth } from '../../providers/AuthProvider'
import { GLCountryAutoComplete, countrySchema } from '../AutoCompletes/GLCountryAutoComplete'
import { GLCityAutoComplete, citySchema } from '../AutoCompletes/GLCityAutoComplete'
import { GLPhoneInput } from '../Common/Forms/GLPhoneInput'
import { GLTitleLine } from '../Common/GLTitleLine'
import { GLIconPrev } from '../Common/GLIcons'
import { maskedPhoneToNumber } from '../../utils/validation'

const companyInformationSchema = yup.object({
  companyName: yup.string().required(),
  companyPhone: yup.string().required(),
  accountType: yup.string().required(),
  country: countrySchema,
  city: citySchema,
  address: yup.string().required(),
  postalCode: yup.string().required(),
  taxNo: yup.string().required(),
  taxAdministration: yup.string().required(),
  website: yup.string().required(),
  about: yup.string().required(),
})

export type ICompanyInformationtFormData = yup.InferType<typeof companyInformationSchema>

export const CompanyInformation = () => {
  const requests = Requests()
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true)
  const [isSucces, setIsSucces] = useState<boolean>(false)
  const [companyUserId, setCompanyUserId] = useState<number>(0)

  const { user } = useAuth()
  const { t } = useTranslation()
  const classes = useStyles()

  const { control, handleSubmit, reset, watch, errors } = useForm({
    resolver: yupResolver(companyInformationSchema),
  })
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    if (user?.userId) {
      requests.UserCompanyRequest.getByUserId(user?.userId)
        .then((res) => {
          reset({
            ...res.data,
          })
          return res
        })
        .then((res) => {
          setCompanyUserId(res.data.id)
        })
        .catch((err) => console.log(err))
    }
  }

  const onSubmit = (data: ICompanyInformationtFormData) => {
    if (user?.userId) {
      requests.UserCompanyRequest.update({
        id: companyUserId,
        userId: Number(user?.userId),

        companyName: data.companyName,
        companyPhone: maskedPhoneToNumber(data.companyPhone),
        accountType: data.accountType,
        countryId: data.country.id,
        cityId: data.city.id,
        address: data.address,
        postalCode: data.postalCode,
        taxNo: data.taxNo,
        taxAdministration: data.taxAdministration,
        website: data.website,
        about: data.about,
      })
        .then((res) => {
          if (res.isSuccess) {
            getData()
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
        title={t('company_information')}
        message={isSucces ? t('information_changed_succesed') : undefined}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('company_title')}</span>
                <span className="text">{watch('companyName')}</span>
              </Box>
            ) : (
              <Controller
                name="companyName"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('company_title')}
                      onChange={onChange}
                      value={value}
                      error={errors?.companyName ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('company_adress')}</span>
                <span className="text">{watch('address')}</span>
              </Box>
            ) : (
              <Controller
                name="address"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('company_adress')}
                      onChange={onChange}
                      value={value}
                      error={errors?.address ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('account_type')}</span>
                <span className="text">{watch('accountType')}</span>
              </Box>
            ) : (
              <Controller
                name="accountType"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('account_type')}
                      onChange={onChange}
                      value={value}
                      error={errors?.accountType ? true : false}
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
                <span className="text">{watch('companyPhone')}</span>
              </Box>
            ) : (
              <Controller
                name="companyPhone"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLPhoneInput
                      label={t('phone')}
                      onChange={onChange}
                      value={value}
                      mask="(299) 999 99 99"
                      placeholder="(5__) ___ __ __"
                      error={errors?.companyPhone ? true : false}
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
                      value={value}
                      countryId={watch('country')?.id}
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
                <span className="title">{t('post_code')}</span>
                <span className="text">{watch('postalCode')}</span>
              </Box>
            ) : (
              <Controller
                name="postalCode"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('post_code')}
                      onChange={onChange}
                      value={value}
                      error={errors?.postalCode ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('website')}</span>
                <span className="text">{watch('website')}</span>
              </Box>
            ) : (
              <Controller
                name="website"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('website')}
                      onChange={onChange}
                      value={value}
                      error={errors?.website ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('about')}</span>
                <span className="text">{watch('about')}</span>
              </Box>
            ) : (
              <Controller
                name="about"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('about')}
                      onChange={onChange}
                      value={value}
                      error={errors?.about ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('tax_administration')}</span>
                <span className="text">{watch('taxAdministration')}</span>
              </Box>
            ) : (
              <Controller
                name="taxAdministration"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('tax_administration')}
                      onChange={onChange}
                      value={value}
                      error={errors?.taxAdministration ? true : false}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {isReadOnly ? (
              <Box className={classes.formView}>
                <span className="title">{t('tax_no')}</span>
                <span className="text">{watch('taxNo')}</span>
              </Box>
            ) : (
              <Controller
                name="taxNo"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label={t('tax_no')}
                      onChange={onChange}
                      value={value}
                      error={errors?.taxNo ? true : false}
                    />
                  )
                }}
              />
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
                  reset()
                  setIsReadOnly(!isReadOnly)
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
