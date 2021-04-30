import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SignUpForm } from '../components/Authentication/SignUpForm'

const Register: NextPage = () => {
  return (
    <Layout>
      <SignUpForm />
    </Layout>
  )
}

export default Register

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
    },
  }
}
