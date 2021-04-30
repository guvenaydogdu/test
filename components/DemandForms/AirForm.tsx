import React, { FC, useEffect, useState } from 'react'
import { GLIconAirPlane, GLIconDate, GLIconInfo, GLIconNext } from '../../components/Common/GLIcons'
import { makeStyles, Container, Grid, Box, Theme } from '@material-ui/core'
import { GLBox } from '../../components/Common/GLBox'
import { colors } from '../../theme'
import { GLSelect } from '../../components/Common/Forms/GLSelect'
import { GLInput } from '../../components/Common/Forms/GLInput'
import { GLTooltip } from '../../components/Common/GLTooltip'
import { GLRangeButton } from '../../components/Common/Forms/GLRangeButton'
import { GLSwitch } from '../../components/Common/GLSwitch'
import { GLCheckBox } from '../../components/Common/Forms/GLCheckBox'
import { GLTextArea } from '../../components/Common/Forms/GLTextarea'
import { GLButton } from '../../components/Common/Forms/GLButtons'
import Link from 'next/link'
import { GLCargoStatus } from '../../components/Common/GLCargoStatus'
import { GLDatePicker } from '../../components/Common/Forms/GLDatePicker'
import { GLTargetAutoComplete } from '../../components/AutoCompletes/GLTargetAutoComplete'
import { GLCategorySelect } from '../../components/FormItems/GLCategorySelect'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { ISearch } from '../../interfaces/Search'
import Requests from '../../requests'
import { ITransportTypesResponse } from '../../interfaces/TransportTypes'
import {
  ITransportServicePager,
  ITransportServicesResponse,
} from '../../interfaces/TransportService'
import { GLCheckboxServices } from '../FormPage/GLCheckboxServices'
import { IOrderCreate, IOrderTransport } from '../../interfaces/Order'
import { DemandTypes, TransportServiceIds, TransportTypes } from '../../utils/global'
import { useAuth } from '../../providers/AuthProvider'
import { ITransportOptionsResponse } from '../../interfaces/TransportOption'
import { IIncotermsResponse } from '../../interfaces/Incoterm'
import { IDemandTypesResponse } from '../../interfaces/DemandType'
import { GLSuccessMessage } from '../Common/GLSuccess'
import { REMOVE_FORM_INITIAL_DATA, useDataContext } from '../../providers/DataProvider'
import moment from 'moment'
const searchShape: SchemaOf<ISearch> = yup.object({
  locationId: yup.number().required(),
  locationTypeId: yup.number().notRequired(),
  port: yup.string().notRequired().nullable(),
  town: yup.string().notRequired().nullable(),
  city: yup.string().notRequired().nullable(),
  countryLocationId: yup.number().notRequired().nullable(),
  country: yup.string().notRequired().nullable(),
  xCoordinate: yup.number().notRequired(),
  yCoordinate: yup.number().notRequired(),
  locationTypeName: yup.string().notRequired(),
})

const AirFormSchema = yup.object({
  origin: searchShape,
  destination: searchShape,
  productName: yup.string().required(),
  dueDate: yup.string().required(),
  categoryId: yup.number().required(),
  grossWeight: yup.number().required(),
  incotermId: yup.number().required(),
  capacity: yup.number().required(),
  demandTypeId: yup.number().moreThan(0).required(),
  cost: yup.number().required(),
  width: yup.number(),
  size: yup.number(),
  height: yup.number(),
  count: yup.number(),
  needInsurance: yup.boolean().default(false),
  note: yup.string(),
  storeHouse: yup.boolean().default(false),
  hsCode: yup.string(),
  isAccepted: yup.boolean(),
  ids: yup.array().of(yup.number().required()),
})
export type IAirFormSchema = yup.InferType<typeof AirFormSchema>

interface StyleProps {
  color?: string
}

interface IAirFormProps {
  transportTypes: ITransportTypesResponse
}
const transportServicePager: ITransportServicePager = {
  pageNumber: 1,
  pageSize: 100,
  sortDescending: true,
  isVisible: true,
}

