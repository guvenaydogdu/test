import React, { FC } from 'react'
import { Button, Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ILanguage } from '../../../interfaces/Language'

interface ILanguageForm {
  handleCloseModal: () => void
  onHandleSubmit: (data: ILanguageFormData, isCreate: number | null) => void
  initialData?: ILanguage
}

const LanguageFormSchema = yup.object({
  name: yup.string().required(),
  code: yup.string().required(),
})

export type ILanguageFormData = yup.InferType<typeof LanguageFormSchema>

const LanguageForm: FC<ILanguageForm> = ({ handleCloseModal, onHandleSubmit, initialData }) => {
  const classes = useStyles()
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(LanguageFormSchema),
    defaultValues: {
      name: initialData ? initialData.name : '',
      code: initialData ? initialData.code : '',
    },
  })
  const onSubmit = (data: ILanguageFormData) => {
    onHandleSubmit(data, initialData ? initialData.id : null)
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
        name="code"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <TextField
              onChange={(event) => onChange(event.target.value)}
              fullWidth
              value={value}
              className={classes.formItem}
              label="Değer"
              multiline={true}
              rows={2}
              rowsMax={10}
              error={errors?.code ? true : false}
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

export default LanguageForm

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
