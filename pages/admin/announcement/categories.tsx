import { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { makeStyles } from '@material-ui/core/styles'
import AdminLayout from '../../../components/Admin/AdminLayout'
import { Toolbar, Button, Box } from '@material-ui/core'
import GLTable from '../../../components/Admin/Common/GLTable'
import GLBreadCrumb from '../../../components/Admin/Common/GLBreadCrumb'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import GLAdminModal from '../../../components/Admin/Common/GLAdminModal'
import { AdminProtectedPage } from '../../../lib/Auth'
import CategoryForm, {
  ICategoryFormData,
} from '../../../components/Admin/Announcement/CategoryForm'
import {
  IAnnouncementCategory,
  IAnnouncementCategoryPager,
  IAnnouncementCategoriesResponse,
} from '../../../interfaces/Announcement'
import Requests from '../../../requests'

const categoryColums = [
  { id: 'name', label: 'Name' },
  { id: 'icon', label: 'İcon', isIcon: true },
]

const CategoriesPage: NextPage = () => {
  const request = Requests()
  const classes = useStyles()
  const [selectedData, setSelectedData] = useState<IAnnouncementCategory | null>(null)
  const [categories, setCategories] = useState<IAnnouncementCategoriesResponse | null>(null)
  const [pagerModel, setPagerModel] = useState<IAnnouncementCategoryPager>({
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
  const changePagerModelField = (field: string, value: any) => {
    setPagerModel({
      ...pagerModel,
      [field]: value,
    })
  }

  const getData = () => {
    request.AnnouncementCategoryRequest.getList(pagerModel)
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

  const removeData = (id: number) => {
    request.AnnouncementCategoryRequest.remove(id)
      .then((res) => {
        if (res.isSuccess) {
          getData()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const onHandleSubmit = (data: ICategoryFormData, updateId: number | null) => {
    if (updateId) {
      request.AnnouncementCategoryRequest.update({ ...data, id: updateId })
        .then(() => {
          handleCloseModal()
          getData()
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      //request.AnnouncementCategoryRequest.update(data)
      request.AnnouncementCategoryRequest.insert(data)
        .then(() => {
          handleCloseModal()
          getData()
        })
        .catch((err) => {
          console.log(err)
        })
    }
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
          aria-label="add-category"
        >
          Duyuru Kategori Ekle
        </Button>
      </Box>
      <GLTable
        data={categories?.data}
        totalItem={categories?.totalItemCount}
        columNames={categoryColums}
        handleUpdate={updateData}
        handleRemove={removeData}
        onPageChange={changePagerModelField}
        onPageRowsChange={changePagerModelField}
        rowsPerPage={pagerModel.pageSize}
        pageNumber={pagerModel.pageNumber}
      />

      <GLAdminModal status={modalStatus} handleCloseModal={handleCloseModal}>
        <h2>Duyuru Kategori Ekle</h2>
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
    justifyContent: 'flex-start',
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}))
