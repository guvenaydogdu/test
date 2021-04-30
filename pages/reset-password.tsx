import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { makeStyles, Container, Grid, Box } from '@material-ui/core'
import { colors } from '../theme'
import { GLForgotPasswordEmail } from '../components/Authentication/GLForgotPasswordEmail'

const ResetPassword: NextPage = () => {
  const classes = useStyles()

  return (
    <Layout>
      <Box className={classes.insidePage}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justify="center">
            <Grid item xs={8}>
              <Box className={classes.contentBox}>
                <Box className={classes.content}>
                  <GLForgotPasswordEmail />
                  {/* <GLForgotPasswordNew /> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}

export default ResetPassword

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
    },
  }
}

const useStyles = makeStyles(() => ({
  insidePage: {
    padding: '8vh 0',
  },
  contentBox: {
    backgroundColor: colors.white,
    borderRadius: '5px',
    padding: '23px',
  },
  content: {
    maxWidth: '540px',
    margin: '0 auto',

    '& h1': {
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '150%',
      textAlign: 'center',
    },

    '& p': {
      fontWeight: 700,
      color: colors.grayMedium,
    },
  },
}))
