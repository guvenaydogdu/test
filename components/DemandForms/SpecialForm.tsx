import React, { FC, useEffect, useState } from 'react'
import { GLIconInfo, GLIconNext, GLIconStar } from '../../components/Common/GLIcons'
import { makeStyles, Container, Grid, Box, Theme } from '@material-ui/core'
import { GLBox } from '../../components/Common/GLBox'
import { colors } from '../../theme'
import { GLSelect } from '../../components/Common/Forms/GLSelect'
import { GLInput } from '../../components/Common/Forms/GLInput'
import { GLTooltip } from '../../components/Common/GLTooltip'
import { GLCheckBox } from '../../components/Common/Forms/GLCheckBox'
import { GLTextArea } from '../../components/Common/Forms/GLTextarea'
import { GLButton } from '../../components/Common/Forms/GLButtons'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Requests from '../../requests'
import { useAuth } from '../../providers/AuthProvider'
import { IDemandTypesResponse } from '../../interfaces/DemandType'
import { GLPhoneInput } from '../Common/Forms/GLPhoneInput'
import { maskedPhoneToNumber } from '../../utils/validation'
import { IAddSpecialRequest } from '../../interfaces/SpecialRequest'
import { GLSuccessMessage } from '../Common/GLSuccess'

const SpecialFormSchema = yup.object({
  requestName: yup.string().required(),
  requestSurname: yup.string().required(),
  requestEmail: yup.string().email().required(),
  requestPhone: yup.string().required(),
  requestCompanyName: yup.string().required(),
  requestDemandTypeId: yup.number().moreThan(0).required(),
  requestNote: yup.string().required(),
  isAccepted: yup.boolean(),
})
export type ISpecialFormSchema = yup.InferType<typeof SpecialFormSchema>

interface StyleProps {
  color?: string
}

