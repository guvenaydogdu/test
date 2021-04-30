import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import Layout from '../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { HomeSlider } from '../components/HomePage/HomeSlider'
import { GLSearchBar } from '../components/HomePage/GLSearchBar'
import { Container, Grid } from '@material-ui/core'
import { HomeInfo } from '../components/HomePage/HomeInfo'
import { GLBLockLink } from '../components/Common/GLBlockLink'
import { colors } from '../theme'
import { GLIconShip, GLIconAirPlane, GLIconRailway } from '../components/Common/GLIcons'
import { GLMediaCardHorizontal } from '../components/Common/GLMediaCardHorizontal'
import Requests from '../requests'
import { ITransportTypePager, ITransportTypesResponse } from '../interfaces/TransportTypes'
import { IConfig } from '../interfaces/Config'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { ISliderPager, ISlidersResponse } from '../interfaces/Slider'

import { IAnnouncementResponse } from '../interfaces/Announcement'
import dynamic from 'next/dynamic'

const GLAnnoucmentModalDynamic = dynamic(() => import('../components/HomePage/GLAnnoucmentModal'), {
  ssr: false,
})
interface IIndexPageProps {
  transportTypesData: ITransportTypesResponse
  sliderData: ISlidersResponse
  annoucmentData: IAnnouncementResponse
}
interface IHomeInfo {
  seawayInfo: IConfig | null
  airwayInfo: IConfig | null
  railwayInfo: IConfig | null
  specialServiceInfo: IConfig | null
}

const IndexPage: NextPage<IIndexPageProps> = ({
  transportTypesData,
  sliderData,
  annoucmentData,
}) => {
  const request = Requests()
  const [homeInfo, setHomeInfo] = useState<IHomeInfo>({
    seawayInfo: null,
    airwayInfo: null,
    railwayInfo: null,
    specialServiceInfo: null,
  })
  const { i18n, t } = useTranslation()

  useEffect(() => {
    getValue()
  }, [])
  const getValue = async () => {
    const seaway = await request.ConfigRequest.getByName('homepage_seaway_info', i18n.language)
    const airway = await request.ConfigRequest.getByName('homepage_airway_info', i18n.language)
    const railway = await request.ConfigRequest.getByName('homepage_railway_info', i18n.language)
    const specialServices = await request.ConfigRequest.getByName(
      'homepage_special_service_info',
      i18n.language
    )
    setHomeInfo({
      seawayInfo: seaway.data,
      airwayInfo: airway.data,
      railwayInfo: railway.data,
      specialServiceInfo: specialServices.data,
    })
  }

  return (
    <Layout>
      <HomeSlider data={sliderData} />
      <div style={{ backgroundColor: colors.blueDark }}>
        <Container maxWidth="lg">
          <div style={{ margin: '-72px 0 -50px 0' }}>
            <GLSearchBar transportTypesData={transportTypesData} isMainPage={true} />
          </div>
        </Container>
        <Container maxWidth="lg">
          <HomeInfo />
        </Container>
      </div>
      <div style={{ backgroundColor: colors.white }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <GLBLockLink
                icon={<GLIconShip />}
                bgColor={colors.sea}
                bgImage="/images/frame-sea.png"
                title={t('seaway') + ' ' + t('services')}
                description={homeInfo.seawayInfo?.value}
                href={'/services/seaway-service'}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <GLBLockLink
                icon={<GLIconAirPlane />}
                bgColor={colors.air}
                bgImage="/images/frame-airplane.png"
                title={t('airway') + ' ' + t('services')}
                description={homeInfo.airwayInfo?.value}
                href={'/services/airway-service'}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <GLBLockLink
                icon={<GLIconRailway />}
                bgColor={colors.iron}
                bgImage="/images/frame-railway.png"
                title={t('railway') + ' ' + t('services')}
                description={homeInfo.railwayInfo?.value}
                href={'/services/railway-service'}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container maxWidth="lg">
        <GLMediaCardHorizontal
          title={t('special_services')}
          description={homeInfo.specialServiceInfo?.value}
          linkTitle={t('more')}
        />
      </Container>
      <GLAnnoucmentModalDynamic data={annoucmentData} />
    </Layout>
  )
}
export default IndexPage

const transportTypepagerModel: ITransportTypePager = {
  pageNumber: 1,
  pageSize: 10,
  sortColumn: 'Position',
  sortDescending: false,
  isActive: true,
}
const sliderPager: ISliderPager = {
  pageNumber: 1,
  pageSize: 10,
  sortColumn: 'Id',
  sortDescending: true,
  isActive: true,
}

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  const requests = Requests()
  const data = await requests.TransportTypesRequest.getList(transportTypepagerModel)

  const SliderData = await requests.SliderRequest.getList(sliderPager)

  const annoucmentData = await requests.AnnouncementRequest.getCurrentAnnouncement(
    serverSideContext.locale as string
  )
  console.log('data', data)
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
      transportTypesData: data,
      sliderData: SliderData,
      annoucmentData: annoucmentData,
    },
  }
}
