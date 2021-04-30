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
import { IAnnouncement } from '../../../interfaces/Announcement'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import 'moment/locale/tr'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { useDataContext } from '../../../providers/DataProvider'
import dynamic from 'next/dynamic'

const HtmlEditorDynamic = dynamic(() => import('../Common/HtmlEditor'), {
  ssr: false,
})

interface IAnnouncementForm {
  handleCloseModal: () => void
  onHandleSubmit: (data: IAnnouncementFormData, isCreate: number | null) => void
  initialData?: IAnnouncement
}

const annoucementFormSchema = yup.object({
  title: yup.string().required(),
  shortDescription: yup.string().required(),
  body: yup.string().required(),
  languageCode: yup.string().required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
})

export type IAnnouncementFormData = yup.InferType<typeof annoucementFormSchema>

const today = new Date()

const AnnouncementForm: FC<IAnnouncementForm> = ({
  handleCloseModal,
  onHandleSubmit,
  initialData,
}) => {
  const classes = useStyles()
  const { i18n } = useTranslation()
  moment.locale(i18n.language)
  const { globalState } = useDataContext()

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(annoucementFormSchema),
    defaultValues: {
      title: initialData ? initialData.title : '',
      shortDescription: initialData ? initialData.shortDescription : '',
      body: initialData ? initialData.body : '',
      languageCode: initialData ? initialData.languageCode : '',
      startDate: initialData ? initialData.startDate : today.toDateString(),
      endDate: initialData ? initialData.endDate : today.toDateString(),
    },
  })
  const onSubmit = (data: IAnnouncementFormData) => {
    onHandleSubmit(data, initialData ? initialData.id : null)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
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
              error={errors?.title ? true : false}
            />
          )
        }}
      />

      <Controller
        name="shortDescription"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <TextField
              onChange={(event) => onChange(event.target.value)}
              fullWidth
              value={value}
              className={classes.formItem}
              label="Kısa Açıklama"
              error={errors?.shortDescription ? true : false}
            />
          )
        }}
      />
      <Controller
        name="body"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return <HtmlEditorDynamic onChange={(value: string) => onChange(value)} value={value} />
        }}
      />

      <Controller
        name="startDate"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <MuiPickersUtilsProvider
              libInstance={moment}
              utils={MomentUtils}
              locale={i18n.language}
            >
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                className={classes.formItem}
                error={errors?.startDate ? true : false}
                variant="inline"
                format="DD/MM/yyyy"
                margin="normal"
                label="Başlangıç zamanı"
                value={value}
                onChange={onChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                minDate={new Date()}
              />
            </MuiPickersUtilsProvider>
          )
        }}
      />

      <Controller
        name="endDate"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <MuiPickersUtilsProvider
              libInstance={moment}
              utils={MomentUtils}
              locale={i18n.language}
            >
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                className={classes.formItem}
                error={errors?.endDate ? true : false}
                variant="inline"
                format="DD/MM/yyyy"
                margin="normal"
                label="Bitiş zamanı"
                value={value}
                onChange={onChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                minDate={new Date()}
              />
            </MuiPickersUtilsProvider>
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

export default AnnouncementForm

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