export const SpecialForm: FC = () => {
  const auth = useAuth()
  const requests = Requests()
  const color = colors.blueMedium
  const classes = useStyles({ color })
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [demandsTypes, setDemandTypes] = useState<IDemandTypesResponse | null>(null)

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(SpecialFormSchema),
  })

  useEffect(() => {
    getDemandTypes()
  }, [])

  const getDemandTypes = () => {
    requests.DemanTypeRequest.getList({ pageNumber: 1, pageSize: 100 })
      .then((res) => {
        setDemandTypes(res)
      })
      .catch((err) => console.log(err))
  }

  const onSubmit = (data: ISpecialFormSchema) => {
    if (data.isAccepted) {
      if (auth.user?.userId) {
        const sendData: IAddSpecialRequest = {
          userId: Number(auth.user?.userId),
          requestName: data.requestName,
          requestSurname: data.requestSurname,
          requestEmail: data.requestEmail,
          requestPhone: maskedPhoneToNumber(data.requestPhone),
          requestCompanyName: data.requestCompanyName,
          requestNote: data.requestNote,
          requestDemandTypeId: data.requestDemandTypeId,
        }

        requests.SpecialRequest.create(sendData)
          .then((res) => {
            console.log('ressss', res)
            if (res?.isSuccess) {
              setIsSuccess(true)
            }
          })
          .catch((err) => console.log('err', err))
      } else {
        auth.changeLoginModalStatus()
      }
    }
  }

  console.log('errors', errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.insidePage}>
        <Container maxWidth="lg">
          {isSuccess ? (
            <GLSuccessMessage />
          ) : (
            <Grid container spacing={2} justify="center">
              <Grid item xs={10}>
                <Box className={classes.formTitle}>
                  <span>
                    <i>
                      <GLIconStar color={color} />
                    </i>
                    <span className="title">Özel Hizmet Fiyat Talep Formu</span>
                  </span>
                </Box>
                <GLBox shadow={true}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Controller
                        name="requestName"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLInput
                              label="Adınız"
                              onChange={onChange}
                              value={value}
                              error={errors?.requestName ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="requestSurname"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLInput
                              label="Soyadınız"
                              onChange={onChange}
                              value={value}
                              error={errors?.requestSurname ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="requestEmail"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLInput
                              label="E-mail Adresiniz"
                              onChange={onChange}
                              value={value}
                              error={errors?.requestEmail ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="requestPhone"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLPhoneInput
                              label={'Telefon'}
                              onChange={onChange}
                              value={value}
                              mask="(599) 999 99 99"
                              placeholder="(5__) ___ __ __"
                              error={errors?.requestPhone ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="requestCompanyName"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLInput
                              label="Firma Adı"
                              onChange={onChange}
                              value={value}
                              error={errors?.requestCompanyName ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="requestDemandTypeId"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLSelect
                              label="Yük Tipi"
                              data={demandsTypes?.data.map((item) => {
                                return { id: item.id, label: item.nameEN }
                              })}
                              value={value}
                              onChange={onChange}
                              error={errors?.requestDemandTypeId ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                  </Grid>

                  <hr className={classes.hr} />

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        name="requestNote"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLTextArea
                              label="Notunuz"
                              labelIcon={
                                <GLTooltip title="Yük, yükleme, taşımada özellik arz ettiğiniz düşündüğünüz notları giriniz.">
                                  <GLIconInfo />
                                </GLTooltip>
                              }
                              placeholder="Mesajınızı buraya yazabilirsiniz."
                              onChange={onChange}
                              value={value}
                              error={errors?.requestNote ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box className={classes.checkContract}>
                        <Controller
                          name="isAccepted"
                          control={control}
                          render={({ onChange, value }) => {
                            return (
                              <GLCheckBox value={value} onChange={onChange} color={color}>
                                <Link href="#">Fiyat Talebi Aydınlatma</Link> Metnini Okudum,{' '}
                                <Link href="#">Yasaklı Ürünler</Link> Metnini Okudum, Yükün
                                Uygunluğunu Teyid Ederim.
                              </GLCheckBox>
                            )
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justify="flex-end"
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                  >
                    <Grid item xs={3}>
                      {/*
                      <GLButton
                        text="Geri Dön"
                        textColor={colors.grayMedium}
                        textColorHover={colors.blueDark}
                        bgColor="transparent"
                        bgColorHover={colors.graySoft}
                        shadow={false}
                        iconSize="8px"
                        startIcon={<GLIconPrev />}
                      />
                         */}
                    </Grid>
                    <Grid item xs={4}>
                      <GLButton
                        text="Devam Et"
                        textColor={colors.white}
                        type="submit"
                        textColorHover={colors.white}
                        bgColor={colors.blueMedium}
                        bgColorHover={colors.blueDark}
                        iconSize="8px"
                        endIcon={<GLIconNext />}
                      />
                    </Grid>
                  </Grid>
                </GLBox>
              </Grid>
            </Grid>
          )}
        </Container>
      </div>{' '}
    </form>
  )
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  color: (props) => ({
    color: props.color,
  }),
  hr: {
    border: 'none',
    borderBottom: `1px solid ${colors.grayLight}`,
    margin: '32px 0',
  },
  insidePage: {
    paddingTop: '90px',
  },
  formTitle: (props) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: '10px 43px 10px 43px',
    borderRadius: '10px 10px 0 0',
    marginBottom: '-10px',

    '& > span': {
      display: 'flex',
      alignItems: 'center',
      borderBottom: `2px solid ${props.color}`,
      padding: '0 40px 10px 20px',

      '& i': {
        display: 'block',
        margin: '0 16px',
        lineHeight: 0,

        '& svg': {
          width: 'auto',
          height: '24px',
          fill: props.color,
        },
      },

      '& .title': {
        display: 'block',
        fontWeight: 800,
        fontSize: '14px',
        lineHeight: '16px',
        color: colors.black,
      },
    },
  }),
  searchCheck: {
    '& .MuiFormControlLabel-root': {
      display: 'flex',
      marginLeft: '-11px',

      '& .MuiTypography-root': {
        fontFamily: `'Poppins', sans-serif`,
        fontSize: '14px',
        lineHeight: '186%',
        color: colors.grayMedium,
        padding: '6px 0 0 0',
      },
    },
  },
  checkList: (props) => ({
    '& .MuiFormControlLabel-root': {
      '& .MuiFormControlLabel-label': {
        fontSize: '14px',
        color: colors.grayMedium,
      },

      '& .Mui-checked': {
        '& + .MuiFormControlLabel-label': {
          color: props.color,
        },
      },
    },
  }),
  checkContract: (props) => ({
    '& .MuiFormControlLabel-root': {
      '& .MuiFormControlLabel-label': {
        fontSize: '14px',
        color: colors.black,

        '& a': {
          color: props.color,
        },
      },
    },
  }),
  titleLight: {
    display: 'block',
    fontSize: '14px',
    color: colors.grayMedium,
    fontWeight: 800,
    paddingBottom: '16px',
  },
  cargoStatusWrapper: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '30px',

    '& > div': {
      flexBasis: '100%',
    },
  },
}))
