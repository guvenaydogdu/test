import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProfileLayout } from '../../components/ProfilePage/ProfileLayout'
import { MessagesDetail } from '../../components/ProfilePage/MessagesDetail'

const ProfileMessagesPage: NextPage = () => {
  const [pageState] = useState<boolean>(false)

  return (
    <Layout>
      <ProfileLayout>{pageState === false ? <MessagesDetail /> : <MessagesDetail />}</ProfileLayout>
    </Layout>
  )
}

export default ProfileMessagesPage

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
    },
  }
}
