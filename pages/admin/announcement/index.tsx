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
import AnnouncementForm, {
  IAnnouncementFormData,
} from '../../../components/Admin/Announcement/AnnouncementForm'
import {
  IAnnouncement,
  IAnnouncementPager,
  IAnnouncementsResponse,
  INewAnnouncement,
  IUpdateAnnouncement,
} from '../../../interfaces/Announcement'
import Requests from '../../../requests'
import moment from 'moment'
import { ShowToast, ToastType } from '../../../components/Admin/Toasts'

const announcementColums = [
  { id: 'title', label: 'Başlık' },
  { id: 'shortDescription', label: 'Açıklama' },
  { id: 'languageCode', label: 'Dil Kodu' },
  { id: 'startDate', label: 'Başlangıç Tarihi', type: 'date' },
  { id: 'endDate', label: 'Bitiş Tarihi', type: 'date' },
]

const IndexPage: NextPage = () => {
  const request = Requests()
  const classes = useStyles()
  const [selectedData, setSelectedData] = useState<IAnnouncement | null>(null)
  const [announcements, setAnnouncements] = useState<IAnnouncementsResponse | null>(null)

  const [pagerModel, setPagerModel] = useState<IAnnouncementPager>({
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
    request.AnnouncementRequest.getList(pagerModel)
      .then((res) => {
        setAnnouncements(res)
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

  const updateData = (id: number) => {
    const data = announcements?.data.find((announcement) => announcement.id == id)
    if (data) {
      setSelectedData(data)
    }
    handleOpenModal()
  }
  const onHandleSubmit = (data: IAnnouncementFormData, updateId: number | null) => {
    if (updateId) {
      const tempData: IUpdateAnnouncement = {
        id: updateId,
        ...data,
        startDate: moment(data.startDate).toISOString(),
        endDate: moment(data.endDate).toISOString(),
      }
      request.AnnouncementRequest.update(tempData)
        .then(() => {
          handleCloseModal()
          getData()
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      const tempData: INewAnnouncement = {
        ...data,
        startDate: moment(data.startDate).toISOString(),
        endDate: moment(data.endDate).toISOString(),
      }
      request.AnnouncementRequest.insert(tempData)
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
  }

  const removeData = (id: number) => {
    request.AnnouncementRequest.remove(id)
      .then((res) => {
        if (res.isSuccess) {
          getData()
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
          Duyuru Ekle
        </Button>
      </Box>
      <GLTable
        data={announcements?.data}
        columNames={announcementColums}
        handleUpdate={updateData}
        handleRemove={removeData}
        rowsPerPage={pagerModel.pageSize}
        pageNumber={pagerModel.pageNumber}
        totalItem={announcements?.totalItemCount}
        onPageChange={changePagerModelField}
        onPageRowsChange={changePagerModelField}
      />

      <GLAdminModal status={modalStatus} handleCloseModal={handleCloseModal}>
        <h2>Duyuru Ekle</h2>
        <AnnouncementForm
          initialData={selectedData || undefined}
          handleCloseModal={handleCloseModal}
          onHandleSubmit={onHandleSubmit}
        />
      </GLAdminModal>
    </AdminLayout>
  )
}
export default IndexPage

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
