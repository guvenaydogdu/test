import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SpecialForm } from '../../components/DemandForms/SpecialForm'

const PriceRequestFormSpecial: NextPage = () => {
  return (
    <Layout>
      <SpecialForm />
    </Layout>
  )
}

export default PriceRequestFormSpecial

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
    },
  }
}
