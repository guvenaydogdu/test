import React from 'react'
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { GLBanner } from '../../components/Common/GLBanner'
import { GLSectionTitle } from '../../components/Common/GLSectionTitle'
import { makeStyles, Container, Grid, Button } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { colors } from '../../theme'
import { GLGallery } from '../../components/Common/GLGallery'
import { IStaticContentResponse, StaticContentType } from '../../interfaces/StaticContent'
import Requests from '../../requests'
import Link from 'next/link'

const getData = (serviceName: string | undefined) => {
  if (serviceName == 'seaway-service') {
    return {
      formLink: '/forms/sea',
      imageUrl: '/images/banner-sea.png',
      sectionTitle: 'Denizyolu Hizmetlerimiz',
      videoUrl: '',
      thumbs: [
        '/images/service-sea-1.png',
        '/images/service-sea-2.png',
        '/images/service-sea-3.png',
      ],
    }
  } else if (serviceName == 'airway-service') {
    return {
      formLink: '/forms/air',
      imageUrl: '/images/banner-air.png',
      sectionTitle: 'Havayolu Hizmetlerimiz',
      videoUrl: '',
      thumbs: [
        '/images/service-air-1.png',
        '/images/service-air-2.png',
        '/images/service-air-3.png',
      ],
    }
  } else if (serviceName == 'railway-service') {
    return {
      formLink: '/forms/railway',
      imageUrl: '/images/banner-railway.png',
      sectionTitle: 'Demiryolu Hizmetlerimiz',
      videoUrl: '',
      thumbs: [
        '/images/service-railway-1.png',
        '/images/service-railway-2.png',
        '/images/service-railway-3.png',
      ],
    }
  } else if (serviceName == 'special-service') {
    return {
      formLink: '/forms/special',
      imageUrl: '/images/banner-special.png',
      sectionTitle: 'Özel Hizmet',
      videoUrl: '',
      thumbs: [
        '/images/service-special-1.png',
        '/images/service-special-2.png',
        '/images/service-special-3.png',
      ],
    }
  } else {
    return {
      formLink: '#',
      imageUrl: '',
      sectionTitle: '',

      thumbs: ['', '', ''],
    }
  }
}
interface IOurServicesDetail {
  data: IStaticContentResponse
}

const OurServicesDetail: NextPage<IOurServicesDetail> = ({ data }) => {
  const router = useRouter()
  const classes = useStyles()

  const { imageUrl, sectionTitle, thumbs, formLink } = getData(router.query?.detail as string)

  return (
    <Layout>
      <div className={classes.root}>
        <GLBanner imageUrl={imageUrl} alt={sectionTitle} />
        <Container maxWidth="lg">
          <GLSectionTitle title={sectionTitle} />

          <video width="752" controls className={classes.video}>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg" />
            <track src="captions_en.vtt" kind="captions" label="english_captions" />
            Your browser does not support HTML video.
          </video>
        </Container>
        <div className={classes.content}>
          <Container maxWidth="lg">
            <Grid container spacing={10} justify="center">
              <Grid item xs={12} lg={10}>
                <div dangerouslySetInnerHTML={{ __html: data?.data?.value }} />
                <Link href={formLink}>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    endIcon={<ChevronRightIcon />}
                    type="submit"
                    aria-label="take"
                  >
                    <span className="text">Fiyat Teklifi Al</span>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </div>
        <GLGallery data={thumbs} />
      </div>
    </Layout>
  )
}

export default OurServicesDetail

const getPageTypeId = (value: string) => {
  if (value == 'seaway-service') return StaticContentType.SeawayServices
  else if (value == 'airway-service') return StaticContentType.AirwayServices
  else if (value == 'railway-service') return StaticContentType.RailwayServices
  else if (value == 'special-service') return StaticContentType.SpecialServices
  else return StaticContentType.AirwayServices
}

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  const request = Requests()
  const pageTypeId = getPageTypeId(serverSideContext.params?.detail as string)
  const data = await request.StaticContentRequest.getByPageType(
    pageTypeId,
    serverSideContext.locale as string
  )

  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
      data: data,
    },
  }
}

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',

    '& p': {
      fontSize: '18px',
      lineHeight: '150%',
      textAlign: 'justify',
      margin: '0 0 32px 0',
    },
  },
  content: {
    backgroundColor: colors.white,
    padding: '130px 0 64px 0',
    textAlign: 'left',
  },
  btn: {
    display: 'flex',
    width: '255px',
    height: '48px',
    margin: '30px auto 0 auto',
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
  video: {
    marginBottom: '-88px',
  },
}))
