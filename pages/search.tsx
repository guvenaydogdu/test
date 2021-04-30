import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { makeStyles, Container, Grid, Typography } from '@material-ui/core'
import { GLSearchBar } from '../components/HomePage/GLSearchBar'
import { GLBox } from '../components/Common/GLBox'
import { GLPagination } from '../components/Common/GLPagination'
import { colors } from '../theme'
import { GLAlertBox } from '../components/Common/GLAlertBox'
import { GLIconAlert } from '../components/Common/GLIcons'
import { GLStickyLink } from '../components/Common/GLStickyLink'
import { GLModal } from '../components/Common/GLModal'
import Requests from '../requests'
import { ITransportTypePager, ITransportTypesResponse } from '../interfaces/TransportTypes'
import {
  REMOVE_SEARCH_DATA,
  SET_FORM_INITIAL_DATA,
  useDataContext,
} from '../providers/DataProvider'
import { IShippingLinePager, IShippingLinesResponse } from '../interfaces/ShippingLine'
import { ITransportServicePager, ITransportServicesResponse } from '../interfaces/TransportService'
import { ITransportOptionPager, ITransportOptionsResponse } from '../interfaces/TransportOption'
import { ITransportSearch, ITransportSearchResponse } from '../interfaces/Search'
import _ from 'lodash'
import { GLSearchServicesFilter } from '../components/SearchPage/GLServicesFilter'
import { GLOptionsFilter } from '../components/SearchPage/GLOptionsFilter'
import { GLShippingLinesFilter } from '../components/SearchPage/GLShippingLinesFilter'
import { GLTransportSearchResults } from '../components/SearchPage/GLTransportSearchResults'
import { TransportServiceIds, TransportTypes } from '../utils/global'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SeaReservation } from '../components/SearchPage/SeaReservation'

interface ISearchPageProps {
  transportTypesData: ITransportTypesResponse
  shippingLinesData: IShippingLinesResponse
  transportServiceData: ITransportServicesResponse
  transportOptionsData: ITransportOptionsResponse
}

const shippingLinesPager: IShippingLinePager = {
  pageNumber: 1,
  pageSize: 100,
  sortDescending: true,
}

const transportServicePager: ITransportServicePager = {
  pageNumber: 1,
  pageSize: 100,
  sortDescending: true,
  isVisible: true,
}
const transportOptionPager: ITransportOptionPager = {
  pageNumber: 1,
  pageSize: 100,
  sortDescending: false,
  sortColumn: 'Position',
}
export interface ISelectedTransportOption {
  transportOptionId: number
  count: number
}

