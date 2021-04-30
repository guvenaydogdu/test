import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../theme'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField, Chip, Theme } from '@material-ui/core'
import { classNames } from '../../utils/styles'
import { useTranslation } from 'next-i18next'
interface IAutoCompleteData {
  id: number
  label: string
}

interface IAutoCompleteInputProps {
  data: IAutoCompleteData[] | undefined
  label: string
  value: number | null
  icon?: string
  error?: boolean
  onChange: any
  iconUrl?: string
}

export interface StyleProps {
  iconUrl?: string
}

export const GLAutoComplete: FC<IAutoCompleteInputProps> = ({
  data,
  label,
  value,
  error,
  onChange,
  iconUrl,
}) => {
  const classes = useStyles({ iconUrl })
  const { t } = useTranslation()
  return (
    <Autocomplete
      size="small"
      className={classNames([
        classes.inputAutocomplete,
        iconUrl && classes.iconStyle,
        label && classes.noLabel,
        classes.margin,
      ])}
      noOptionsText={t('no_options')}
      loadingText={t('loading')}
      options={data ? data : []}
      getOptionLabel={(option) => option.label}
      onChange={(event: any, newValue: IAutoCompleteData | null) => {
        onChange(newValue?.id)
      }}
      value={data && value ? data.find((item) => item.id == value) : null}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            key={index}
            label={option.label}
            size="small"
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} variant="filled" label={label} placeholder={label} error={error} />
      )}
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
  noLabel: {},
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
  margin: {
    margin: '0 0 16px 0',
  },
}))
