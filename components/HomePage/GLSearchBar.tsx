import React, { FC, useEffect, useState, memo } from 'react'
import { makeStyles, Box, Button } from '@material-ui/core'
import { colors } from '../../theme'
import { GLTargetAutoComplete } from '../FormItems/GLTargetAutoComplete'
import { useTranslation } from 'next-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { GLAutoComplete } from '../FormItems/GLAutoComplete'
import { ISearch } from '../../interfaces/Search'
import { SchemaOf } from 'yup'
import { GLSearchBarDatePicker } from './GLSearchBarDatePicker'
import { ITransportTypesResponse } from '../../interfaces/TransportTypes'
import Requests from '../../requests'
import { GLTransportTypeSelect } from './GLTransportTypeSelect'
import {
  ITranportTypeContainersResponse,
  ITransportTypeContainerPagerInput,
} from '../../interfaces/TransportTypeContainer'
import { SET_SEARCH_DATA, useDataContext } from '../../providers/DataProvider'
import { useRouter } from 'next/router'
import moment from 'moment'

const searchShape: SchemaOf<ISearch> = yup
  .object({
    locationId: yup.number().required(),
    locationTypeId: yup.number().notRequired(),
    port: yup.string().notRequired().nullable(),
    town: yup.string().notRequired().nullable(),
    city: yup.string().notRequired().nullable(),
    country: yup.string().notRequired().nullable(),
    countryLocationId: yup.number().notRequired().nullable(),
    xCoordinate: yup.number().notRequired(),
    yCoordinate: yup.number().notRequired(),
    locationTypeName: yup.string().notRequired(),
  })
  .defined()

const searchFormSchema = yup.object({
  origin: searchShape,
  destination: searchShape,
  date: yup.string(),
  transportTypeContainerId: yup.number().moreThan(0),
  transportTypeId: yup.number().moreThan(0).required(),
})
export type ISearchFormData = yup.InferType<typeof searchFormSchema>

interface IGLSearchBarProps {
  transportTypesData?: ITransportTypesResponse
  isMainPage: boolean
}

