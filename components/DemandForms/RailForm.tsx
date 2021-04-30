import React, { FC, useEffect, useState } from 'react'
import { GLIconDate, GLIconInfo, GLIconNext, GLIconRailway } from '../../components/Common/GLIcons'
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
import { IPackingTypesResponse } from '../../interfaces/PackingType'

import { IImoClassesResponse } from '../../interfaces/ImoClass'
import { ITransportTypesResponse } from '../../interfaces/TransportTypes'
import {
  ITransportServicePager,
  ITransportServicesResponse,
} from '../../interfaces/TransportService'
import { GLCheckboxServices } from '../FormPage/GLCheckboxServices'
import { IOrderCreate, IOrderTransport } from '../../interfaces/Order'
import { TransportServiceIds, TransportTypes } from '../../utils/global'
import { useAuth } from '../../providers/AuthProvider'
import { ILoadTypesResponse } from '../../interfaces/LoadType'
import { ICarriageTypesResponse } from '../../interfaces/CarriageType'
import { GLSuccessMessage } from '../Common/GLSuccess'
import { REMOVE_FORM_INITIAL_DATA, useDataContext } from '../../providers/DataProvider'
import moment from 'moment'
//test
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

const RailFormSchema = yup.object({
  origin: searchShape,
  destination: searchShape,
  productName: yup.string().required(),
  dueDate: yup.string().required(),
  categoryId: yup.number().moreThan(0).required(),
  cost: yup.number().required(),
  loadTypeId: yup.number().moreThan(0).required(),
  packingTypeId: yup.number().moreThan(0).required(),
  carriageTypeId: yup.number().moreThan(0).required(),
  width: yup.number().moreThan(0),
  size: yup.number().moreThan(0),
  height: yup.number().moreThan(0),
  count: yup.number().moreThan(0),
  imo: yup.boolean().default(false),
  imoClassId: yup.number(),
  unCode: yup.string(),
  note: yup.string().required(),
  needInsurance: yup.boolean().default(false),
  storeHouse: yup.boolean().default(false),
  hsCode: yup.string(),
  isAccepted: yup.boolean(),
  ids: yup.array().of(yup.number().required()),
})
export type IRailFormSchema = yup.InferType<typeof RailFormSchema>

interface StyleProps {
  color?: string
}

interface IRailFormProps {
  transportTypes: ITransportTypesResponse
}
const transportServicePager: ITransportServicePager = {
  pageNumber: 1,
  pageSize: 100,
  sortDescending: true,
  isVisible: true,
}