const SearchPage: NextPage<ISearchPageProps> = ({
  transportTypesData,
  shippingLinesData,
  transportServiceData,
  transportOptionsData,
}) => {
  const defaultServiceId =
    transportServiceData.data.find((x) => x.integrationId == TransportServiceIds.NAVLUN)?.id || 0
  const classes = useStyles()
  const requests = Requests()
  const timeOutRef = useRef<any>()
  const dataNotFoundRef = useRef<any>()

  const { dispatch, globalState } = useDataContext()
  const { i18n } = useTranslation()

  const [statusInfoModal, setStatusInfoModal] = useState<boolean>(false)
  const [shippingLines] = useState<IShippingLinesResponse>(shippingLinesData)
  const [transportServices] = useState<ITransportServicesResponse>(transportServiceData)
  const [transportOptions] = useState<ITransportOptionsResponse>(transportOptionsData)
  const [transportSearch, setTransportSeach] = useState<ITransportSearchResponse | null>(null)
  const router = useRouter()
  const [selectedTransportOptions, setSelectedTransportOptions] = useState<
    ISelectedTransportOption[]
  >([{ transportOptionId: transportOptionsData.data[0].id, count: 1 }])
  const [selectedTransportServices, setSelectedTransportServices] = useState<number[]>([
    defaultServiceId,
  ])
  const [selectedShippingLines, setSelectedShippingLines] = useState<number[]>([])
  const [activePageNumber, setPageNumber] = useState<number>(1) //yılport limanı new orleans
  const [sortingValue, setSortingValue] = useState<number>(0) // 0 ascending
  const [shippingLineVisible, setShippingLineVisible] = useState<number>(0)
  const [selectedTransport, setSelectedTransport] = useState<ITransportSearch | null>(null)

  const getShippingLineVisible = async () => {
    const shippingLineVisible = await requests.ConfigRequest.getByName(
      'search_shippingline_visible',
      i18n.language
    )
    setShippingLineVisible(Number(shippingLineVisible.data.value))
  }

  const handleSelectedTransportOptions = (selected: ISelectedTransportOption) => {
    const foundedItem = _.find(selectedTransportOptions, function (i) {
      return i.transportOptionId == selected.transportOptionId
    })
    if (foundedItem) {
      const oldItems = selectedTransportOptions.filter(
        (item) => item.transportOptionId != selected.transportOptionId
      )
      if (selected.count > 0) {
        setSelectedTransportOptions([...oldItems, selected])
      } else {
        setSelectedTransportOptions([...oldItems])
      }
    } else {
      setSelectedTransportOptions((prev) => [...prev, selected])
    }
  }

  const handleSelectedTransportServices = (selectedId: number) => {
    const foundedItem = _.find(selectedTransportServices, function (i) {
      return i == selectedId
    })
    if (foundedItem) {
      const oldItems = selectedTransportServices.filter((itemId) => itemId != selectedId)
      setSelectedTransportServices([...oldItems])
    } else {
      const integrationId = transportServices?.data.find((item) => item.id == selectedId)
        ?.integrationId
      if (integrationId == TransportServiceIds.TASIMA) {
        const localeServiceId = transportServices?.data.find(
          (item) => item.integrationId == TransportServiceIds.LOKAL
        )?.id
        if (localeServiceId && !selectedTransportServices.includes(localeServiceId)) {
          setSelectedTransportServices((prev) => [...prev, selectedId, localeServiceId])
        } else {
          setSelectedTransportServices((prev) => [...prev, selectedId])
        }
      } else {
        setSelectedTransportServices((prev) => [...prev, selectedId])
      }
    }
  }

  const handleSelectedShippingLines = (selectedId: number) => {
    const foundedItem = _.find(selectedShippingLines, function (i) {
      return i == selectedId
    })
    if (foundedItem) {
      const oldItems = selectedShippingLines.filter((itemId) => itemId != selectedId)
      setSelectedShippingLines([...oldItems])
    } else {
      setSelectedShippingLines((prev) => [...prev, selectedId])
    }
  }
  const handlePageNumber = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }
  const handleChangeFilter = (value: number) => {
    setSortingValue(value)
  }

  const onClickEmptyForm = () => {
    if (globalState?.searchData?.transportTypeId) {
      dispatch({
        type: SET_FORM_INITIAL_DATA,
        payload: {
          ...globalState.searchData,
          dueDate: globalState.searchData.date,
          ids: selectedTransportServices,
        },
      })
      let url = '/'

      const selectedTransportTypeId = getAcitveTransportTypeIntegrationId()
      if (selectedTransportTypeId == TransportTypes.SEAWAY) url = '/forms/sea'
      else if (selectedTransportTypeId == TransportTypes.AIRWAY) url = '/forms/air'
      else if (selectedTransportTypeId == TransportTypes.RAILWAY) url = '/forms/railway'

      router.push(url).then(() => {
        dispatch({ type: REMOVE_SEARCH_DATA })
      })
    }
  }

  const onSelectTransport = (data: ITransportSearch) => {
    setSelectedTransport(data)
  }

  const setNullSelectedTransport = () => {
    setSelectedTransport(null)
  }

  useEffect(() => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }

    timeOutRef.current = setTimeout(() => {
      getData()
    }, 1000)
  }, [
    globalState.searchData,
    activePageNumber,
    selectedTransportServices,
    selectedShippingLines,
    sortingValue,
    selectedTransportOptions,
  ])

  const getData = () => {
    requests.SearchRequest.transportSearch({
      ...globalState.searchData,
      pageNumber: activePageNumber,
      pageSize: 5,
      transportSearchOptions: selectedTransportOptions,
      transportServiceIdList: selectedTransportServices,
      shippingLineIdList: selectedShippingLines,
      sortType: sortingValue,
    })
      .then((res) => {
        if (dataNotFoundRef.current) {
          clearTimeout(dataNotFoundRef.current)
        }
        if (res.data.length == 0) {
          dataNotFoundRef.current = setTimeout(() => {
            onClickEmptyForm()
          }, 5000)
        }
        setTransportSeach(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getShippingLineVisible()
    return () => {
      dispatch({ type: REMOVE_SEARCH_DATA })
    }
  }, [])

  const handleModalInfo = (status: boolean) => {
    setStatusInfoModal(status)
  }
  const getAcitveTransportTypeIntegrationId = () => {
    return transportTypesData?.data.find((x) => x.id == globalState?.searchData?.transportTypeId)
      ?.integrationId
  }

  return (
    <Layout>
      {!selectedTransport ? (
        <>
          <div className={classes.pageContent}>
            <Container maxWidth="lg">
              <div className={classes.searchBarWrapper}>
                <GLSearchBar isMainPage={false} transportTypesData={transportTypesData} />
              </div>
            </Container>
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <GLBox>
                    <GLOptionsFilter
                      transportOptions={transportOptions}
                      handleSelectedTransportOptions={handleSelectedTransportOptions}
                      defaultValues={selectedTransportOptions}
                    />
                    <GLSearchServicesFilter
                      transportServices={transportServices}
                      handleSelectedTransportServices={handleSelectedTransportServices}
                      selectedTransportServices={selectedTransportServices}
                      originLocationId={globalState.searchData?.origin?.countryLocationId}
                    />

                    <GLShippingLinesFilter
                      shippingLines={shippingLines}
                      selectedShippingLines={selectedShippingLines}
                      handleSelectedShippingLines={handleSelectedShippingLines}
                      shippingLineVisible={shippingLineVisible}
                    />
                  </GLBox>
                </Grid>
                <Grid item md={9}>
                  <GLTransportSearchResults
                    transportSearch={transportSearch}
                    sortingValue={sortingValue}
                    handleChangeFilter={handleChangeFilter}
                    shippingLineVisible={shippingLineVisible}
                    getAcitveTransportTypeIntegrationId={getAcitveTransportTypeIntegrationId}
                    toForm={onClickEmptyForm}
                    onSelectTransport={onSelectTransport}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} justify="flex-end">
                <Grid item md={9}>
                  <GLPagination
                    totalItemCount={transportSearch?.totalItemCount}
                    handlePageNumber={handlePageNumber}
                    pageSize={5}
                  />
                  <GLAlertBox
                    icon={<GLIconAlert />}
                    iconColor={colors.danger}
                    title="Title"
                    titleColor={colors.blueMedium}
                  >
                    <Typography>
                      Amet, nibh placerat et dignissim nisl. At ultricies egestas feugiat lectus.
                      Risus elit dolor luctus nunc. A sit suspendisse tristique posuere elementum
                      scelerisque condimentum vel suspendisse. Pellentesque mi pellentesque auctor
                      augue pulvinar. Vivamus mi nisl nulla tristique donec sem etiam diam mauris.
                      <br />
                      <br />
                      Mauris, at laoreet sagittis, dignissim ultricies. Diam, non purus lectus
                      tortor leo, turpis dolor pellentesque. Consequat quam gravida nunc justo,
                      cursus pellentesque proin. Nec enim at volutpat in porta vel nibh. In elit
                      sollicitudin lorem nullam. Dui et pellentesque blandit elit etiam sed
                      adipiscing consequat.
                    </Typography>
                  </GLAlertBox>
                  <GLModal
                    closeButton={true}
                    closeButtonColor={colors.iron}
                    maxWidth="730px"
                    statusModal={statusInfoModal}
                    handleModalChange={handleModalInfo}
                  >
                    <div className={classes.infoModalBody}>
                      <Typography variant="h6">Title</Typography>
                      <Typography>
                        Amet, nibh placerat et dignissim nisl. At ultricies egestas feugiat lectus.
                        Risus elit dolor luctus nunc. A sit suspendisse tristique posuere elementum
                        scelerisque condimentum vel suspendisse. Pellentesque mi pellentesque auctor
                        augue pulvinar. Vivamus mi nisl nulla tristique donec sem etiam diam mauris.
                        <br />
                        <br />
                        Mauris, at laoreet sagittis, dignissim ultricies. Diam, non purus lectus
                        tortor leo, turpis dolor pellentesque. Consequat quam gravida nunc justo,
                        cursus pellentesque proin. Nec enim at volutpat in porta vel nibh. In elit
                        sollicitudin lorem nullam. Dui et pellentesque blandit elit etiam sed
                        adipiscing consequat. Pellentesque arcu, nunc, volutpat nibh diam tristique
                        duis auctor. Vitae at tempor vehicula amet tincidunt risus dictum nisi. Sed
                        pellentesque id cum convallis nec. Sed vel massa praesent tortor id.
                        Ullamcorper et consectetur vel, pharetra dui justo, lectus.
                      </Typography>
                    </div>
                  </GLModal>
                </Grid>
              </Grid>
            </Container>
          </div>
          <GLStickyLink title="Önemli Bilgi" onClick={() => handleModalInfo(true)} />
        </>
      ) : (
        <>
          {getAcitveTransportTypeIntegrationId() == TransportTypes.SEAWAY && (
            <SeaReservation
              selectedTransport={selectedTransport}
              shippingLineVisible={shippingLineVisible}
              getAcitveTransportTypeIntegrationId={getAcitveTransportTypeIntegrationId}
              transportTypeContainerId={globalState?.searchData?.transportTypeContainerId}
              transportTypeId={globalState?.searchData?.transportTypeId}
              setNullSelectedTransport={setNullSelectedTransport}
              selectedDefaultTransportOptions={selectedTransportOptions}
              transportOptions={transportOptions}
              transportServices={transportServices}
              dueDate={globalState?.searchData?.date}
              selectedTransportServices={selectedTransportServices}
            />
          )}
          {/*getAcitveTransportTypeIntegrationId() == TransportTypes.AIRWAY && (
            <AirReservation
              selectedTransport={selectedTransport}
              shippingLineVisible={shippingLineVisible}
              getAcitveTransportTypeIntegrationId={getAcitveTransportTypeIntegrationId}
            />
          )*/}

          {/*getAcitveTransportTypeIntegrationId() == TransportTypes.RAILWAY && (
            <RailReservation
              selectedTransport={selectedTransport}
              shippingLineVisible={shippingLineVisible}
              getAcitveTransportTypeIntegrationId={getAcitveTransportTypeIntegrationId}
            />
          )*/}
        </>
      )}
    </Layout>
  )
}

