import React, { FC, useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../theme'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { TextField, Theme } from '@material-ui/core'
import { classNames } from '../../utils/styles'
import Requests from '../../requests'
import { IAutoCompleteSearchResponse, INewSearch, ISearch } from '../../interfaces/Search'
import { useTranslation } from 'next-i18next'

const filterOptions = createFilterOptions({
  // matchFrom: 'start',
  stringify: (option: any) => option?.country + option?.city + option?.town + option?.port, // make it one for it
})
interface IAutoCompleteInputProps {
  label: string
  icon?: string
  error?: boolean
  onChange: any
  iconUrl?: string
  value?: ISearch
  transportTypeId: number
}

export interface StyleProps {
  iconUrl?: string
}

export const GLTargetAutoComplete: FC<IAutoCompleteInputProps> = ({
  label,
  error,
  onChange,
  iconUrl,
  value,
  transportTypeId,
}) => {
  const requests = Requests()
  const classes = useStyles({ iconUrl })
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
    <Autocomplete
      size="small"
      className={classNames([classes.inputAutocomplete, iconUrl && classes.iconStyle])}
      noOptionsText={t('no_options')}
      loadingText={t('loading')}
      options={data ? data.data : []}
      getOptionLabel={(option) => getLabel(option)}
      filterOptions={filterOptions}
      getOptionSelected={(option: ISearch, value) => {
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
      renderOption={(option: ISearch) => {
        return (
          <div className={classes.renderItem}>
            <small>{option.locationTypeName}</small>
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
      value={value}
      loading={loading}
      /* renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            key={index}
            label={getLabel(option)}
            size="small"
            {...getTagProps({ index })}
          />
        ))
      }*/
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            onChange={onTextChange}
            variant="filled"
            label={label}
            placeholder={label}
            error={error}
          />
        )
      }}
    />
  )
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  iconStyle: (props) => ({
    '& .MuiFormControl-root': {
      '& .MuiInputBase-root': {
        backgroundImage: `url(${props.iconUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '16px 50%',
        backgroundSize: '24px',
      },
    },
  }),
  inputAutocomplete: {
    '& .MuiFormControl-root': {
      '& .MuiFormLabel-root': {},
    },

    '& .MuiInputBase-root': {
      borderRadius: '10px',
      backgroundColor: 'transparent',
      border: `1px solid ${colors.grayMedium}`,

      '&.Mui-focused': {
        borderColor: colors.sea,
      },

      '&.Mui-error': {
        borderColor: colors.danger,
      },

      '&::before, &::after': {
        display: 'none',
      },
    },
  },
  renderItem: {
    '& small': {
      display: 'block',
      fontSize: '11px',
      color: colors.danger,
    },
  },
}))
