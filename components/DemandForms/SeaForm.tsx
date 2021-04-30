import React, { FC, useEffect, useState } from 'react'
import { GLIconDate, GLIconInfo, GLIconNext, GLIconShip } from '../../components/Common/GLIcons'
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
import { ITranportTypeContainersResponse } from '../../interfaces/TransportTypeContainer'
import { IImoClassesResponse } from '../../interfaces/ImoClass'
import { ITransportTypesResponse } from '../../interfaces/TransportTypes'
import {
  ITransportServicePager,
  ITransportServicesResponse,
} from '../../interfaces/TransportService'
import { GLCheckboxServices } from '../FormPage/GLCheckboxServices'
import { IOrderCreate, IOrderTransport } from '../../interfaces/Order'
import {
  SeaTransportContainersTypeIds,
  TransportServiceIds,
  TransportTypes,
} from '../../utils/global'
import { useAuth } from '../../providers/AuthProvider'
import { ITransportOptionsResponse } from '../../interfaces/TransportOption'
import { ILoadTypesResponse } from '../../interfaces/LoadType'
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

const seaFormSchema = yup.object({
  origin: searchShape,
  destination: searchShape,
  productName: yup.string().required(),
  dueDate: yup.string().required(),
  categoryId: yup.number().required(),
  grossWeight: yup.number().required(),
  transportTypeContainerId: yup.number().required(),
  transportOptionId: yup.number(),
  cost: yup.number().required(),
  width: yup.number(),
  size: yup.number(),
  height: yup.number(),
  count: yup.number(),
  imo: yup.boolean().default(false),
  imoClassId: yup.number(),
  unCode: yup.string(),
  hoardable: yup.boolean().default(false),
  floorCount: yup.number(),
  packingTypeId: yup.number(),
  needInsurance: yup.boolean().default(false),
  loweringSpeed: yup.number(),
  loadingSpeed: yup.number(),
  loadTypeId: yup.number(),
  note: yup.string(),
  storeHouse: yup.boolean().default(false),
  hsCode: yup.string(),
  isAccepted: yup.boolean(),
  ids: yup.array().of(yup.number().required()),
})
export type ISeaFormSchema = yup.InferType<typeof seaFormSchema>

interface StyleProps {
  color?: string
}

interface ISeaFormProps {
  transportTypes: ITransportTypesResponse
  transportContainers: ITranportTypeContainersResponse
  fromDemands?: boolean
  customerId?: number
}
const transportServicePager: ITransportServicePager = {
  pageNumber: 1,
  pageSize: 100,
  sortDescending: true,
  isVisible: true,
}

