import React, { FC, useEffect, useState } from 'react'

import { makeStyles, Container, Grid } from '@material-ui/core'
import { colors } from '../../theme'
import Link from 'next/link'
import { GLBox } from '../../components/Common/GLBox'
import { GLStepper } from '../../components/Common/GLStepper'
import { GLTitleHalfLine } from '../../components/Common/GLTitleHalfLine'
import { GLAccordion } from '../../components/Common/GLAccordion'
import { GLButtonAddNew } from '../../components/Common/GLButtonAddNew'
import { GLCargoItem } from '../../components/Common/GLCargoItem'
import { GLNewCargo } from '../../components/Common/GLNewCargo'
// import { GLCheckBox, GLInput, GLSelect, GLTextArea } from '../components/FormItems/GLInput'
import { GLIconInfo, GLIconNext, GLIconPrev } from '../../components/Common/GLIcons'
import { GLTooltip } from '../../components/Common/GLTooltip'
import { GLSwitch } from '../../components/Common/GLSwitch'
import { GLButton } from '../../components/Common/Forms/GLButtons'
import { GLSelect } from '../../components/Common/Forms/GLSelect'
import { GLInput } from '../../components/Common/Forms/GLInput'
import { GLTextArea } from '../../components/Common/Forms/GLTextarea'
import { GLCheckBox } from '../../components/Common/Forms/GLCheckBox'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { ITransportSearch } from '../../interfaces/Search'
import { GLCategorySelect } from '../FormItems/GLCategorySelect'
import Requests from '../../requests'
import { IImoClassesResponse } from '../../interfaces/ImoClass'
import { ITransportOptionsResponse } from '../../interfaces/TransportOption'
import { IPackingTypesResponse } from '../../interfaces/PackingType'
import { ISelectedTransportOption } from '../../pages/search'

import { SeaTransportContainersTypeIds, TransportServiceIds } from '../../utils/global'
import { IOrderCreate, IOrderTransport } from '../../interfaces/Order'
import { useAuth } from '../../providers/AuthProvider'
import { ITransportServicesResponse } from '../../interfaces/TransportService'
import { GLSuccessMessage } from '../Common/GLSuccess'

const seaFormSchema = yup.object({
  productName: yup.string().required(),
  categoryId: yup.number().required(),
  grossWeight: yup.number().required(),
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
})
export type ISeaFormSchema = yup.InferType<typeof seaFormSchema>

interface ISeaReservationProps {
  selectedTransport: ITransportSearch
  shippingLineVisible: number
  getAcitveTransportTypeIntegrationId: () => string | undefined
  transportTypeContainerId: number
  transportTypeId: number
  setNullSelectedTransport: () => any
  transportOptions: ITransportOptionsResponse
  selectedDefaultTransportOptions: ISelectedTransportOption[]
  transportServices: ITransportServicesResponse
  dueDate: string
  selectedTransportServices: number[]
}

