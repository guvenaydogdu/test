import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { colors } from '../../theme'
import Layout from '../../components/Layout'
import { Container, Grid } from '@material-ui/core'
import { GLBanner } from '../../components/Common/GLBanner'
import { GLServiceBox } from '../../components/Common/GLServiceBox'
import { GLSectionTitle } from '../../components/Common/GLSectionTitle'
import {
  GLIconAirPlane,
  GLIconRailway,
  GLIconShip,
  GLIconStar,
} from '../../components/Common/GLIcons'

const OurServices: NextPage = () => {
  return (
    <Layout>
      <GLBanner imageUrl="/images/homeSlider-1.webp" alt="Banner Text" />
      <Container maxWidth="lg">
        <GLSectionTitle
          title="Hizmetlerimiz"
          subTitle="Faucibus massa mattis arcu nec. Quis maecenas sed arcu a, aliquam."
        />
      </Container>
      <section style={{ paddingBottom: '80px' }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justify="center">
            <Grid item xs={10} lg={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <GLServiceBox
                    bgImage="/images/serviceBox-sea.png"
                    icon={<GLIconShip />}
                    color={colors.sea}
                    title="Denizyolu Hizmetlerimiz"
                    pathname="/services/[detail]"
                    slug="seaway-service"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <GLServiceBox
                    bgImage="/images/serviceBox-air.png"
                    icon={<GLIconAirPlane />}
                    color={colors.air}
                    title="Havayolu Hizmetlerimiz"
                    pathname="/services/[detail]"
                    slug="airway-service"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <GLServiceBox
                    bgImage="/images/serviceBox-railway.png"
                    icon={<GLIconRailway />}
                    color={colors.iron}
                    title="Demiryolu Hizmetlerimiz"
                    pathname="/services/[detail]"
                    slug="railway-service"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <GLServiceBox
                    bgImage="/images/serviceBox-special.png"
                    icon={<GLIconStar />}
                    color={colors.blueMedium}
                    title="Özel Hizmet"
                    pathname="/services/[detail]"
                    slug="special-service"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Layout>
  )
}
export default OurServices

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
    },
  }
}
