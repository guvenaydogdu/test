import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'
import { Autocomplete } from '@material-ui/lab'
import { FormControl, makeStyles, TextField } from '@material-ui/core'
import { colors } from '../../theme'
import Requests from '../../requests'
import { useTranslation } from 'next-i18next'
import { ICitiesResponse, ICity, ICityPagerInput } from '../../interfaces/City'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { countrySchema } from './GLCountryAutoComplete'

export const citySchema: SchemaOf<ICity> = yup
  .object({
    id: yup.number().required(),
    name: yup.string().required(),
    code: yup.string().notRequired().nullable(),
    countryId: yup.number().required(),
    country: countrySchema.notRequired().nullable(),
    xCoordinate: yup.number().required(),
    yCoordinate: yup.number().required(),
    uniqId: yup.string().required(),
    createTime: yup.string().required(),
    isActive: yup.boolean().required(),
    isDeleted: yup.boolean().required(),
    position: yup.number().required(),
    integrationId: yup.string().required(),
    updateTime: yup.string().notRequired().nullable(),
    deletedTime: yup.string().notRequired().nullable(),
  })
  .defined()

interface IGLAutoComplete {
  label?: string
  labelIcon?: ReactElement
  placeholder?: string
  onChange: any
  countryId?: number
  variant?: 'filled' | 'outlined' | 'standard'
  error?: boolean
  value?: ICity
}

export const GLCityAutoComplete: FC<IGLAutoComplete> = ({
  placeholder,
  onChange,
  countryId,
  variant,
  error,
  label,
  labelIcon,
  value,
}) => {
  const classes = useStyles()
  const requests = Requests()
  const [text, setText] = useState<string | null>(null)

  const timeOutRef = useRef<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<ICitiesResponse | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (text && text.length > 2 && countryId) {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current)
      }
      timeOutRef.current = setTimeout(() => {
        const tempData: ICityPagerInput = {
          pageNumber: 1,
          pageSize: 15,
          searchText: text,
          sortDescending: true,
          includeCountry: false,
          countryId,
        }
        requests.CityRequest.getList(tempData)
          .then((res) => {
            setData(res)
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false)
          })
      }, 1000)
    }
  }, [text, countryId])

  useEffect(() => {
    if (countryId) {
      onChange(undefined)
    }
  }, [countryId])

  const onTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!loading) setLoading(true)
    setText(evt.target.value)
  }

  return (
    <FormControl className={classes.formInput}>
      {label && (
        <label>
          {label} {labelIcon && labelIcon}
        </label>
      )}
      <Autocomplete
        options={data?.data ? data.data : []}
        getOptionLabel={(option) => option.name}
        className={classes.autocomplete}
        noOptionsText={t('no_options')}
        loadingText={t('loading')}
        placeholder={placeholder}
        loading={loading}
        value={value}
        filterSelectedOptions
        disabled={typeof countryId != 'number'}
        onChange={(event: any, newValue: ICity | null) => {
          onChange(newValue)
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              onChange={onTextChange}
              variant={variant ? variant : 'outlined'}
              error={error ? error : undefined}
              placeholder={placeholder}
            />
          )
        }}
      />
    </FormControl>
  )
}

const useStyles = makeStyles({
  autocomplete: {
    display: 'flex',
    width: '100%',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '16.44px',

    '& .MuiFormControl-root': {
      '& .MuiInputBase-root': {
        border: `1px solid ${colors.grayMedium}`,
        borderRadius: '10px',
        padding: '6px 52px 6px 14px',
        '& fieldset': {
          border: 'none',
        },
        '&:before, &:after': {
          display: 'none',
        },
        '& .MuiAutocomplete-endAdornment': {
          right: '10px',
        },

        '&.Mui-error': {
          borderColor: colors.danger,
        },
      },
    },
  },
  formInput: {
    display: 'block',

    '& > label': {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 800,
      lineHeight: '150%',
      color: colors.grayMedium,
      paddingBottom: '16px',

      '& > .MuiIconButton-root': {
        marginLeft: '16px',
      },
    },

    '& .MuiInput-root': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      border: `1px solid ${colors.grayMedium}`,
      borderRadius: '10px',
      margin: 0,

      '&:before, &:after': {
        display: 'none',
      },

      '& .MuiInput-input': {
        fontWeight: 400,
        color: colors.black,
        padding: '.99999999rem 1.142rem',
        boxSizing: 'border-box',
        height: 'auto',
        width: '100%',
      },

      '& svg': {
        width: '24px',
        height: '24px',
        fill: colors.grayMedium,
      },

      '&.MuiInputBase-adornedEnd': {
        '& > .MuiIconButton-root': {
          padding: '0',
          margin: '10px 16px 10px 8px',
        },

        '& .MuiInputBase-inputAdornedEnd': {
          paddingRight: 0,
        },
      },

      '&.MuiInputBase-adornedStart': {
        '& > .MuiIconButton-root': {
          padding: '0',
          margin: '10px 8px 10px 16px',
        },

        '& .MuiInputBase-inputAdornedStart': {
          paddingLeft: 0,
        },
      },

      '&.Mui-error': {
        borderColor: colors.danger,
      },
    },
  },
})
