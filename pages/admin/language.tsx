import { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { makeStyles } from '@material-ui/core/styles'
import AdminLayout from '../../components/Admin/AdminLayout'
import { Toolbar, Button, Box } from '@material-ui/core'
import GLTable from '../../components/Admin/Common/GLTable'
import GLBreadCrumb from '../../components/Admin/Common/GLBreadCrumb'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import GLAdminModal from '../../components/Admin/Common/GLAdminModal'
import { AdminProtectedPage } from '../../lib/Auth'
import { ILanguage, ILanguagePager, ILanguagesResponse } from '../../interfaces/Language'
import Requests from '../../requests'
import LanguageForm, { ILanguageFormData } from '../../components/Admin/Languages/LanguageForm'
import { ShowToast, ToastType } from '../../components/Admin/Toasts'

const languageColumns = [
  { id: 'name', label: 'İsim' },
  { id: 'code', label: 'Code' },
]

const LanguagePage: NextPage = () => {
  const request = Requests()
  const classes = useStyles()
  const [selectedData, setSelectedData] = useState<ILanguage | null>(null)
  const [languages, setLanguages] = useState<ILanguagesResponse | null>(null)

  const [pagerModel, setPagerModel] = useState<ILanguagePager>({
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Id',
    sortDescending: true,
  })

  const [modalStatus, setModalStatus] = useState<boolean>(false)
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
    request.LanguageRequest.getList(pagerModel)
      .then((res) => {
        setLanguages(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const changePagerModelField = (field: string, value: any) => {
    setPagerModel({
      ...pagerModel,
      [field]: value,
    })
  }

  const onHandleSubmit = (data: ILanguageFormData) => {
    request.LanguageRequest.create(data)
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

  const removeData = (id: number) => {
    request.LanguageRequest.remove(id)
      .then((res) => {
        if (res.isSuccess) {
          getData()
          handleCloseModal()
        }
      })
      .catch((err) => console.log(err))
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
          aria-label="add-annoucment"
        >
          Dil Ekle
        </Button>
      </Box>
      <GLTable
        data={languages?.data}
        columNames={languageColumns}
        //handleUpdate={updateData}
        handleRemove={removeData}
        rowsPerPage={pagerModel.pageSize}
        pageNumber={pagerModel.pageNumber}
        totalItem={languages?.totalItemCount}
        onPageChange={changePagerModelField}
        onPageRowsChange={changePagerModelField}
      />

      <GLAdminModal status={modalStatus} handleCloseModal={handleCloseModal}>
        <h2>Dil</h2>
        <LanguageForm
          initialData={selectedData || undefined}
          handleCloseModal={handleCloseModal}
          onHandleSubmit={onHandleSubmit}
        />
      </GLAdminModal>
    </AdminLayout>
  )
}
export default LanguagePage

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
  modalAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formItem: {
    marginBottom: theme.spacing(2),
  },
}))
