import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import AdminLayout from '../../components/Admin/AdminLayout'
import { Toolbar, Button, Box } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import GLTable from '../../components/Admin/Common/GLTable'
import GLBreadCrumb from '../../components/Admin/Common/GLBreadCrumb'
import { makeStyles } from '@material-ui/core/styles'
//import { AdminProtectedPage } from '../../lib/Auth'
import GLAdminModal from '../../components/Admin/Common/GLAdminModal'

import {
  ISliderPager,
  ISlider,
  ISlidersResponse,
  INewSlider,
  IUpdateSlider,
} from '../../interfaces/Slider'
import Requsts from '../../requests'
import SliderForm, { ISliderFormData } from '../../components/Admin/Sliders/SliderForm'
import { ShowToast, ToastType } from '../../components/Admin/Toasts'

const slidersColumns = [
  { id: 'name', label: 'Başlık' },
  { id: 'description', label: 'Açıklama' },
  { id: 'languageCode', label: 'Dil Kodu' },
]

const Sliders: NextPage = () => {
  const request = Requsts()
  const classes = useStyles()
  const [selectedData, setSelectedData] = useState<ISlider | null>(null)
  const [sliders, setSliders] = useState<ISlidersResponse | null>(null)
  const [modalStatus, setModalStatus] = useState<boolean>(false)
  const [pagerModel, setPagerModel] = useState<ISliderPager>({
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
    request.SliderRequest.getList(pagerModel)
      .then((res) => {
        setSliders(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const updateData = (id: number) => {
    const data = sliders?.data.find((slider) => slider.id == id)
    if (data) {
      setSelectedData(data)
    }
    handleOpenModal()
  }
  const removeData = (id: number) => {
    request.SliderRequest.remove(id)
      .then((res) => {
        if (res.isSuccess) {
          getData()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onHandleSubmit = (data: ISliderFormData, updateId: number | null) => {
    if (updateId) {
      const sData: IUpdateSlider = {
        id: updateId,
        name: data.name,
        description: data.description,
        position: data.position,
        languageCode: data.languageCode,
        fileName: data?.image?.fileName,
        fileBase64String: data?.image?.fileBase64String,
      }

      request.SliderRequest.update(sData)
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
    } else {
      const sData: INewSlider = {
        name: data.name,
        description: data.description,
        fileName: data?.image?.fileName as string,
        fileBase64String: data?.image?.fileBase64String as string,
        position: data.position,
        languageCode: data.languageCode,
      }
      request.SliderRequest.insert(sData)
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
          Slider Ekle
        </Button>
      </Box>
      <GLTable
        data={sliders?.data}
        totalItem={sliders?.totalItemCount}
        columNames={slidersColumns}
        handleUpdate={updateData}
        handleRemove={removeData}
        onPageChange={changePagerModelField}
        onPageRowsChange={changePagerModelField}
        rowsPerPage={pagerModel.pageSize}
        pageNumber={pagerModel.pageNumber}
      />

      <GLAdminModal status={modalStatus} handleCloseModal={handleCloseModal}>
        <h2>Slider Ekle</h2>
        <SliderForm
          initialData={selectedData || undefined}
          handleCloseModal={handleCloseModal}
          onHandleSubmit={onHandleSubmit}
        />
      </GLAdminModal>
    </AdminLayout>
  )
}
export default Sliders
/*
export const getServerSideProps: GetServerSideProps = AdminProtectedPage((serverSideContext) => {
  console.log(serverSideContext)
  return {
    props: {},
  }
})*/

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
