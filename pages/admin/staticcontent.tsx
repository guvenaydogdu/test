import { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import AdminLayout from '../../components/Admin/AdminLayout'
import { Toolbar, Button, Box } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import GLTable from '../../components/Admin/Common/GLTable'
import GLBreadCrumb from '../../components/Admin/Common/GLBreadCrumb'
import { makeStyles } from '@material-ui/core/styles'
import { AdminProtectedPage } from '../../lib/Auth'
import GLAdminModal from '../../components/Admin/Common/GLAdminModal'

import Requsts from '../../requests'

import StaticContentForm, {
  IStaticContentFormData,
} from '../../components/Admin/StaticContents/StaticContentForm'

import {
  IStaticContent,
  IStaticContentPager,
  IStaticContentsResponse,
} from '../../interfaces/StaticContent'
import { ShowToast, ToastType } from '../../components/Admin/Toasts'

const staticContentsColumns = [
  { id: 'name', label: 'Başlık' },
  { id: 'languageCode', label: 'Dil Kodu' },
  { id: 'description', label: 'Açıklama' },
]

const StaticContentPage: NextPage = () => {
  const request = Requsts()
  const classes = useStyles()
  const [selectedData, setSelectedData] = useState<IStaticContent | null>(null)
  const [staticContents, setStaticContents] = useState<IStaticContentsResponse | null>(null)

  const [modalStatus, setModalStatus] = useState<boolean>(false)
  const [pagerModel, setPagerModel] = useState<IStaticContentPager>({
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Id',
    sortDescending: true,
  })
  const changePagerModelField = (field: string, value: any) => {
    setPagerModel({
      ...pagerModel,
      [field]: value,
    })
  }
  const handleOpenModal = () => {
    setModalStatus(true)
  }
  const handleCloseModal = () => {
    setModalStatus(false)
    setSelectedData(null)
  }

  useEffect(() => {
    getData()
  }, [pagerModel])

  const getData = () => {
    request.StaticContentRequest.getList(pagerModel)
      .then((res) => {
        setStaticContents(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const updateData = (id: number) => {
    const data = staticContents?.data.find((staticcontent) => staticcontent.id == id)
    if (data) {
      setSelectedData(data)
    }
    handleOpenModal()
  }

  const onHandleSubmit = (data: IStaticContentFormData) => {
    request.StaticContentRequest.saveOrUpdate({ ...data })
      .then((res) => {
        if (res.isSuccess) {
          handleCloseModal()
          getData()
          ShowToast({ variant: ToastType.SUCCESS, text: 'Başarılı' })
        } else {
          if (res.messages?.length > 0) {
            ShowToast({ variant: ToastType.ERROR, text: res.messages[0].message })
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <AdminLayout>
      <Toolbar />
      <GLBreadCrumb />
      <Box className={classes.actionBox}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddCircleIcon />}
          onClick={handleOpenModal}
          aria-label="add-slider"
        >
          Statik İçerik Ekle
        </Button>
      </Box>
      <GLTable
        data={staticContents?.data}
        totalItem={staticContents?.totalItemCount}
        columNames={staticContentsColumns}
        handleUpdate={updateData}
        //handleRemove={removeData}
        onPageChange={changePagerModelField}
        onPageRowsChange={changePagerModelField}
        rowsPerPage={pagerModel.pageSize}
        pageNumber={pagerModel.pageNumber}
      />

      <GLAdminModal status={modalStatus} handleCloseModal={handleCloseModal}>
        <h2>Static Content</h2>
        <StaticContentForm
          initialData={selectedData || undefined}
          handleCloseModal={handleCloseModal}
          onHandleSubmit={onHandleSubmit}
        />
      </GLAdminModal>
    </AdminLayout>
  )
}
export default StaticContentPage

export const getServerSideProps: GetServerSideProps = AdminProtectedPage((serverSideContext) => {
  console.log(serverSideContext)
  return {
    props: {},
  }
})

const useStyles = makeStyles((theme) => ({
  actionBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}))
