import React, { FC } from 'react'
import { Button, Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { IRole } from '../../../interfaces/Role'
import Autocomplete from '@material-ui/lab/Autocomplete'

import _ from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import InputMask from 'react-input-mask'
import { GLCityAutoComplete } from '../../AutoCompletes/GLCityAutoComplete'
import { GLCountryAutoComplete } from '../../AutoCompletes/GLCountryAutoComplete'

interface IUserAddForm {
  handleCloseModal: () => void
  onHandleSubmit: (data: IUserAddFormData) => void
  roles?: IRole[]
}

const addUserFormSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordAgain: yup.string().required(),
  companyPhone: yup.string().required(),
  countryId: yup.number().moreThan(0).required(),
  cityId: yup.number().moreThan(0).required(),
  roles: yup.array().of(yup.number().required()).required(),
})

export type IUserAddFormData = yup.InferType<typeof addUserFormSchema>

const UserAddForm: FC<IUserAddForm> = ({ handleCloseModal, onHandleSubmit, roles }) => {
  const classes = useStyles()

  const { control, handleSubmit, errors, watch, setError } = useForm({
    resolver: yupResolver(addUserFormSchema),
  })

  const onSubmit = (data: IUserAddFormData) => {
    if (data.password !== data.passwordAgain) {
      setError('password', {
        type: 'manual',
        message: 'They are not same',
      })
      setError('passwordAgain', {
        type: 'manual',
        message: 'They are not same',
      })
      return
    }
    onHandleSubmit(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <TextField
              onChange={(event) => onChange(event.target.value)}
              fullWidth
              value={value}
              className={classes.formItem}
              label="İsim"
              error={errors?.firstName ? true : false}
            />
          )
        }}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <TextField
              onChange={(event) => onChange(event.target.value)}
              fullWidth
              value={value}
              className={classes.formItem}
              label="Soyisim"
              error={errors?.lastName ? true : false}
            />
          )
        }}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <TextField
              onChange={(event) => onChange(event.target.value)}
              fullWidth
              value={value}
              className={classes.formItem}
              label="Email"
              error={errors?.email ? true : false}
            />
          )
        }}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <TextField
              onChange={(event) => onChange(event.target.value)}
              fullWidth
              value={value}
              className={classes.formItem}
              label="Şifre"
              error={errors?.password ? true : false}
            />
          )
        }}
      />
      <Controller
        name="passwordAgain"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <TextField
              onChange={(event) => onChange(event.target.value)}
              fullWidth
              value={value}
              className={classes.formItem}
              label="Şifre tekrar"
              error={errors?.passwordAgain ? true : false}
            />
          )
        }}
      />

      <Controller
        name="companyPhone"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <InputMask mask="(599) 999 99 99" value={value} onChange={onChange}>
              {(inputProps: any) => {
                return (
                  <TextField
                    {...inputProps}
                    type="tel"
                    fullWidth
                    onChange={inputProps.onChange}
                    value={inputProps.value}
                    className={classes.formItem}
                    label="Telefon"
                    error={errors?.companyPhone ? true : false}
                  />
                )
              }}
            </InputMask>
          )
        }}
      />

      <Controller
        name="countryId"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <Box className={classes.formItem}>
              <GLCountryAutoComplete
                value={value}
                onChange={onChange}
                error={errors?.countryId ? true : false}
                variant="outlined"
                placeholder={'Ülke'}
              />
            </Box>
          )
        }}
      />

      <Controller
        name="cityId"
        control={control}
        defaultValue=""
        render={({ onChange }) => {
          return (
            <Box className={classes.formItem}>
              <GLCityAutoComplete
                onChange={onChange}
                error={errors?.cityId ? true : false}
                variant="outlined"
                countryId={watch('countryId')}
                placeholder={'Şehir'}
              />
            </Box>
          )
        }}
      />

      <Controller
        name="roles"
        control={control}
        render={({ onChange, value }) => {
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

export default UserAddForm

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
