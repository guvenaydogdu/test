import React, { FC } from 'react'

import TextField from '@material-ui/core/TextField'
import { Autocomplete } from '@material-ui/lab'

export interface IAutoCompleteData {
  label: string | undefined
  id: number
}

interface IGlAutoComplete {
  data: IAutoCompleteData[] | undefined
  value: number
  onChange: any
  error?: boolean
  label?: string
}

export const GlAutoComplete: FC<IGlAutoComplete> = ({ data, onChange, value, error, label }) => {
  return (
    <Autocomplete
      options={data ? data : []}
      value={data && value ? data.find((item) => item.id == value) : null}
      getOptionLabel={(option: any) => option.label}
      fullWidth
      style={{ marginBottom: 20 }}
      renderInput={(params: any) => (
        <TextField
          {...params}
          label={label ? label : 'Combobox'}
          variant="outlined"
          error={error}
        />
      )}
      onChange={(event: any, newValue: IAutoCompleteData | null) => {
        onChange(newValue?.id)
      }}
    />
  )
}
