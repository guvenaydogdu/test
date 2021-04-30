import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProfileLayout } from '../../components/ProfilePage/ProfileLayout'
import { AllDemands } from '../../components/ProfilePage/AllDemands'

const ProfileAllUser: NextPage = () => {
  return (
    <Layout>
      <ProfileLayout>
        <AllDemands />
      </ProfileLayout>
    </Layout>
  )
}

export default ProfileAllUser

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
    },
  }
}
