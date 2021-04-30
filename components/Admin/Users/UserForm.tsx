import React, { FC, useEffect } from 'react'
import { Button, Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { IUser } from '../../../interfaces/User'
import { IRole } from '../../../interfaces/Role'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Requests from '../../../requests'
import _ from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'

interface IUserForm {
  handleCloseModal: () => void
  onHandleSubmit: (data: IUserFormData, updateId: number | null) => void
  initialData: IUser | null
  roles?: IRole[]
}

const userRoleFormSchema = yup.object({
  roleIds: yup.array().of(yup.number().required()).required(),
})

export type IUserFormData = yup.InferType<typeof userRoleFormSchema>

const UserForm: FC<IUserForm> = ({ handleCloseModal, onHandleSubmit, initialData, roles }) => {
  const request = Requests()
  const classes = useStyles()

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(userRoleFormSchema),
    defaultValues: {},
  })
  useEffect(() => {
    getUserRole()
  }, [])

  const getUserRole = () => {
    if (initialData?.id) {
      request.UserRoleRequest.listByUserId(initialData?.id)
        .then((res) => {
          const roleIds: number[] = []
          res.data.forEach((role) => {
            roleIds.push(role.roleId)
          })

          return roleIds
        })
        .catch((err) => console.log(err))
        .then((data) => {
          reset({ roleIds: data as number[] })
        })
    }
  }

  const onSubmit = (data: IUserFormData) => {
    onHandleSubmit(data, initialData && initialData.id)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="roleIds"
        control={control}
        render={({ onChange, value }) => {
          console.log('value', value)
          return (
            <Autocomplete
              multiple
              id="tags-outlined"
              options={roles ? roles : []}
              getOptionLabel={(option: IRole) => option.name}
              className={classes.formItem}
              //defaultValue={_.filter(roles, function(role) { console.log(value+"-"+role.id); return role}) as IRole[]}
              value={
                _.filter(roles, function (role) {
                  if (value?.includes(role.id)) {
                    return role
                  }
                }) as IRole[]
              }
              onChange={(event: any, newValue: IRole[] | null) => {
                const roleIds: number[] = []
                newValue?.forEach((role) => {
                  roleIds.push(role.id)
                })
                onChange(roleIds)
              }}
              filterSelectedOptions
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Kullanıcı Tipi"
                  //placeholder="Kullanıcı Tipi"
                />
              )}
            />
          )
        }}
      />

      <Box className={classes.modalAction}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleCloseModal}
          aria-label="cancel"
        >
          Vazgeç
        </Button>
        <Button
          aria-label="save"
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Kaydet
        </Button>
      </Box>
    </form>
  )
}

export default UserForm

const useStyles = makeStyles((theme) => ({
  modalAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  formItem: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}))