export const SeaReservation: FC<ISeaReservationProps> = ({
  selectedTransport,
  shippingLineVisible,
  getAcitveTransportTypeIntegrationId,
  setNullSelectedTransport,
  transportOptions,
  selectedDefaultTransportOptions,
  transportServices,
  transportTypeId,
  transportTypeContainerId,
  dueDate,
  selectedTransportServices,
}) => {
  const classes = useStyles()
  const requests = Requests()
  const auth = useAuth()
  const color = colors.sea
  const [imoClasses, setImoClasses] = useState<IImoClassesResponse | null>(null)
  const [packingTypes, setPackingTypes] = useState<IPackingTypesResponse | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const [selectedTransportOptions, setSelectedTransportOptions] = useState<
    ISelectedTransportOption[]
  >(selectedDefaultTransportOptions)

  const [newTransport, setNewTransport] = useState<boolean>(false)

  const onChangeOptions = (deleteId: number, newId: number) => {
    const newData = selectedTransportOptions?.filter((x) => x.transportOptionId != deleteId)
    newData?.push({ transportOptionId: newId, count: 0 })
    if (newData) setSelectedTransportOptions(newData)
  }

  const onChangeOptionCount = (optionId: number, count: number) => {
    const newData = selectedTransportOptions?.filter((x) => x.transportOptionId != optionId)
    newData?.push({ transportOptionId: optionId, count: count })
    if (newData) setSelectedTransportOptions(newData)
  }

  const onNewOptionAdded = (optionId: number, count: number) => {
    if (selectedTransportOptions) {
      const newData = selectedTransportOptions
      newData.push({ transportOptionId: optionId, count: count })
      setSelectedTransportOptions(newData)
    }
  }

  const handleNewTransport = () => {
    setNewTransport((prev) => !prev)
  }
  const { control, handleSubmit, errors, reset, setError, watch } = useForm({
    resolver: yupResolver(seaFormSchema),
  })

  useEffect(() => {
    getImoClass()
    getPackingType()
  }, [])

  const getImoClass = () => {
    requests.ImoClassRequest.getList({ pageNumber: 1, pageSize: 100, sortDescending: true })
      .then((res) => setImoClasses(res))
      .catch((err) => console.log(err))
  }
  const getPackingType = () => {
    requests.PackingTypesRequest.getList({ pageNumber: 1, pageSize: 100, sortDescending: true })
      .then((res) => {
        setPackingTypes(res)
      })
      .catch((err) => console.log(err))
  }
  const onSubmit = (data: ISeaFormSchema) => {
    if (data.isAccepted) {
      if (
        selectedTransport.transportTypeContainerIntegrationId == SeaTransportContainersTypeIds.LCL
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

        const transportTemp = selectedTransportServices?.map((id) => {
          const integrationId = transportServices?.data.find((x) => x.id == id)?.integrationId
          if (integrationId == TransportServiceIds.NAVLUN) {
            return {
              originLocationId: selectedTransport.originLocationId,
              destinationLocationId: selectedTransport.destinationLocationId,
              isLocal: false,
              transportServiceId: id,
            } as IOrderTransport
          } else {
            return {
              originLocationId: selectedTransport.originLocationId,
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
            originLocationId: selectedTransport.originLocationId,
            destinationLocationId: selectedTransport.destinationLocationId,
            duedate: dueDate,
            name: data.productName,
            categoryId: data.categoryId,
            cost: data.cost,
            count: data.count,
            width: data.width,
            height: data.height,
            size: data.size,
            transportTypeContainerId: transportTypeContainerId,
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
      } else if (
        selectedTransport.transportTypeContainerIntegrationId == SeaTransportContainersTypeIds.FCL
      ) {
        let errorCount = 0

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
        selectedTransportServices.forEach((id) => {
          const integrationId = transportServices?.data.find((x) => x.id == id)?.integrationId

          if (integrationId == TransportServiceIds.NAVLUN) {
            selectedTransportOptions.forEach((tO) => {
              transportTemp.push({
                originLocationId: selectedTransport.originLocationId,
                destinationLocationId: selectedTransport.destinationLocationId,
                isLocal: false,
                transportServiceId: id,
                count: tO.count,
                transportOptionId: tO.transportOptionId,
              } as IOrderTransport)
            })
          } else {
            transportTemp.push({
              originLocationId: selectedTransport.originLocationId,
              isLocal: true,
              transportServiceId: id,
            } as IOrderTransport)
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
            originLocationId: selectedTransport.originLocationId,
            destinationLocationId: selectedTransport.destinationLocationId,
            duedate: dueDate,
            name: data.productName,
            categoryId: data.categoryId,
            cost: data.cost,
            transportTypeContainerId: transportTypeContainerId,
            grossWeight: data.grossWeight,
            imo: data.imo,
            imoClassId: data.imoClassId,
            unCode: data.unCode,
            note: data.note,
            needInsurance: data.needInsurance,
            hsCode: data.hsCode,
            storeHouse: data.storeHouse,
            orderTransports: transportTemp as IOrderTransport[],
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
      } else if (
        selectedTransport.transportTypeContainerIntegrationId == SeaTransportContainersTypeIds.BULK
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

        const transportTemp = selectedTransportServices?.map((id) => {
          const integrationId = transportServices?.data.find((x) => x.id == id)?.integrationId
          if (integrationId == TransportServiceIds.NAVLUN) {
            return {
              originLocationId: selectedTransport.originLocationId,
              destinationLocationId: selectedTransport.destinationLocationId,
              isLocal: false,
              transportServiceId: id,
            } as IOrderTransport
          } else {
            return {
              originLocationId: selectedTransport.originLocationId,
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
            originLocationId: selectedTransport.originLocationId,
            destinationLocationId: selectedTransport.destinationLocationId,
            duedate: dueDate,
            name: data.productName,
            categoryId: data.categoryId,
            cost: data.cost,
            loadTypeId: data.loadTypeId,
            loweringSpeed: data.loweringSpeed,
            loadingSpeed: data.loadingSpeed,
            transportTypeContainerId: transportTypeContainerId,
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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.insidePage}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justify="center">
            <Grid item lg={10}>
              <GLStepper />
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg">
          {isSuccess ? (
            <GLSuccessMessage />
          ) : (
            <Grid container spacing={0} justify="center">
              <Grid item lg={11}>
                <GLBox shadow={true}>
                  <Grid container spacing={2} justify="center">
                    <Grid item lg={10}>
                      <GLTitleHalfLine title="Talep Detayları" />
                      <GLAccordion
                        data={selectedTransport}
                        shippingLineVisible={shippingLineVisible}
                        getAcitveTransportTypeIntegrationId={getAcitveTransportTypeIntegrationId}
                      />

                      <Grid container spacing={2} justify="space-between">
                        <Grid item>
                          <GLTitleHalfLine title="Yük Çeşidi" />
                        </Grid>
                        <Grid item>
                          {selectedTransport.transportTypeContainerIntegrationId ==
                            SeaTransportContainersTypeIds.FCL && (
                            <GLButtonAddNew onClick={handleNewTransport} />
                          )}
                        </Grid>
                      </Grid>
                      {selectedTransport.transportTypeContainerIntegrationId ==
                        SeaTransportContainersTypeIds.FCL &&
                        selectedTransportOptions?.map((transportOption) => {
                          return (
                            <GLCargoItem
                              key={transportOption.transportOptionId}
                              transportOptions={transportOptions}
                              name={
                                transportOptions.data.find(
                                  (x) => x.id == transportOption.transportOptionId
                                )?.name
                              }
                              count={transportOption.count}
                              transportOptionId={transportOption.transportOptionId}
                              onChangeOptions={onChangeOptions}
                              onChangeOptionCount={onChangeOptionCount}
                            />
                          )
                        })}
                    </Grid>
                  </Grid>
                  {newTransport && (
                    <GLNewCargo
                      onNewOptionAdded={onNewOptionAdded}
                      handleNewTransport={handleNewTransport}
                      transportOptions={transportOptions}
                    />
                  )}

                  <Grid container spacing={2} justify="center">
                    <Grid item lg={9}>
                      <hr className={classes.hr} />

                      <Grid container spacing={2}>
                        <Grid item lg={4}>
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
                        <Grid item lg={4}>
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
                        <Grid item lg={4}>
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
                        <Grid item lg={4}>
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
                                    <GLTooltip title="Tooltip Text">
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
                        <Grid item lg={4}>
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
                        <Grid item lg={4}>
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
                        <Grid item lg={4}>
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

                      <Grid container spacing={2}>
                        <Grid item lg={4}>
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
                        <Grid item lg={4}>
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
                        <Grid item lg={4}>
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

                      <hr className={classes.hr} />

                      <GLTitleHalfLine title="Ek Hizmetler" />

                      <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                        </Grid>
                      </Grid>

                      <Grid container spacing={2} alignItems="center">
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
                                      <GLTooltip title="Bu seçeneğin işaretlenmesi halinde ilave ardiye hizmetleri ile ilgili talep olduğu Kabul edilerek, ardiye ücretli bir fiyat teklifi oluşturulacaktır.">
                                        <GLIconInfo />
                                      </GLTooltip>
                                    }
                                    onChange={onChange}
                                    value={value}
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
                                    tooltiptext="Tooltip Text"
                                    color={color}
                                    value={value}
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
                                    <GLTooltip title="Bu seçeneğin işaretlenmesi halinde ilave ardiye hizmetleri ile ilgili talep olduğu Kabul edilerek, ardiye ücretli bir fiyat teklifi oluşturulacaktır.">
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
                          <GLButton
                            text="Geri Dön"
                            textColor={colors.grayMedium}
                            textColorHover={colors.blueDark}
                            bgColor="transparent"
                            bgColorHover={colors.graySoft}
                            shadow={false}
                            iconSize="8px"
                            startIcon={<GLIconPrev />}
                            onClick={setNullSelectedTransport}
                          />
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

const useStyles = makeStyles(() => ({
  hr: {
    border: 'none',
    borderBottom: `1px solid ${colors.grayLight}`,
    margin: '32px 0',
  },
  insidePage: {
    paddingTop: '90px',
  },
  btnArrow: {
    display: 'flex',
    width: '100%',
    maxWidth: '215px',
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
}))