export const AirForm: FC<IAirFormProps> = ({ transportTypes }) => {
  const transportTypeId =
    transportTypes.data?.find((x) => x.integrationId == TransportTypes.AIRWAY)?.id || 0
  const { dispatch, globalState } = useDataContext()
  const auth = useAuth()
  const requests = Requests()
  const color = colors.air
  const classes = useStyles({ color })
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [transportServices, setTransportServices] = useState<ITransportServicesResponse | null>(
    null
  )
  const [incoterms, setIncoterms] = useState<IIncotermsResponse | null>(null)

  const [, setTransportOptions] = useState<ITransportOptionsResponse | null>(null)
  const [demandsTypes, setDemandTypes] = useState<IDemandTypesResponse | null>(null)
  const { control, handleSubmit, errors, reset, setError, watch } = useForm({
    resolver: yupResolver(AirFormSchema),
    defaultValues: globalState?.formInitalData ? globalState?.formInitalData : undefined,
  })

  useEffect(() => {
    getDemandTypes()
    getTransportServices()
    getIncoTerms()
    getTransportOptions()
    return () => {
      dispatch({ type: REMOVE_FORM_INITIAL_DATA })
    }
  }, [])

  const getDemandTypes = () => {
    requests.DemanTypeRequest.getList({ pageNumber: 1, pageSize: 100 })
      .then((res) => {
        setDemandTypes(res)
      })
      .catch((err) => console.log(err))
  }

  const getIncoTerms = () => {
    requests.IncotermRequest.getList({ pageNumber: 1, pageSize: 100 })
      .then((res) => setIncoterms(res))
      .catch((err) => console.log(err))
  }
  const getTransportServices = () => {
    requests.TransportServiceRequest.getList(transportServicePager)
      .then((res) => {
        setTransportServices(res)
        return res.data
      })
      .then((data) => {
        const id = data.find((x) => x.integrationId == TransportServiceIds.NAVLUN)?.id
        if (id && !globalState?.formInitalData) {
          reset({
            ids: [id],
            dueDate: moment().toISOString(),
          })
        }
      })
      .catch((err) => console.log(err))
  }

  const getTransportOptions = () => {
    requests.TransportOptionRequest.getList({
      pageNumber: 1,
      pageSize: 100,
      sortDescending: false,
      sortColumn: 'Position',
    })
      .then((res) => setTransportOptions(res))
      .catch((err) => console.log(err))
  }

  const onSubmit = (data: IAirFormSchema) => {
    if (auth.user?.userId) {
      if (data.isAccepted) {
        if (data.demandTypeId == DemandTypes.TOTAL_NUMBER) {
          let errorCount = 0
          // data.width && data.size && data.height && data.count
          if (data.width == undefined || data.width < 0) {
            setError('width', {
              type: 'not_nullable',
              message: 'Not Nullable',
            })
            errorCount += 1
          }
          if (data.size == undefined || data.size < 0) {
            setError('size', {
              type: 'not_nullable',
              message: 'Not Nullable',
            })
            errorCount += 1
          }
          if (data.height == undefined || data.height < 0) {
            setError('height', {
              type: 'not_nullable',
              message: 'Not Nullable',
            })
            errorCount += 1
          }
          if (data.count == undefined || data.count < 1) {
            setError('count', {
              type: 'not_nullable',
              message: 'Not Nullable',
            })
            errorCount += 1
          }

          if (data.needInsurance) {
            if (!data.hsCode) {
              setError('hsCode', {
                type: 'not_nullable',
                message: 'Not Nullable',
              })
              errorCount += 1
            }
          }
          if (errorCount > 0) {
            return
          }

          const transportTemp = data.ids?.map((id) => {
            const integrationId = transportServices?.data.find((x) => x.id == id)?.integrationId
            if (integrationId == TransportServiceIds.NAVLUN) {
              return {
                originLocationId: data.origin.locationId,
                destinationLocationId: data.destination.locationId,
                isLocal: true,
                transportServiceId: id,
              } as IOrderTransport
            } else {
              return {
                originLocationId: data.origin.locationId,
                isLocal: true,
                transportServiceId: id,
              } as IOrderTransport
            }
          })
          const dataId = transportServices?.data.find(
            (x) => x.integrationId == TransportServiceIds.NAVLUN
          )?.id
          if (dataId) {
            const sendData: IOrderCreate = {
              userId: Number(auth.user?.userId),
              transportServiceId: dataId,
              transportTypeId,
              originLocationId: data.origin.locationId,
              destinationLocationId: data.origin.locationId,
              duedate: data.dueDate,
              name: data.productName,
              categoryId: data.categoryId,
              cost: data.cost,
              count: data.count,
              width: data.width,
              height: data.height,
              size: data.size,
              grossWeight: data.grossWeight,
              note: data.note,
              needInsurance: data.needInsurance,
              hsCode: data.hsCode,
              storeHouse: data.storeHouse,
              orderTransports: transportTemp,
              incotermId: data.incotermId,
            }

            requests.OrderRequest.create(sendData)
              .then((res) => {
                console.log('ressss', res)
                if (res?.isSuccess) {
                  setIsSuccess(true)
                }
              })
              .catch((err) => console.log('err', err))
          }
        } else if (data.demandTypeId == DemandTypes.TOTAL_SHIPMENT) {
          let errorCount = 0

          if (data.needInsurance) {
            if (!data.hsCode) {
              setError('hsCode', {
                type: 'not_nullable',
                message: 'Not Nullable',
              })
              errorCount += 1
            }
          }
          if (errorCount > 0) {
            return
          }

          const transportTemp = data.ids?.map((id) => {
            const integrationId = transportServices?.data.find((x) => x.id == id)?.integrationId
            if (integrationId == TransportServiceIds.NAVLUN) {
              return {
                originLocationId: data.origin.locationId,
                destinationLocationId: data.destination.locationId,
                isLocal: true,
                transportServiceId: id,
              } as IOrderTransport
            } else {
              return {
                originLocationId: data.origin.locationId,
                isLocal: true,
                transportServiceId: id,
              } as IOrderTransport
            }
          })
          const dataId = transportServices?.data.find(
            (x) => x.integrationId == TransportServiceIds.NAVLUN
          )?.id
          if (dataId) {
            const sendData: IOrderCreate = {
              userId: Number(auth.user?.userId),
              transportServiceId: dataId,
              transportTypeId,
              originLocationId: data.origin.locationId,
              destinationLocationId: data.origin.locationId,
              duedate: data.dueDate,
              name: data.productName,
              categoryId: data.categoryId,
              cost: data.cost,
              grossWeight: data.grossWeight,
              note: data.note,
              needInsurance: data.needInsurance,
              hsCode: data.hsCode,
              storeHouse: data.storeHouse,
              orderTransports: transportTemp,
              capacity: data.capacity,
              incotermId: data.incotermId,
            }

            requests.OrderRequest.create(sendData)
              .then((res) => {
                console.log('ressss', res)
                if (res?.isSuccess) {
                  reset()
                  setIsSuccess(true)
                }
              })
              .catch((err) => console.log('err', err))
          }
        }
      } else {
        setError('isAccepted', {
          type: 'not_nullable',
          message: 'Not Nullable',
        })
      }
    } else {
      auth.changeLoginModalStatus()
    }
  }

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
                      <GLIconAirPlane color={color} />
                    </i>
                    <span className="title">Havayolu Fiyat Talep Formu</span>
                  </span>
                </Box>
                <GLBox shadow={true}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Controller
                        name="origin"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLTargetAutoComplete
                              onChange={onChange}
                              label="Yükleme Noktası"
                              transportTypeId={transportTypeId}
                              error={errors?.origin ? true : false}
                              value={value}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="destination"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLTargetAutoComplete
                              onChange={onChange}
                              label="Varış Noktası"
                              transportTypeId={transportTypeId}
                              error={errors?.destination ? true : false}
                              value={value}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="dueDate"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLDatePicker
                              label="&nbsp;"
                              value={value}
                              onChange={onChange}
                              startIcon={<GLIconDate color={colors.sea} />}
                              endIcon={
                                <GLTooltip title="Lütfen yükün taşımaya hazır hale getirileceği tarihi giriniz.">
                                  <GLIconInfo />
                                </GLTooltip>
                              }
                            />
                          )
                        }}
                      />
                    </Grid>
                  </Grid>

                  <hr className={classes.hr} />

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Controller
                        name="categoryId"
                        control={control}
                        render={({ onChange }) => {
                          return (
                            <GLCategorySelect
                              onChange={onChange}
                              error={errors?.categoryId ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="productName"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLInput
                              label="Ürün Cinsi / Adı"
                              onChange={onChange}
                              value={value}
                              error={errors?.productName ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="cost"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLInput
                              label="Yük Bedeli"
                              onChange={onChange}
                              value={value}
                              error={errors?.cost ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="demandTypeId"
                        control={control}
                        defaultValue={DemandTypes.TOTAL_NUMBER}
                        render={({ onChange, value }) => {
                          return (
                            <GLSelect
                              label="Talep Çeşidi"
                              data={demandsTypes?.data.map((item) => {
                                return { id: item.id, label: item.nameTR }
                              })}
                              value={value}
                              onChange={onChange}
                              error={errors?.demandTypeId ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="grossWeight"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLInput
                              label="Bürüt Ağırlık"
                              placeholder="Kg"
                              value={value}
                              onChange={onChange}
                              error={errors?.grossWeight ? true : false}
                              endIcon={
                                <GLTooltip title="Lütfen ürünün taşımaya hazır hale geldiği andaki tahmini ağırlığı giriniz.">
                                  <GLIconInfo />
                                </GLTooltip>
                              }
                            />
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Controller
                        name="capacity"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLInput
                              label="Hacim"
                              placeholder="Kg"
                              value={value}
                              onChange={onChange}
                              error={errors?.capacity ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="incotermId"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLSelect
                              label="INCOTERM"
                              labelIcon={
                                <GLTooltip title="İthalat ve ihracatta teslim şekilleri üzerine oluşturulduğu kavramların ”International Commercial Terms” kısaltılmış ismidir. (CIF, FOB, EXW, DAP, vb gibi).">
                                  <GLIconInfo />
                                </GLTooltip>
                              }
                              data={incoterms?.data.map((item) => {
                                return { id: item.id, label: item.name }
                              })}
                              value={value}
                              onChange={onChange}
                              error={errors?.incotermId ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                  </Grid>

                  {watch('demandTypeId') == DemandTypes.TOTAL_NUMBER && (
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Controller
                              name="width"
                              control={control}
                              render={({ onChange, value }) => {
                                return (
                                  <GLInput
                                    label="Ölçüler"
                                    placeholder="En"
                                    onChange={onChange}
                                    value={value}
                                    error={errors?.width ? true : false}
                                  />
                                )
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Controller
                              name="size"
                              control={control}
                              render={({ onChange, value }) => {
                                return (
                                  <GLInput
                                    label="&nbsp;"
                                    placeholder="Boy"
                                    onChange={onChange}
                                    value={value}
                                    error={errors?.size ? true : false}
                                  />
                                )
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Controller
                              name="height"
                              control={control}
                              render={({ onChange, value }) => {
                                return (
                                  <GLInput
                                    label="&nbsp;"
                                    placeholder="Yükseklik"
                                    onChange={onChange}
                                    value={value}
                                    error={errors?.height ? true : false}
                                  />
                                )
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name="count"
                          control={control}
                          render={({ onChange, value }) => {
                            return (
                              <GLRangeButton
                                value={value}
                                onChange={onChange}
                                size="large"
                                label="Adet"
                                color={color}
                                labelPosition="top"
                                error={errors?.count ? true : false}
                              />
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                  <hr className={classes.hr} />

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={5}>
                      <strong className={classes.titleLight}>Hizmet Çeşidi</strong>
                      <Box className={classes.checkList}>
                        <Controller
                          name="ids"
                          control={control}
                          render={({ onChange, value }) => {
                            return (
                              <GLCheckboxServices
                                transportServices={transportServices}
                                originLocationId={watch('origin')?.countryLocationId}
                                value={value}
                                onChange={onChange}
                                color={color}
                              />
                            )
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={classes.cargoStatusWrapper}>
                        <GLCargoStatus color={color} />
                      </div>
                    </Grid>
                  </Grid>

                  <hr className={classes.hr} />

                  <strong className={classes.titleLight}>Ek Hizmetler</strong>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box className={classes.checkList}>
                        <Controller
                          name="needInsurance"
                          control={control}
                          render={({ onChange, value }) => {
                            return (
                              <GLCheckBox color={color} value={value} onChange={onChange}>
                                Sigorta İstiyorum
                              </GLCheckBox>
                            )
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item lg={4}>
                      {watch('needInsurance') == true && (
                        <Controller
                          name="hsCode"
                          control={control}
                          render={({ onChange, value }) => {
                            return (
                              <GLInput
                                placeholder="HS Kodu"
                                endIcon={
                                  <GLTooltip title="Verilen hizmetler sadece genel hükümler çercevesinde tanzim olunan  ‘’Taşıyıcı Sigorta Sorumluluk Poliçesi’’ kapsamında sigortalandırılmış olacaktır">
                                    <GLIconInfo />
                                  </GLTooltip>
                                }
                                onChange={onChange}
                                value={value}
                                label="HS Kodu"
                                error={errors?.hsCode ? true : false}
                              />
                            )
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item lg={3}>
                      {watch('needInsurance') == true && (
                        <Controller
                          name="storeHouse"
                          control={control}
                          render={({ onChange, value }) => {
                            return (
                              <GLSwitch
                                tooltiptext="Bu seçeneğin işaretlenmesi halinde ilave ardiye hizmetleri ile ilgili talep olduğu Kabul edilerek, ardiye ücretli bir fiyat teklifi oluşturulacaktır."
                                color={color}
                                value={value}
                                label="Ardiye Hizmeti"
                                labelPosition="top"
                                onChange={onChange}
                              />
                            )
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="note"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLTextArea
                              label="Notunuz"
                              labelIcon={
                                <GLTooltip title="Yük, yükleme, taşımada özellik arz ettiğiniz düşündüğünüz notları giriniz">
                                  <GLIconInfo />
                                </GLTooltip>
                              }
                              placeholder="Mesajınızı buraya yazabilirsiniz."
                              onChange={onChange}
                              value={value}
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
                              <GLCheckBox
                                value={value}
                                onChange={onChange}
                                color={color}
                                error={errors?.isAccepted ? true : false}
                              >
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
                        type="submit"
                        textColor={colors.white}
                        textColorHover={colors.white}
                        bgColor={colors.sea}
                        bgColorHover={colors.seaHover}
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
      </div>
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
