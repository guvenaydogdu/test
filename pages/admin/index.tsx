import { GetServerSideProps, NextPage } from 'next'
import AdminLayout from '../../components/Admin/AdminLayout'

import { AdminProtectedPage } from '../../lib/Auth'

const IndexPage: NextPage = () => {
  return <AdminLayout></AdminLayout>
}
export default IndexPage

export const getServerSideProps: GetServerSideProps = AdminProtectedPage((serverSideContext) => {
  console.log(serverSideContext)
  return {
    props: {},
  }
})