export const GLSearchBar: FC<IGLSearchBarProps> = memo(({ transportTypesData, isMainPage }) => {
  const { dispatch, globalState } = useDataContext()
  const router = useRouter()
  const request = Requests()
  const [isFirsTime, setIsFirstTime] = useState<boolean>(true)
  const [
    transportTypeContainersData,
    setTransportTypeContainersData,
  ] = useState<ITranportTypeContainersResponse | null>(null)
  const defaultData = globalState?.searchData
    ? globalState.searchData
    : { transportTypeId: transportTypesData?.data[0].id }
  const classes = useStyles()
  const { t } = useTranslation()

  const { control, handleSubmit, watch, setValue, reset } = useForm({
    resolver: yupResolver(searchFormSchema),
    defaultValues:
      globalState?.searchData && !isMainPage
        ? globalState?.searchData
        : { transportTypeId: transportTypesData?.data[0].id },
  })

  useEffect(() => {
    getTransportTypeContainers()
  }, [watch('transportTypeId')])

  const getTransportTypeContainers = () => {
    if (watch('transportTypeId')) {
      const transportTypeContainerParameters: ITransportTypeContainerPagerInput = {
        pageNumber: 1,
        pageSize: 1000,
        sortDescending: true,
        transportTypeId: Number(watch('transportTypeId')),
      }

      request.TransportTypeContainerRequest.getList(transportTypeContainerParameters)
        .then((res) => {
          setValue('transportTypeContainerId', 0)
          setTransportTypeContainersData(res)
          if (!isMainPage && isFirsTime == true) {
            reset(defaultData)
            setIsFirstTime((prev) => !prev)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  const onSubmit = (data: ISearchFormData) => {
    console.log('data', data)
    dispatch({ type: SET_SEARCH_DATA, payload: data })
    if (isMainPage) router.push('/search')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.searchBar}>
        <Box className={classes.tabTitle}>
          <Controller
            name="transportTypeId"
            control={control}
            //defaultValue={transportTypesData?.data[0].id}
            render={({ onChange, value }) => {
              return (
                <GLTransportTypeSelect
                  onChange={onChange}
                  value={value}
                  data={transportTypesData?.data}
                />
              )
            }}
          />
        </Box>
        <Box className={classes.tabContent}>
          <Controller
            name="origin"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => {
              return (
                <GLTargetAutoComplete
                  label={t('load_point')}
                  onChange={onChange}
                  iconUrl="/images/icon-loading-point.svg"
                  value={value}
                  transportTypeId={watch('transportTypeId')}
                />
              )
            }}
          />

          <Controller
            name="destination"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => {
              return (
                <GLTargetAutoComplete
                  label={t('destination')}
                  onChange={onChange}
                  iconUrl="/images/icon-map-pin.svg"
                  value={value}
                  transportTypeId={watch('transportTypeId')}
                />
              )
            }}
          />

          <Controller
            name="date"
            control={control}
            defaultValue={moment(new Date()).format('yyyy-MM-DD')}
            render={({ onChange, value }) => {
              return <GLSearchBarDatePicker value={value} onChange={onChange} />
            }}
          />

          <Controller
            name="transportTypeContainerId"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => {
              return (
                <GLAutoComplete
                  label={t('type')}
                  value={value}
                  onChange={onChange}
                  data={transportTypeContainersData?.data.map((transportTypeContainer) => {
                    return {
                      id: transportTypeContainer.id,
                      label: transportTypeContainer.name,
                    }
                  })}
                  iconUrl="/images/icon-container.svg"
                />
              )
            }}
          />

          <Button type="submit" aria-label="search" variant="contained" color="primary">
            <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill={colors.white}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.7071 4.29289C12.3166 3.90237 11.6834 3.90237 11.2929 4.29289C10.9024 4.68342 10.9024 5.31658 11.2929 5.70711L16.5858 11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H16.5858L11.2929 18.2929C10.9024 18.6834 10.9024 19.3166 11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L19.7071 12.7071C20.0976 12.3166 20.0976 11.6834 19.7071 11.2929L12.7071 4.29289Z"
              />
            </svg>
          </Button>
        </Box>
      </Box>
    </form>
  )
})

const useStyles = makeStyles(() => ({
  searchBar: {
    position: 'relative',
    zIndex: 50,
    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)',
    margin: '0',
  },
  tabTitle: {
    display: 'inline-flex',
    backgroundColor: colors.white,
    padding: '0 32px',
    borderRadius: '10px 10px 0 0',

    '& > span': {
      width: '160px',
      display: 'flex',
      justifyContent: 'center',
      borderBottom: `2px solid ${colors.graySoft}`,
      paddingTop: '16px',
      cursor: 'pointer',

      '&:focus': {
        outline: 'none',
      },

      '&.active, &:hover': {
        borderBottomColor: colors.sea,

        '& svg': {
          '& path': {
            fill: colors.sea,
            transition: 'all .3s ease',
          },
        },

        '& > strong': {
          color: colors.black,
          transition: 'all .3s ease',
        },
      },

      '& > i': {
        margin: '0 16px 10px 0',

        '& svg': {
          width: '24px',
          height: '24px',

          '& path': {
            fill: colors.grayMedium,
          },
        },
      },

      '& > strong': {
        display: 'block',
        fontSize: '14px',
        fontWeight: 700,
        lineHeight: '150%',
        color: colors.grayMedium,
      },
    },
  },
  tabContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: '16px',
    borderRadius: '0 10px 10px 10px',

    '& > *': {
      width: '100%',
      height: '88px',
      margin: '0 16px 0 0',
      boxShadow: 'inset 5px 5px 10px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${colors.graySoft}`,
      borderRadius: '10px',

      '& > .MuiFormControl-root': {
        height: '100%',

        '& .MuiFormLabel-root': {
          top: '16px',
          fontSize: '18px',
          fontWeight: 700,
          lineHeight: '21.13px',
          color: colors.grayMedium,
          paddingLeft: '56px',

          '&.MuiInputLabel-shrink': {
            top: '18px',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '16.44px',
          },
        },

        '& > .MuiInputBase-root': {
          height: '100%',
          border: 'none',
          padding: '30px 10px 10px 52px !important',
          fontSize: '18px',
          lineHeight: '21.13px',
          fontWeight: 700,
          color: colors.sea,

          '& > .MuiAutocomplete-endAdornment': {
            display: 'none',
          },
        },
      },
    },

    '& > .MuiButtonBase-root': {
      flex: '0 0 72px',
      height: '72px',
      margin: 0,
    },
  },
}))
