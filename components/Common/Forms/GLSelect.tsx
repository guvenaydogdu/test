import { FC, ReactElement } from 'react'
import { colors } from '../../../theme'
import { makeStyles, Select, MenuItem } from '@material-ui/core'

interface ISelectItemProps {
  id: number
  label: string
}

interface IGLSelectProps {
  data: ISelectItemProps[] | undefined
  label?: string
  labelIcon?: ReactElement
  icon?: ReactElement
  onChange?: any
  value?: number | null
  error?: boolean
  placeholder?: string
}

export const GLSelect: FC<IGLSelectProps> = ({
  label,
  labelIcon,
  data,
  onChange,
  error,
  placeholder,
  value,
}) => {
  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value)
  }

  return (
    <div className={classes.formSelect}>
      {label && (
        <label>
          {label} {labelIcon && labelIcon}
        </label>
      )}
      <Select
        labelId="selectLabelId"
        id="select"
        value={value ? value : ''}
        displayEmpty
        onChange={handleChange}
        error={error}
      >
        {placeholder && (
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {data?.map((item) => {
          return (
            <MenuItem value={item.id} key={item.id}>
              {item.label}
            </MenuItem>
          )
        })}
      </Select>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  formSelect: {
    display: 'block',

    '& > label': {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: '150%',
      color: colors.grayMedium,
      paddingBottom: '16px',

      '& > .MuiIconButton-root': {
        marginLeft: '16px',
      },
    },

    '& .MuiInputBase-root': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      border: `1px solid ${colors.grayMedium}`,
      borderRadius: '10px',

      '&:before, &:after': {
        display: 'none',
      },

      '& .MuiSelect-selectMenu': {
        padding: '16px',
      },

      '& .MuiSelect-icon': {
        right: '10px',
      },

      '&.Mui-focused': {
        borderColor: colors.sea,
      },

      '&.Mui-error': {
        borderColor: colors.danger,
      },

      /* Placeholder Style */
      '& em': {
        fontWeight: 700,
        fontStyle: 'normal',
        color: colors.placeholder,
      },
    },
  },
}))
