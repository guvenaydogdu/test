import React, { FC } from 'react'
import {
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { ISlider } from '../../../interfaces/Slider'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { GLBasicDropzone } from '../Common/GLBasicDropzone'

import { useDataContext } from '../../../providers/DataProvider'
interface ISliderForm {
  handleCloseModal: () => void
  onHandleSubmit: (data: ISliderFormData, isCreate: number | null) => void
  initialData?: ISlider
}

const sliderFormSchema = yup.object({
  name: yup.string().required(),
  image: yup
    .object({
      fileName: yup.string().nullable(),
      fileBase64String: yup.string().nullable(),
    })
    .default(function () {
      return { fileName: null, fileBase64String: null }
    })
    .nullable(),
  description: yup.string().required(),
  position: yup.number().moreThan(0).required(),
  languageCode: yup.string().required(),
})

export type ISliderFormData = yup.InferType<typeof sliderFormSchema>

const SliderForm: FC<ISliderForm> = ({ handleCloseModal, onHandleSubmit, initialData }) => {
  const { globalState } = useDataContext()
  const classes = useStyles()
  const { control, handleSubmit, errors, watch, setError } = useForm({
    resolver: yupResolver(sliderFormSchema),
    defaultValues: {
      name: initialData ? initialData.name : '',
      description: initialData ? initialData.description : '',
      position: initialData ? initialData.position : 0,
      languageCode: initialData ? initialData.languageCode : '',
    },
  })
  const onSubmit = (data: ISliderFormData) => {
    if (initialData) {
      onHandleSubmit(data, initialData.id)
    } else {
      if (watch('image').fileName) onHandleSubmit(data, null)
      else
        setError('image', {
          type: 'not_nullable',
          message: 'Not Nullable',
        })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <TextField
              onChange={(event) => onChange(event.target.value)}
              fullWidth
              value={value}
              className={classes.formItem}
              label="Başlık"
              error={errors?.name ? true : false}
            />
          )
        }}
      />

      <Controller
        name="image"
        control={control}
        defaultValue=""
        render={({ onChange }) => {
          return (
            <GLBasicDropzone
              onChange={onChange}
              defaultValue={initialData?.imagePath}
              error={errors?.image ? true : false}
            />
          )
        }}
      />

      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <TextField
              onChange={(event) => onChange(event.target.value)}
              fullWidth
              value={value}
              className={classes.formItem}
              label="Açıklama"
              multiline={true}
              rows={5}
              rowsMax={10}
              error={errors?.description ? true : false}
            />
          )
        }}
      />

      <Controller
        name="position"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <TextField
              onChange={(event) => onChange(event.target.value)}
              fullWidth
              value={value}
              className={classes.formItem}
              label="Pozisyon"
              error={errors?.position ? true : false}
              type="number"
            />
          )
        }}
      />
      <Controller
        name="languageCode"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <FormControl fullWidth variant="filled" className={classes.formItem}>
              <InputLabel htmlFor="filled-label-native-simple">Dil</InputLabel>
              <Select
                value={value}
                onChange={onChange}
                fullWidth
                error={errors?.languageCode ? true : false}
              >
                {globalState?.languages?.map((lang) => {
                  return (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
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

export default SliderForm

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