export default SearchPage

const transportTypepagerModel: ITransportTypePager = {
  pageNumber: 1,
  pageSize: 10,
  sortColumn: 'Position',
  sortDescending: false,
  isActive: true,
}

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  const requests = Requests()
  const transportTypesData = await requests.TransportTypesRequest.getList(transportTypepagerModel)
  const shippingLinesData = await requests.ShippingLineRequest.getList(shippingLinesPager)
  const transportServiceData = await requests.TransportServiceRequest.getList(transportServicePager)
  const transportOptionsData = await requests.TransportOptionRequest.getList(transportOptionPager)

  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
      transportTypesData,
      shippingLinesData,
      transportServiceData,
      transportOptionsData,
    },
  }
}

const useStyles = makeStyles(() => ({
  pageContent: {
    // '& .MuiGrid-container': {
    //   marginTop: '0',
    //   marginBottom: '0',
    // },
    // '& .MuiGrid-item': {
    //   paddingTop: '0',
    //   paddingBottom: '0',
    // },
  },
  searchBarWrapper: {
    margin: '90px 0 30px 0',
  },
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
  glScrollBar: {
    '& > div': {
      '& > div:last-child': {
        background: colors.grayLight,

        '& > div': {
          backgroundColor: colors.sea + ' !important',
        },
      },
    },
  },
  infoModalBody: {
    '& h6': {
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '150%',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      margin: '0 0 24px 0',
    },
    '& p': {
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '150%',
    },
  },
}))
