import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container, Grid, makeStyles } from '@material-ui/core'
import { GLSectionTitle } from '../components/Common/GLSectionTitle'
import { GLBanner } from '../components/Common/GLBanner'
import { colors } from '../theme'
import Requests from '../requests'
import { IStaticContentResponse, StaticContentType } from '../interfaces/StaticContent'

interface IHowToWork {
  data: IStaticContentResponse
}

const HowToWork: NextPage<IHowToWork> = ({ data }) => {
  const classes = useStyles()

  return (
    <Layout>
      <div className={classes.root}>
        <GLBanner imageUrl="/images/banner-sea.png" alt="Nasıl Çalışır?" />
        <Container maxWidth="lg">
          <GLSectionTitle title="Nasıl Çalışır?" />
        </Container>
        <div className={classes.content}>
          <Container maxWidth="lg">
            <Grid container spacing={10} justify="center">
              <Grid item xs={12} lg={10}>
                <div dangerouslySetInnerHTML={{ __html: data?.data?.value }} />
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </Layout>
  )
}

export default HowToWork

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  const request = Requests()
  const data = await request.StaticContentRequest.getByPageType(
    StaticContentType.HowItWork,
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
  insidePage: {
    paddingTop: '90px',
  },
  content: {
    backgroundColor: colors.white,
    padding: '130px 0 64px 0',
    textAlign: 'left',
  },
}))
