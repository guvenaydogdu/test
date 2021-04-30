import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'
import { Autocomplete } from '@material-ui/lab'
import { FormControl, makeStyles, TextField } from '@material-ui/core'
import { colors } from '../../theme'
import Requests from '../../requests'
import { useTranslation } from 'next-i18next'
import { IAutoCompleteSearchResponse, INewSearch, ISearch } from '../../interfaces/Search'

interface IGLTargetAutoCompleteProps {
  label: string
  icon?: string
  error?: boolean
  onChange: any
  iconUrl?: string
  value?: ISearch
  transportTypeId: number
  labelIcon?: ReactElement
}

export const GLTargetAutoComplete: FC<IGLTargetAutoCompleteProps> = ({
  label,
  error,
  onChange,
  value,
  transportTypeId,
  labelIcon,
}) => {
  const requests = Requests()
  const classes = useStyles()
  const [text, setText] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { t } = useTranslation()
  const timeOutRef = useRef<any>()
  const [data, setData] = useState<IAutoCompleteSearchResponse | null>(null)
  const onTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!loading) setLoading(true)
    setText(evt.target.value)
  }
  useEffect(() => {
    if (text || value) {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current)
      }
      let searchText: string
      if (text) searchText = text
      else {
        if (value?.town) searchText = value.town
        else if (value?.city) searchText = value.city
        else if (value?.country) searchText = value.country
        else searchText = ''
      }

      timeOutRef.current = setTimeout(() => {
        const tempData: INewSearch = {
          searchText,
          pageSize: 15,
          transportTypeId,
        }
        requests.SearchRequest.autoCompleteSearch(tempData)
          .then((res) => {
            setData(res)
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false)
          })
      }, 1000)
    }
  }, [text, value])

  const getLabel = (option: ISearch) => {
    if (option) {
      if (option.port) return option.port
      else if (option.town) return option.town
      else if (option.city) return option.city
      else if (option.country) return option.country
      else return ''
    }
    return ''
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
        getOptionLabel={(option) => getLabel(option)}
        className={classes.autocomplete}
        noOptionsText={t('no_options')}
        loadingText={t('loading')}
        loading={loading}
        value={value}
        getOptionSelected={(option, value) => {
          if (
            option.city == value.city &&
            option.country == value.country &&
            option.town == value.town
          )
            return true
          return false
        }}
        onChange={(event: any, newValue: ISearch | null) => {
          onChange(newValue)
        }}
        renderInput={(params) => {
          return <TextField {...params} onChange={onTextChange} variant="outlined" error={error} />
        }}
        renderOption={(option) => {
          return (
            <div>
              {option.port && <span> {option.port}</span>}
              {option.port && option.town ? ', ' : ''}
              {option.town && <span> {option.town}</span>}
              {option.town && option.city ? ', ' : ''}
              {option.city && <span> {option.city}</span>}
              {option.city && option.country ? ', ' : ''}
              {option.country && <span> {option.country}</span>}
            </div>
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

        '&.Mui-focused': {
          borderColor: colors.sea,
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
