import { Box, Grid } from '@material-ui/core'
import React, { Dispatch, FC } from 'react'
import { colors } from '../../../theme'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { GLCountryAutoComplete, countrySchema } from '../../AutoCompletes/GLCountryAutoComplete'
import { GLCityAutoComplete, citySchema } from '../../AutoCompletes/GLCityAutoComplete'
import { GLButton } from '../Forms/GLButtons'
import { GLCheckBox } from '../Forms/GLCheckBox'
import { GLInput } from '../Forms/GLInput'
import { GLIconNext, GLIconPrev, GLIconUser } from '../GLIcons'
import { GLModal } from '../GLModal'
import { GLTitleHalfLine } from '../GLTitleHalfLine'

interface IModalProps {
  status: boolean
  handleChange: () => void
  onChangeBillingInfo: Dispatch<any>
}

const billingInformationSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  identificationNumber: yup.string().required(),
  companyName: yup.string().required(),
  companyAddress: yup.string().required(),
  taxAdministration: yup.string().required(),
  taxNumber: yup.string().required(),
  country: countrySchema.required(),
  city: citySchema.required(),
  isAccepted: yup.boolean().required(),
  postalCode: yup.string().required(),
})

type IBillingFormData = yup.InferType<typeof billingInformationSchema>

export const ModalBillingInformation: FC<IModalProps> = ({
  status,
  handleChange,
  onChangeBillingInfo,
}) => {
  const { control, watch, handleSubmit, errors } = useForm({
    resolver: yupResolver(billingInformationSchema),
  })

  const onSubmit = (data: IBillingFormData) => {
    console.log(data)
    if (data.isAccepted) {
      onChangeBillingInfo({
        name: data.name,
        surname: data.surname,
        identificationNumber: data.identificationNumber,
        companyName: data.companyAddress,
        companyAddress: data.companyAddress,
        taxAdministration: data.taxAdministration,
        taxNumber: data.taxNumber,
        country: data.country.name,
        city: data.city.name,
        postalCode: data.postalCode,
      })
      handleChange()
    }
  }

  console.log(errors)

  return (
    <GLModal maxWidth="730px" statusModal={status} handleModalChange={handleChange}>
      <Box>
        <GLTitleHalfLine title="Fatura Bilgileri" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      placeholder="Adınız"
                      value={value}
                      startIcon={<GLIconUser color={colors.sea} />}
                      onChange={onChange}
                      error={errors?.name ? true : false}
                    />
                  )
                }}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <GLInput placeholder="Adınız" startIcon={<GLIconUser color={colors.sea} />} />
            </Grid> */}
            <Grid item xs={6}>
              <Controller
                name="surname"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      placeholder="Soyadınız"
                      value={value}
                      startIcon={<GLIconUser color={colors.sea} />}
                      onChange={onChange}
                      error={errors?.surname ? true : false}
                    />
                  )
                }}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <GLInput placeholder="Soyadınız" startIcon={<GLIconUser color={colors.sea} />} />
            </Grid> */}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="identificationNumber"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      placeholder="TC kimlik"
                      value={value}
                      startIcon={<GLIconUser color={colors.sea} />}
                      onChange={onChange}
                      error={errors?.identificationNumber ? true : false}
                    />
                  )
                }}
              />
              {/* <GLInput placeholder="T.C. Kimlik No" /> */}
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="companyName"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      placeholder="Firma Adı"
                      value={value}
                      onChange={onChange}
                      error={errors?.companyName ? true : false}
                    />
                  )
                }}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <GLInput placeholder="Firma Adı" />
            </Grid> */}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="companyAddress"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      placeholder="Firma Adresi"
                      value={value}
                      onChange={onChange}
                      error={errors?.companyAddress ? true : false}
                    />
                  )
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <GLInput placeholder="Firma Adresi" />
            </Grid> */}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="country"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLCountryAutoComplete
                      placeholder="Ülke"
                      onChange={onChange}
                      value={value}
                      error={errors?.country ? true : false}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="city"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLCityAutoComplete
                      placeholder="İl"
                      onChange={onChange}
                      countryId={watch('country')?.id}
                      value={value}
                      error={errors?.city ? true : false}
                    />
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="postalCode"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      placeholder="Posta Kodu"
                      onChange={onChange}
                      value={value}
                      error={errors?.postalCode ? true : false}
                    />
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="taxAdministration"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label="Vergi Dairesi"
                      value={value}
                      onChange={onChange}
                      error={errors?.taxAdministration ? true : false}
                    />
                  )
                }}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <GLInput label="Vergi Dairesi" />
            </Grid> */}
            <Grid item xs={6}>
              <Controller
                name="taxNumber"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLInput
                      label="Vergi No."
                      value={value}
                      onChange={onChange}
                      error={errors?.taxNumber ? true : false}
                    />
                  )
                }}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <GLInput label="Vergi No." />
            </Grid> */}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="isAccepted"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <GLCheckBox
                      value={value}
                      onChange={onChange}
                      color={colors.sea}
                      error={errors?.isAccepted ? true : false}
                    >
                      Fatura bilgilerinizde değişiklik yapmak istiyorum{' '}
                    </GLCheckBox>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="flex-end">
            <Grid item xs={4}>
              <GLButton
                text="Geri Dön"
                textColor={colors.grayMedium}
                textColorHover={colors.blueDark}
                bgColor="transparent"
                bgColorHover={colors.graySoft}
                shadow={false}
                iconSize="8px"
                startIcon={<GLIconPrev />}
                onClick={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <GLButton
                text="Devam Et"
                type="submit"
                textColor={colors.white}
                textColorHover={colors.white}
                bgColor={colors.sea}
                bgColorHover={colors.seaHover}
                iconSize="8px"
                endIcon={<GLIconNext />}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </GLModal>
  )
}
