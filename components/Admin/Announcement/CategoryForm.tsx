import { FC } from 'react'
import { Button, Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { IAnnouncementCategory } from '../../../interfaces/Announcement'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import dynamic from 'next/dynamic'

const DynamicIconPicker = dynamic(() => import('../../../components/Admin/Common/IconPicker'), {
  ssr: false,
})

interface ICategoryForm {
  handleCloseModal: () => void
  onHandleSubmit: (data: ICategoryFormData, isCreate: number | null) => void
  initialData?: IAnnouncementCategory
}

const categorFormSchema = yup.object({
  name: yup.string().required(),
  icon: yup.string().required(),
})

export type ICategoryFormData = yup.InferType<typeof categorFormSchema>

const CategoryForm: FC<ICategoryForm> = ({ handleCloseModal, onHandleSubmit, initialData }) => {
  const classes = useStyles()
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(categorFormSchema),
    defaultValues: {
      name: initialData ? initialData.name : '',
      icon: initialData ? initialData.icon : '',
    },
  })
  const onSubmit = (data: ICategoryFormData) => {
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
              label="Kategori Adı"
              error={errors?.name ? true : false}
            />
          )
        }}
      />

      <Controller
        name="icon"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return <DynamicIconPicker onChange={onChange} value={value} />
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
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}))
