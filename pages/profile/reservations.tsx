import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ProfileLayout } from '../../components/ProfilePage/ProfileLayout'
import { Reservations } from '../../components/ProfilePage/Reservations'

const ProfileReservationsPage: NextPage = () => {
  return (
    <Layout>
      <ProfileLayout>
        <Reservations />
      </ProfileLayout>
    </Layout>
  )
}

export default ProfileReservationsPage

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
    },
  }
}