export const RailForm: FC<IRailFormProps> = ({ transportTypes }) => {
  const transportTypeId =
    transportTypes.data?.find((x) => x.integrationId == TransportTypes.RAILWAY)?.id || 0
  const { dispatch, globalState } = useDataContext()

  const auth = useAuth()
  const requests = Requests()
  const color = colors.railway
  const classes = useStyles({ color })
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [imoClasses, setImoClasses] = useState<IImoClassesResponse | null>(null)
  const [loadTypes, setLoadTypes] = useState<ILoadTypesResponse | null>(null)
  const [packingTypes, setPackingTypes] = useState<IPackingTypesResponse | null>(null)
  const [types, setTypes] = useState<ICarriageTypesResponse | null>(null)

  const [transportServices, setTransportServices] = useState<ITransportServicesResponse | null>(
    null
  )

  const { control, handleSubmit, errors, reset, setError, watch } = useForm({
    resolver: yupResolver(RailFormSchema),
    defaultValues: globalState?.formInitalData ? globalState?.formInitalData : undefined,
  })

  useEffect(() => {
    getTransportServices()
    getLoadType()
    getPackingType()
    getTypes()
    getImoClass()
    return () => {
      dispatch({ type: REMOVE_FORM_INITIAL_DATA })
    }
  }, [])

  const getImoClass = () => {
    requests.ImoClassRequest.getList({ pageNumber: 1, pageSize: 100, sortDescending: true })
      .then((res) => setImoClasses(res))
      .catch((err) => console.log(err))
  }
  const getLoadType = () => {
    requests.LoadTypeRequest.getList({ pageNumber: 1, pageSize: 100, sortDescending: true })
      .then((res) => setLoadTypes(res))
      .catch((err) => console.log(err))
  }

  const getPackingType = () => {
    requests.PackingTypesRequest.getList({ pageNumber: 1, pageSize: 100, sortDescending: true })
      .then((res) => {
        setPackingTypes(res)
      })
      .catch((err) => console.log(err))
  }
  const getTypes = () => {
    requests.CarriageTypeRequest.getList({ pageNumber: 1, pageSize: 100, sortDescending: true })
      .then((res) => setTypes(res))
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

  const onSubmit = (data: IRailFormSchema) => {
    if (auth.user?.userId) {
      if (data.isAccepted) {
        let errorCount = 0
        // data.width && data.size && data.height && data.count

        if (data.imo) {
          if (!data.imoClassId || data.imoClassId < 0) {
            setError('imoClassId', {
              type: 'not_nullable',
              message: 'Not Nullable',
            })
            errorCount += 1
          }
          if (!data.unCode) {
            setError('unCode', {
              type: 'not_nullable',
              message: 'Not Nullable',
            })
            errorCount += 1
          }
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
              isLocal: false,
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
        if (auth.user?.userId && dataId) {
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
            loadTypeId: data.loadTypeId,
            imo: data.imo,
            imoClassId: data.imoClassId,
            unCode: data.unCode,
            note: data.note,
            needInsurance: data.needInsurance,
            hsCode: data.hsCode,
            carriageTypeId: data.carriageTypeId,
            storeHouse: data.storeHouse,
            orderTransports: transportTemp,
          }

          requests.OrderRequest.create(sendData)
            .then((res) => {
              if (res?.isSuccess) {
                reset()
                setIsSuccess(true)
              }
            })
            .catch((err) => console.log('err', err))
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
                      <GLIconRailway color={color} />
                    </i>
                    <span className="title">Demiryolu Fiyat Talep Formu</span>
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
                        defaultValue=""
                        render={({ onChange, value }) => {
                          return (
                            <GLDatePicker
                              label="&nbsp;"
                              value={value}
                              onChange={onChange}
                              startIcon={<GLIconDate color={colors.sea} />}
                              endIcon={
                                <GLTooltip title="Bu seçeneğin işaretlenmesi halinde ilave ardiye hizmetleri ile ilgili talep olduğu Kabul edilerek, ardiye ücretli bir fiyat teklifi oluşturulacaktır.">
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
                        name="loadTypeId"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLSelect
                              label="Yük Tipi"
                              data={loadTypes?.data.map((item) => {
                                return { id: item.id, label: item.nameEN }
                              })}
                              value={value}
                              onChange={onChange}
                              error={errors?.loadTypeId ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="packingTypeId"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLSelect
                              label="Paketleme Çeşidi"
                              data={packingTypes?.data.map((item) => {
                                return { id: item.id, label: item.nameTR }
                              })}
                              value={value}
                              onChange={onChange}
                              error={errors?.packingTypeId ? true : false}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="carriageTypeId"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLSelect
                              label="Vagon Tipi"
                              data={types?.data.map((item) => {
                                return { id: item.id, label: item.nameEN }
                              })}
                              value={value}
                              onChange={onChange}
                            />
                          )
                        }}
                      />
                    </Grid>
                  </Grid>

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

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Controller
                        name="imo"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLSwitch
                              label="IMO"
                              labelPosition="top"
                              onChange={onChange}
                              value={value}
                              color={color}
                            />
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      {watch('imo') == true && (
                        <Controller
                          name="imoClassId"
                          control={control}
                          render={({ onChange, value }) => {
                            return (
                              <GLSelect
                                label="Class"
                                data={imoClasses?.data.map((item) => {
                                  return { id: item.id, label: item.nameTR }
                                })}
                                value={value}
                                onChange={onChange}
                                error={errors?.imoClassId ? true : false}
                              />
                            )
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      {watch('imo') == true && (
                        <Controller
                          name="unCode"
                          control={control}
                          render={({ onChange, value }) => {
                            return (
                              <GLInput
                                label=" Un Numarası"
                                value={value}
                                onChange={onChange}
                                error={errors?.unCode ? true : false}
                              />
                            )
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>

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
                                  <GLTooltip title="Verilen hizmetler sadece genel hükümler çercevesinde tanzim olunan  ‘’Taşıyıcı Sigorta Sorumluluk Poliçesi’’ kapsamında sigortalandırılmış olacaktır.">
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
                                <GLTooltip title="Yük, yükleme, taşımada özellik arz ettiğiniz düşündüğünüz notları giriniz.">
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
                      {/** 
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
