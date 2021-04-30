import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProfileLayout } from '../../components/ProfilePage/ProfileLayout'
import { CompanyInformation } from '../../components/ProfilePage/CompanyInformations'

const ProfileCompanyPage: NextPage = () => {
  return (
    <Layout>
      <ProfileLayout>
        <CompanyInformation />
      </ProfileLayout>
    </Layout>
  )
}

export default ProfileCompanyPage

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
    },
  }
}
