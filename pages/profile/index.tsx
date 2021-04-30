import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ProfileLayout } from '../../components/ProfilePage/ProfileLayout'
import { PersonalInformation } from '../../components/ProfilePage/PersonalInformations'

const ProfileIndex: NextPage = () => {
  return (
    <Layout>
      <ProfileLayout>
        <PersonalInformation />
      </ProfileLayout>
    </Layout>
  )
}

export default ProfileIndex

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
    },
  }
}
