import React, { FC, useEffect, useRef, useState } from 'react'
import { Button, Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { ICategoriesResponse, ICategory, ICategoryPager } from '../../../interfaces/Category'
import Requests from '../../../requests'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

const filterOptions = createFilterOptions({
  // matchFrom: 'start',
  stringify: (option: ICategory) => option?.nameTR + option?.nameEN,
})

interface ICategoryForm {
  handleCloseModal: () => void
  onHandleSubmit: (data: ICategoryFormData, isCreate: number | null) => void
  initialData?: ICategory
}

const CategoryFormSchema = yup.object({
  nameTR: yup.string().required(),
  nameEN: yup.string().required(),
  parentCategoryId: yup.number().notRequired(),
})

export type ICategoryFormData = yup.InferType<typeof CategoryFormSchema>

const CategoryForm: FC<ICategoryForm> = ({ handleCloseModal, onHandleSubmit, initialData }) => {
  const requests = Requests()

  const classes = useStyles()
  const [text, setText] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const timeOutRef = useRef<any>()
  const [data, setData] = useState<ICategoriesResponse | null>(null)

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(CategoryFormSchema),
    defaultValues: {
      nameTR: initialData ? initialData.nameTR : '',
      nameEN: initialData ? initialData.nameEN : '',
      parentCategoryId: initialData ? initialData.parentCategoryId : undefined,
    },
  })
  const onSubmit = (data: ICategoryFormData) => {
    onHandleSubmit(data, initialData ? initialData.id : null)
  }
  const onTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!loading) setLoading(true)
    setText(evt.target.value)
  }
  useEffect(() => {
    if (text) {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current)
      }

      timeOutRef.current = setTimeout(() => {
        const tempData: ICategoryPager = {
          pageNumber: 1,
          pageSize: 25,
          sortDescending: true,
          searchText: text,
          parentCategoryId: null,
        }
        requests.CategoryRequest.getList(tempData)
          .then((res) => {
            setData(res)
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false)
          })
      }, 1000)
    }
  }, [text])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="nameTR"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <TextField
              onChange={(event) => onChange(event.target.value)}
              fullWidth
              value={value}
              className={classes.formItem}
              label="Türkçe İsim"
              error={errors?.nameTR ? true : false}
            />
          )
        }}
      />
      <Controller
        name="nameEN"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <TextField
              onChange={(event) => onChange(event.target.value)}
              fullWidth
              value={value}
              className={classes.formItem}
              label="İngilizce İsim"
              error={errors?.nameEN ? true : false}
            />
          )
        }}
      />

      <Controller
        name="parentCategoryId"
        control={control}
        render={({ onChange }) => {
          return (
            <Autocomplete
              id="virtualize-demo"
              fullWidth
              filterOptions={filterOptions}
              defaultValue={initialData ? initialData.parentCategory : undefined}
              options={data?.data ? data.data : []}
              className={classes.formItem}
              getOptionLabel={(option) => option.nameTR + ' - ' + option.nameEN}
              renderInput={(params) => (
                <TextField {...params} variant="standard" onChange={onTextChange} />
              )}
              onChange={(event: any, newValue: ICategory | null) => {
                onChange(newValue?.id)
              }}
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

export default CategoryForm

const useStyles = makeStyles((theme) => ({
  modalAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  formItem: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}))
