import { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import AdminLayout from '../../components/Admin/AdminLayout'
import { Toolbar } from '@material-ui/core'
import GLTable from '../../components/Admin/Common/GLTable'
import GLBreadCrumb from '../../components/Admin/Common/GLBreadCrumb'

import { AdminProtectedPage } from '../../lib/Auth'
import {
  ITransportTypePager,
  ITransportType,
  IUpdateTransportType,
} from '../../interfaces/TransportTypes'
import Requsts from '../../requests'
import { ShowToast, ToastType } from '../../components/Admin/Toasts'

const transportTypesColums = [
  { id: 'name', label: 'Adı' },
  { id: 'iconPath', label: 'İcon Uzantısı' },
]

const TransportType: NextPage = () => {
  const [transportTypesData, setTransportTypesData] = useState<ITransportType[] | null>(null)
  const request = Requsts()
  const [pagerModel] = useState<ITransportTypePager>({
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Id',
    sortDescending: false,
  })
  useEffect(() => {
    getData()
  }, [pagerModel])

  const getData = () => {
    request.TransportTypesRequest.getList(pagerModel)
      .then((res) => {
        setTransportTypesData(res.data)
      })
      .catch((err) => console.log(err))
  }

  const handleSwitch = (id: number) => {
    const currentStatus = transportTypesData?.find((transportType) => transportType.id == id)
      ?.isActive
    const data: IUpdateTransportType = { id, isActive: !currentStatus }
    request.TransportTypesRequest.update(data)
      .then(() => {
        getData()
        ShowToast({ variant: ToastType.SUCCESS, text: 'Başarılı' })
      })
      .catch((err) => console.log(err))
  }
  return (
    <AdminLayout>
      <Toolbar />
      <GLBreadCrumb />
      <GLTable
        data={transportTypesData}
        columNames={transportTypesColums}
        handleSwitch={handleSwitch}
        switchValue={'isActive'}
        rowsPerPage={pagerModel.pageSize}
        pageNumber={pagerModel.pageNumber}
        totalItem={transportTypesData?.length || 0}
      />
    </AdminLayout>
  )
}
export default TransportType

export const getServerSideProps: GetServerSideProps = AdminProtectedPage((serverSideContext) => {
  console.log(serverSideContext)
  return {
    props: {},
  }
})
