import React, { useEffect, useRef, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import AdminLayout from '../../../components/Admin/AdminLayout'
import { Toolbar, Button, Box, TextField } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import GLTable from '../../../components/Admin/Common/GLTable'
import GLBreadCrumb from '../../../components/Admin/Common/GLBreadCrumb'
import { makeStyles } from '@material-ui/core/styles'
import { AdminProtectedPage } from '../../../lib/Auth'
import GLAdminModal from '../../../components/Admin/Common/GLAdminModal'

import Requsts from '../../../requests'
import { ICategoriesResponse, ICategory, ICategoryPager } from '../../../interfaces/Category'
import CategoryForm, { ICategoryFormData } from '../../../components/Admin/Definitions/CategoryForm'
import { ShowToast, ToastType } from '../../../components/Admin/Toasts'

const categoriesColumns = [
  { id: 'nameTR', label: 'Türkçe İsim' },
  { id: 'nameEN', label: 'İngilizce İsim' },
  { id: 'parentCategory', label: 'Üst Kategori', subId: 'name' },
]

const CategoriesPage: NextPage = () => {
  const timeOutRef = useRef<any>()
  const request = Requsts()
  const classes = useStyles()
  const [selectedData, setSelectedData] = useState<ICategory | null>(null)
  const [categories, setCategories] = useState<ICategoriesResponse | null>(null)

  const [modalStatus, setModalStatus] = useState<boolean>(false)
  const [pagerModel, setPagerModel] = useState<ICategoryPager>({
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Id',
    sortDescending: true,
    parentCategoryId: null,
    includeParentCategory: true,
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
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }

    timeOutRef.current = setTimeout(() => {
      getData()
    }, 1000)
  }, [pagerModel])

  const getData = () => {
    request.CategoryRequest.getList(pagerModel)
      .then((res) => {
        setCategories(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const updateData = (id: number) => {
    const data = categories?.data.find((category) => category.id == id)
    if (data) {
      setSelectedData(data)
    }
    handleOpenModal()
  }

  const onHandleSubmit = (data: ICategoryFormData, updateId: number | null) => {
    if (updateId) {
      request.CategoryRequest.update({ id: updateId, ...data })
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
        .catch((err) => console.log(err))
    } else {
      request.CategoryRequest.insert(data)
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
        .catch((err) => console.log(err))
    }
  }

  return (
    <AdminLayout>
      <Toolbar />
      <GLBreadCrumb />
      <Box className={classes.actionBox}>
        <Box>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddCircleIcon />}
            onClick={handleOpenModal}
            aria-label="add-slider"
          >
            Kategori Ekle
          </Button>
        </Box>
        <Box>
          <Box className={classes.formItem}>
            <TextField
              onChange={(event) => changePagerModelField('searchText', event.target.value)}
              fullWidth
              value={pagerModel.searchText}
              label="Arama"
              variant="outlined"
              style={{ marginBottom: 20 }}
            />
          </Box>
        </Box>
      </Box>

      <GLTable
        data={categories?.data}
        totalItem={categories?.totalItemCount}
        columNames={categoriesColumns}
        handleUpdate={updateData}
        //handleRemove={removeData}
        onPageChange={changePagerModelField}
        onPageRowsChange={changePagerModelField}
        rowsPerPage={pagerModel.pageSize}
        pageNumber={pagerModel.pageNumber}
      />

      <GLAdminModal status={modalStatus} handleCloseModal={handleCloseModal}>
        <h2>Kategori</h2>
        <CategoryForm
          initialData={selectedData || undefined}
          handleCloseModal={handleCloseModal}
          onHandleSubmit={onHandleSubmit}
        />
      </GLAdminModal>
    </AdminLayout>
  )
}
export default CategoriesPage

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

    '& > div': {
      display: 'flex',
      flex: 1,
      '&:last-child': {
        justifyContent: 'flex-end',
      },
    },
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  formItem: {
    width: '250px',
  },
  space: {
    marginLeft: '25px',
  },
}))
