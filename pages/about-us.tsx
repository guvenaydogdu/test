import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button, Container, Grid, makeStyles } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Link from 'next/link'
import { GLSectionTitle } from '../components/Common/GLSectionTitle'
import { GLBanner } from '../components/Common/GLBanner'
import { colors } from '../theme'
import Requests from '../requests'
import { IStaticContentResponse, StaticContentType } from '../interfaces/StaticContent'

interface IAboutUs {
  data: IStaticContentResponse
}
const AboutUs: NextPage<IAboutUs> = ({ data }) => {
  const classes = useStyles()

  return (
    <Layout>
      <div className={classes.root}>
        <GLBanner imageUrl="/images/banner-sea.png" alt="Hakkımızda" />
        <Container maxWidth="lg">
          <GLSectionTitle title="Hakkımızda" />
        </Container>
        <div className={classes.content}>
          <Container maxWidth="lg">
            <Grid container spacing={10} justify="center">
              <Grid item xs={12} lg={10}>
                <div dangerouslySetInnerHTML={{ __html: data?.data?.value }} />
                <Link href="/forms/sea">
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
      </div>
    </Layout>
  )
}

export default AboutUs

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  const request = Requests()
  const data = await request.StaticContentRequest.getByPageType(
    StaticContentType.About,
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
}))