export const SeaForm: FC<ISeaFormProps> = ({
  transportTypes,
  transportContainers,
  fromDemands,
  customerId,
}) => {
  const transportTypeId =
    transportTypes.data?.find((x) => x.integrationId == TransportTypes.SEAWAY)?.id || 0

  const { dispatch, globalState } = useDataContext()
  const auth = useAuth()
  const requests = Requests()
  const color = colors.sea
  const classes = useStyles({ color })
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [packingTypes, setPackingTypes] = useState<IPackingTypesResponse | null>(null)
  const [transportTypeContainer] = useState<ITranportTypeContainersResponse>(transportContainers)
  const [imoClasses, setImoClasses] = useState<IImoClassesResponse | null>(null)
  const [transportServices, setTransportServices] = useState<ITransportServicesResponse | null>(
    null
  )
  const [loadTypes, setLoadTypes] = useState<ILoadTypesResponse | null>(null)

  const [transportOption, setTransportOptions] = useState<ITransportOptionsResponse | null>(null)
  const [multipleTransportOptions, setMultipleTransportOptions] = useState<
    | {
        id: number
        count: number
      }[]
    | null
    | undefined
  >(globalState?.formInitalData?.transportOptions)

  const { control, handleSubmit, errors, reset, setError, watch } = useForm({
    resolver: yupResolver(seaFormSchema),
    defaultValues: globalState?.formInitalData
      ? globalState?.formInitalData
      : {
          transportTypeContainerId: transportContainers.data.find(
            (x) => x.integrationId == SeaTransportContainersTypeIds.LCL
          )?.id,
        },
  })

  useEffect(() => {
    getTransportServices()
    getPackingType()
    getImoClass()
    getTransportOptions()
    getLoadType()
    return () => {
      dispatch({ type: REMOVE_FORM_INITIAL_DATA })
    }
  }, [])

  const getPackingType = () => {
    requests.PackingTypesRequest.getList({ pageNumber: 1, pageSize: 100, sortDescending: true })
      .then((res) => {
        setPackingTypes(res)
      })
      .catch((err) => console.log(err))
  }

  const getImoClass = () => {
    requests.ImoClassRequest.getList({ pageNumber: 1, pageSize: 100, sortDescending: true })
      .then((res) => setImoClasses(res))
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
            transportTypeContainerId: transportContainers.data.find(
              (x) => x.integrationId == SeaTransportContainersTypeIds.LCL
            )?.id,
            ids: [id],
            dueDate: moment().toISOString(),
          })
        }
      })
      .catch((err) => console.log(err))
  }

  const onChangeOptions = (deleteId: number, newId: number) => {
    const newData = multipleTransportOptions?.filter((x) => x.id != deleteId)
    newData?.push({ id: newId, count: 0 })
    if (newData) setMultipleTransportOptions(newData)
  }

  const onChangeOptionCount = (optionId: number, count: number) => {
    const newData = multipleTransportOptions?.filter((x) => x.id != optionId)
    newData?.push({ id: optionId, count: count })
    if (newData) setMultipleTransportOptions(newData)
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
  const getLoadType = () => {
    requests.LoadTypeRequest.getList({ pageNumber: 1, pageSize: 100, sortDescending: true })
      .then((res) => setLoadTypes(res))
      .catch((err) => console.log(err))
  }

  const onSubmit = (data: ISeaFormSchema) => {
    if (auth.user?.userId) {
      if (data.isAccepted) {
        if (
          data.transportTypeContainerId ==
          transportContainers.data.find((x) => x.integrationId == SeaTransportContainersTypeIds.LCL)
            ?.id
        ) {
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

          if (data.hoardable) {
            if (!data.floorCount || data.floorCount < 0) {
              setError('floorCount', {
                type: 'not_nullable',
                message: 'Not Nullable',
              })
              errorCount += 1
            }
            if (!data.packingTypeId || data.packingTypeId < 0) {
              setError('packingTypeId', {
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
              userId: fromDemands ? (customerId as number) : Number(auth.user?.userId),
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
              transportTypeContainerId: data.transportTypeContainerId,
              grossWeight: data.grossWeight,
              imo: data.imo,
              imoClassId: data.imoClassId,
              unCode: data.unCode,
              note: data.note,
              hoardable: data.hoardable,
              floorCount: data.floorCount,
              packingTypeId: data.packingTypeId,
              needInsurance: data.needInsurance,
              hsCode: data.hsCode,
              storeHouse: data.storeHouse,
              orderTransports: transportTemp,
            }

            requests.OrderRequest.create(sendData)
              .then((res) => {
                if (res?.isSuccess) {
                  setIsSuccess(true)
                }
              })
              .catch((err) => console.log('err', err))
          }
        } else if (
          data.transportTypeContainerId ==
          transportContainers.data.find((x) => x.integrationId == SeaTransportContainersTypeIds.FCL)
            ?.id
        ) {
          let errorCount = 0
          if (!fromDemands && (data.transportOptionId == undefined || data.transportOptionId < 0)) {
            setError('transportOptionId', {
              type: 'not_nullable',
              message: 'Not Nullable',
            })
            errorCount += 1
          }
          if (!fromDemands && (data.count == undefined || data.count < 1)) {
            setError('count', {
              type: 'not_nullable',
              message: 'Not Nullable',
            })
            errorCount += 1
          }
          if (fromDemands && multipleTransportOptions && multipleTransportOptions?.length < 1) {
            setError('transportOptionId', {
              type: 'not_nullable',
              message: 'Not Nullable',
            })
            errorCount += 1
          }

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

          const transportTemp: IOrderTransport[] = []

          if (fromDemands) {
            data.ids?.forEach((id) => {
              const integrationId = transportServices?.data.find((x) => x.id == id)?.integrationId
              if (integrationId == TransportServiceIds.NAVLUN) {
                multipleTransportOptions?.forEach((tO) => {
                  transportTemp.push({
                    originLocationId: data.origin.locationId,
                    destinationLocationId: data.destination.locationId,
                    isLocal: false,
                    transportServiceId: id,
                    count: tO.count,
                    transportOptionId: tO.id,
                  } as IOrderTransport)
                })
              } else {
                transportTemp.push({
                  originLocationId: data.origin.locationId,
                  isLocal: true,
                  transportServiceId: id,
                } as IOrderTransport)
              }
            })
          } else {
            data.ids?.forEach((id) => {
              const integrationId = transportServices?.data.find((x) => x.id == id)?.integrationId
              if (integrationId == TransportServiceIds.NAVLUN) {
                transportTemp.push({
                  originLocationId: data.origin.locationId,
                  destinationLocationId: data.destination.locationId,
                  isLocal: true,
                  transportServiceId: id,
                  count: data.count,
                  transportOptionId: data.transportOptionId,
                } as IOrderTransport)
              } else {
                transportTemp.push({
                  originLocationId: data.origin.locationId,
                  isLocal: true,
                  transportServiceId: id,
                } as IOrderTransport)
              }
            })
          }
          const dataId = transportServices?.data.find(
            (x) => x.integrationId == TransportServiceIds.NAVLUN
          )?.id
          if (dataId) {
            const sendData: IOrderCreate = {
              userId: fromDemands ? (customerId as number) : Number(auth.user?.userId),
              transportServiceId: dataId,
              transportTypeId,
              originLocationId: data.origin.locationId,
              destinationLocationId: data.origin.locationId,
              duedate: data.dueDate,
              name: data.productName,
              categoryId: data.categoryId,
              cost: data.cost,
              transportTypeContainerId: data.transportTypeContainerId,
              grossWeight: data.grossWeight,
              imo: data.imo,
              imoClassId: data.imoClassId,
              unCode: data.unCode,
              note: data.note,
              needInsurance: data.needInsurance,
              hsCode: data.hsCode,
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
        } else if (
          data.transportTypeContainerId ==
          transportContainers.data.find(
            (x) => x.integrationId == SeaTransportContainersTypeIds.BULK
          )?.id
        ) {
          let errorCount = 0
          if (data.loadTypeId == undefined || data.loadTypeId < 0) {
            setError('loadTypeId', {
              type: 'not_nullable',
              message: 'Not Nullable',
            })
            errorCount += 1
          }
          if (data.loadingSpeed == undefined || data.loadingSpeed < 0) {
            setError('loadingSpeed', {
              type: 'not_nullable',
              message: 'Not Nullable',
            })
            errorCount += 1
          }
          if (data.loweringSpeed == undefined || data.loweringSpeed < 0) {
            setError('loweringSpeed', {
              type: 'not_nullable',
              message: 'Not Nullable',
            })
            errorCount += 1
          }

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

          if (data.hoardable) {
            if (!data.floorCount || data.floorCount < 0) {
              setError('floorCount', {
                type: 'not_nullable',
                message: 'Not Nullable',
              })
              errorCount += 1
            }
            if (!data.packingTypeId || data.packingTypeId < 0) {
              setError('packingTypeId', {
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
              userId: fromDemands ? (customerId as number) : Number(auth.user?.userId),
              transportServiceId: dataId,
              transportTypeId,
              originLocationId: data.origin.locationId,
              destinationLocationId: data.origin.locationId,
              duedate: data.dueDate,
              name: data.productName,
              categoryId: data.categoryId,
              cost: data.cost,
              loadTypeId: data.loadTypeId,
              loweringSpeed: data.loweringSpeed,
              loadingSpeed: data.loadingSpeed,
              transportTypeContainerId: data.transportTypeContainerId,
              grossWeight: data.grossWeight,
              imo: data.imo,
              imoClassId: data.imoClassId,
              unCode: data.unCode,
              note: data.note,
              hoardable: data.hoardable,
              floorCount: data.floorCount,
              packingTypeId: data.packingTypeId,
              needInsurance: data.needInsurance,
              hsCode: data.hsCode,
              storeHouse: data.storeHouse,
              orderTransports: transportTemp,
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
  const getContainerTypeIntegrationId = () => {
    return transportTypeContainer.data.find((x) => x.id == watch('transportTypeContainerId'))
      ?.integrationId
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
                      <GLIconShip />
                    </i>
                    <span className="title">Denizyolu Fiyat Talep Formu</span>
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
                          console.log('value', value)
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
                              categoryName={globalState?.formInitalData?.categoryName}
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
                              labelIcon={
                                <GLTooltip title="Taşınacak emtianın mal faturasında belirtilen bedelini yazınız.">
                                  <GLIconInfo />
                                </GLTooltip>
                              }
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
                        name="transportTypeContainerId"
                        control={control}
                        render={({ onChange, value }) => {
                          return (
                            <GLSelect
                              label="Yükleme Çeşidi"
                              data={transportTypeContainer?.data.map((item) => {
                                return { id: item.id, label: item.name }
                              })}
                              value={value}
                              onChange={onChange}
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
                                <GLTooltip title="...">
                                  <GLIconInfo />
                                </GLTooltip>
                              }
                            />
                          )
                        }}
                      />
                    </Grid>
                  </Grid>

                  {getContainerTypeIntegrationId() == SeaTransportContainersTypeIds.FCL &&
                    (fromDemands ? (
                      multipleTransportOptions?.map((mto, index) => {
                        return (
                          <Grid container spacing={2} alignItems="flex-end" key={mto.id}>
                            <Grid item xs={4}>
                              <GLSelect
                                label="Konteyner Çeşidi"
                                data={transportOption?.data.map((item) => {
                                  return { id: item.id, label: item.name }
                                })}
                                value={mto.id}
                                onChange={(newId: number) => {
                                  onChangeOptions(mto.id, newId)
                                }}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <GLRangeButton
                                value={mto.count}
                                onChange={(newCount: number) => {
                                  onChangeOptionCount(mto.id, newCount)
                                }}
                                size="large"
                                label="Adet"
                                labelPosition="top"
                              />
                            </Grid>
                            {multipleTransportOptions.length - 1 == index && (
                              <Grid item xs={2}>
                                <GLButton
                                  text="Yeni ekle"
                                  type="button"
                                  textColor={colors.white}
                                  textColorHover={colors.white}
                                  bgColor={colors.sea}
                                  bgColorHover={colors.seaHover}
                                  iconSize="8px"
                                  onClick={() => {
                                    if (multipleTransportOptions) {
                                      setMultipleTransportOptions([
                                        ...multipleTransportOptions,
                                        { id: 0, count: 0 },
                                      ])
                                    }
                                  }}
                                />
                              </Grid>
                            )}
                            {multipleTransportOptions.length - 1 == index &&
                              multipleTransportOptions.length > 1 && (
                                <Grid item xs={2}>
                                  <GLButton
                                    text="Sil"
                                    type="button"
                                    textColor={colors.white}
                                    textColorHover={colors.white}
                                    bgColor={colors.sea}
                                    bgColorHover={colors.seaHover}
                                    iconSize="8px"
                                    onClick={() => {
                                      if (multipleTransportOptions.length > 1) {
                                        const filtered = multipleTransportOptions.filter(
                                          (x, index) =>
                                            multipleTransportOptions.length - 1 !== index
                                        )
                                        setMultipleTransportOptions(filtered)
                                      }
                                    }}
                                  />
                                </Grid>
                              )}
                          </Grid>
                        )
                      })
                    ) : (
                      <Grid container spacing={2} alignItems="flex-end">
                        <Grid item xs={4}>
                          <Controller
                            name="transportOptionId"
                            control={control}
                            render={({ onChange, value }) => {
                              return (
                                <GLSelect
                                  label="Konteyner Çeşidi"
                                  data={transportOption?.data.map((item) => {
                                    return { id: item.id, label: item.name }
                                  })}
                                  value={value}
                                  onChange={onChange}
                                  error={errors?.transportOptionId ? true : false}
                                />
                              )
                            }}
                          />
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
                                  labelPosition="top"
                                  error={errors?.count ? true : false}
                                />
                              )
                            }}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  {getContainerTypeIntegrationId() == SeaTransportContainersTypeIds.LCL && (
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
                                    labelIcon={
                                      <GLTooltip title="En, Boy ve Yükseklik ölçülerini lütfen ‘’cm’’ cinsinden yazınız.">
                                        <GLIconInfo />
                                      </GLTooltip>
                                    }
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
                                labelPosition="top"
                                error={errors?.count ? true : false}
                              />
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {getContainerTypeIntegrationId() == SeaTransportContainersTypeIds.BULK && (
                    <Grid container spacing={2}>
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
                          name="loadingSpeed"
                          control={control}
                          render={({ onChange, value }) => {
                            return (
                              <GLInput
                                label="Yükleme Hızı"
                                placeholder="MT / Day"
                                endIcon={
                                  <GLTooltip title="Gönderici veya alıcının ton veya yük başı tahmini yükleme ve indirme hızları gün/saat bazlı olarak bildirilmesi gerekmektedir.">
                                    <GLIconInfo />
                                  </GLTooltip>
                                }
                                value={value}
                                onChange={onChange}
                                error={errors?.loadingSpeed ? true : false}
                              />
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name="loweringSpeed"
                          control={control}
                          render={({ onChange, value }) => {
                            return (
                              <GLInput
                                label="İndirme Hızı"
                                placeholder="MT / Day"
                                endIcon={
                                  <GLTooltip title="Gönderici veya alıcının ton veya yük başı tahmini yükleme ve indirme hızları gün/saat bazlı olarak bildirilmesi gerekmektedir.">
                                    <GLIconInfo />
                                  </GLTooltip>
                                }
                                value={value}
                                onChange={onChange}
                                error={errors?.loweringSpeed ? true : false}
                              />
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}

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

                  {getContainerTypeIntegrationId() != SeaTransportContainersTypeIds.FCL && (
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Controller
                          name="hoardable"
                          control={control}
                          render={({ onChange, value }) => {
                            return (
                              <GLSwitch
                                label="İstiflenebilir Ürün"
                                labelPosition="top"
                                tooltiptext="Tooltip Text"
                                value={value}
                                onChange={onChange}
                              />
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        {watch('hoardable') == true && (
                          <Controller
                            name="floorCount"
                            control={control}
                            render={({ onChange, value }) => {
                              return (
                                <GLInput
                                  label=" Kat Sayısı"
                                  value={value}
                                  onChange={onChange}
                                  error={errors?.floorCount ? true : false}
                                />
                              )
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item xs={4}>
                        {watch('hoardable') == true && (
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
                        )}
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
                         /> */}
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
