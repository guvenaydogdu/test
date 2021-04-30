import React, { useEffect, useRef, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { makeStyles } from '@material-ui/core/styles'
import AdminLayout from '../../components/Admin/AdminLayout'
import { Toolbar, Box, TextField, Button } from '@material-ui/core'
import GLTable from '../../components/Admin/Common/GLTable'
import GLBreadCrumb from '../../components/Admin/Common/GLBreadCrumb'
import GLAdminModal from '../../components/Admin/Common/GLAdminModal'
import { AdminProtectedPage } from '../../lib/Auth'

import Requsts from '../../requests'
import { IAdminUserCreate, IUser, IUserPager, IUsersResponse } from '../../interfaces/User'
import UserForm, { IUserFormData } from '../../components/Admin/Users/UserForm'
import UserAddForm, { IUserAddFormData } from '../../components/Admin/Users/UserAddForm'

import {
  ICitiesResponse,
  ICityPagerInput,
  ICountriesResponse,
  ICountryPagerInput,
} from '../../interfaces/City'
import { GlAutoComplete } from '../../components/Admin/Common/GlAutoComplete'
import { classNames } from '../../utils/styles'
import { IRolePager, IRolesResponse } from '../../interfaces/Role'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { maskedPhoneToNumber } from '../../utils/validation'
import { ShowToast, ToastType } from '../../components/Admin/Toasts'
const usersColumns = [
  { id: 'firstName', label: 'İsim' },
  { id: 'lastName', label: 'Soyisim' },
  { id: 'email', label: 'Email' },
  { id: 'companyName', label: 'Firma adı' },
]

const countriesParametes: ICountryPagerInput = {
  pageNumber: 1,
  pageSize: 1000,
  sortDescending: true,
}

const roleParameters: IRolePager = {
  pageNumber: 1,
  pageSize: 1000,
  sortDescending: true,
}

const UsersPage: NextPage = () => {
  const timeOutRef = useRef<any>()
  const request = Requsts()
  const classes = useStyles()
  const [selectedData, setSelectedData] = useState<IUser | null>(null)
  const [users, setUsers] = useState<IUsersResponse | null>(null)
  const [countries, setCountries] = useState<ICountriesResponse | null>(null)
  const [roles, setRoles] = useState<IRolesResponse | null>(null)
  const [cities, setCities] = useState<ICitiesResponse | null>(null)

  const [pagerModel, setPagerModel] = useState<IUserPager>({
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Id',
    sortDescending: true,
    countryId: 0,
    cityId: 0,
    searchText: undefined,
  })
  const [modalStatus, setModalStatus] = useState<boolean>(false)
  const [userAddmodalStatus, setUserAddModalStatus] = useState<boolean>(false)

  const handleOpenModal = () => {
    setModalStatus(true)
  }
  const handleCloseModal = () => {
    setModalStatus(false)
    setSelectedData(null)
  }

  const handleOpenAddUserModal = () => {
    setUserAddModalStatus(true)
  }
  const handleCloseAddUserModal = () => {
    setUserAddModalStatus(false)
  }

  useEffect(() => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }

    timeOutRef.current = setTimeout(() => {
      getData()
    }, 1000)
  }, [pagerModel])

  useEffect(() => {
    getCities()
  }, [pagerModel.countryId])

  useEffect(() => {
    getCountries()
    getRoles()
  }, [])
  const getCities = () => {
    if (pagerModel.countryId) {
      const citiesParameterst: ICityPagerInput = {
        pageNumber: 1,
        pageSize: 1000,
        sortDescending: true,
        includeCountry: false,
        countryId: Number(pagerModel.countryId),
      }
      request.CityRequest.getList(citiesParameterst)
        .then((res) => {
          setCities(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const getCountries = () => {
    request.CountryRequest.getList(countriesParametes)
      .then((res) => {
        setCountries(res)
      })
      .catch((err) => console.log(err))
  }
  const getRoles = () => {
    request.RoleRequest.getList(roleParameters)
      .then((res) => {
        setRoles(res)
      })
      .catch((err) => console.log(err))
  }
  const changePagerModelField = (field: string, value: any) => {
    setPagerModel({
      ...pagerModel,
      [field]: value,
    })
  }

  const getData = () => {
    request.UserRequest.getList(pagerModel)
      .then((res) => {
        setUsers(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const updateData = (id: number) => {
    const data = users?.data.find((user) => user.id == id)
    if (data) {
      setSelectedData(data)
    }
    handleOpenModal()
  }

  const onHandleSubmitUpdate = (data: IUserFormData, updateId: number | null) => {
    if (updateId && data.roleIds) {
      request.UserRoleRequest.updateList({ userId: updateId, roleIdList: data.roleIds })
        .then((res) => {
          if (res.isSuccess) {
            handleCloseModal()
            getData()
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

  const onHandleSubmitCreate = (data: IUserAddFormData) => {
    const adminUser: IAdminUserCreate = {
      ...data,
      companyPhone: maskedPhoneToNumber(data.companyPhone),
    }

    request.UserRequest.adminUserCreate(adminUser)
      .then((res) => {
        if (res.isSuccess) {
          ShowToast({ variant: ToastType.SUCCESS, text: 'Başarılı' })
          handleCloseAddUserModal()
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
        <Box>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddCircleIcon />}
            onClick={handleOpenAddUserModal}
            aria-label="add-slider"
          >
            Kullanıcı Ekle
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
          <Box className={classes.formItem}>
            <GlAutoComplete
              label={'Ülkeler'}
              value={pagerModel.countryId}
              onChange={(data: any) => changePagerModelField('countryId', data)}
              data={countries?.data.map((country) => {
                return {
                  id: country.id,
                  label: country.name,
                }
              })}
            />
          </Box>
          <Box className={classNames([classes.formItem, classes.space])}>
            <GlAutoComplete
              label={'Şehirler'}
              value={pagerModel.cityId}
              onChange={(data: any) => changePagerModelField('cityId', data)}
              data={cities?.data.map((city) => {
                return {
                  id: city.id,
                  label: city.name,
                }
              })}
            />
          </Box>
        </Box>
      </Box>
      <GLTable
        data={users?.data}
        totalItem={users?.totalItemCount}
        columNames={usersColumns}
        handleUpdate={updateData}
        onPageChange={changePagerModelField}
        onPageRowsChange={changePagerModelField}
        rowsPerPage={pagerModel.pageSize}
        pageNumber={pagerModel.pageNumber}
      />

      <GLAdminModal status={modalStatus} handleCloseModal={handleCloseModal}>
        <h2>Kullanıcı Düzenleme</h2>
        <UserForm
          initialData={selectedData}
          handleCloseModal={handleCloseModal}
          onHandleSubmit={onHandleSubmitUpdate}
          roles={roles?.data}
        />
      </GLAdminModal>
      <GLAdminModal status={userAddmodalStatus} handleCloseModal={handleCloseAddUserModal}>
        <h2>Kullanıcı Ekleme</h2>
        <UserAddForm
          handleCloseModal={handleCloseAddUserModal}
          onHandleSubmit={onHandleSubmitCreate}
          roles={roles?.data}
        />
      </GLAdminModal>
    </AdminLayout>
  )
}
export default UsersPage

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
