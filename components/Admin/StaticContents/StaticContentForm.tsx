import React, { FC } from 'react'
import {
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IStaticContent, StaticContentType } from '../../../interfaces/StaticContent'
import { useDataContext } from '../../../providers/DataProvider'
import dynamic from 'next/dynamic'

const HtmlEditorDynamic = dynamic(() => import('../Common/HtmlEditor'), {
  ssr: false,
})
interface IStaticContentForm {
  handleCloseModal: () => void
  onHandleSubmit: (data: IStaticContentFormData) => void
  initialData?: IStaticContent
}

const StaticContentFormSchema = yup.object({
  name: yup.string().required(),
  value: yup.string().required(),
  description: yup.string().required(),
  pageType: yup.number().moreThan(0).required(),
  languageCode: yup.string().required(),
})

export type IStaticContentFormData = yup.InferType<typeof StaticContentFormSchema>

const StaticContentForm: FC<IStaticContentForm> = ({
  handleCloseModal,
  onHandleSubmit,
  initialData,
}) => {
  const classes = useStyles()
  const { globalState } = useDataContext()
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(StaticContentFormSchema),
    defaultValues: {
      name: initialData ? initialData.name : '',
      value: initialData ? initialData.value : '',
      description: initialData ? initialData.description : '',
      pageType: initialData ? initialData.pageType : 0,
      languageCode: initialData ? initialData.languageCode : '',
    },
  })
  const onSubmit = (data: IStaticContentFormData) => {
    onHandleSubmit(data)
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
        name="value"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return <HtmlEditorDynamic onChange={(value: string) => onChange(value)} value={value} />
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
              rows={3}
              rowsMax={15}
              error={errors?.description ? true : false}
            />
          )
        }}
      />

      <Controller
        name="pageType"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <FormControl fullWidth variant="filled" className={classes.formItem}>
              <InputLabel htmlFor="filled-label-native-simple">Sayfa</InputLabel>
              <Select
                value={value}
                onChange={onChange}
                fullWidth
                error={errors?.description ? true : false}
              >
                <MenuItem key={StaticContentType.About} value={StaticContentType.About}>
                  Hakkımızda
                </MenuItem>
                <MenuItem key={StaticContentType.Database} value={StaticContentType.Database}>
                  Veri bankası
                </MenuItem>
                <MenuItem key={StaticContentType.HowItWork} value={StaticContentType.HowItWork}>
                  Nasıl Çalışır
                </MenuItem>
                <MenuItem key={StaticContentType.HowItWork} value={StaticContentType.HowItWork}>
                  Nasıl Çalışır
                </MenuItem>
                <MenuItem key={StaticContentType.Services} value={StaticContentType.Services}>
                  Hizmetlerimiz
                </MenuItem>
                <MenuItem
                  key={StaticContentType.SeawayServices}
                  value={StaticContentType.SeawayServices}
                >
                  Deniz yolu Hizmetlerimiz
                </MenuItem>
                <MenuItem
                  key={StaticContentType.AirwayServices}
                  value={StaticContentType.AirwayServices}
                >
                  Hava yolu Hizmetlerimiz
                </MenuItem>
                <MenuItem
                  key={StaticContentType.HighwayServices}
                  value={StaticContentType.HighwayServices}
                >
                  Kara yolu Hizmetlerimiz
                </MenuItem>
                <MenuItem
                  key={StaticContentType.RailwayServices}
                  value={StaticContentType.RailwayServices}
                >
                  Demir yolu Hizmetlerimiz
                </MenuItem>
                <MenuItem
                  key={StaticContentType.SpecialServices}
                  value={StaticContentType.SpecialServices}
                >
                  Özel Hizmetlerimiz
                </MenuItem>
              </Select>
            </FormControl>
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
                {globalState.languages?.map((lang) => {
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

export default StaticContentForm

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
