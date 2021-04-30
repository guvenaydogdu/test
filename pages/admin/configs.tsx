import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import AdminLayout from '../../components/Admin/AdminLayout'
import { ConfigForm } from '../../components/Admin/Configs/ConfigForm'

import { AdminProtectedPage } from '../../lib/Auth'

const ConfigsPage: NextPage = () => {
  return (
    <AdminLayout>
      <ConfigForm />
    </AdminLayout>
  )
}
export default ConfigsPage

export const getServerSideProps: GetServerSideProps = AdminProtectedPage((serverSideContext) => {
  console.log(serverSideContext)
  return {
    props: {},
  }
})
