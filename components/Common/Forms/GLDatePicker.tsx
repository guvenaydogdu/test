import { makeStyles } from '@material-ui/core'
import React, { FC, useState, useEffect, ReactElement } from 'react'
import { colors } from '../../../theme'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import 'moment/locale/tr'
import moment from 'moment'
import { useTranslation } from 'next-i18next'

interface IGLDatePickerProps {
  label?: string
  labelIcon?: ReactElement
  endIcon?: ReactElement
  startIcon?: ReactElement
  onChange: (...event: any[]) => void
  value: Date
  error?: boolean
}
export const GLDatePicker: FC<IGLDatePickerProps> = ({
  label,
  labelIcon,
  startIcon,
  endIcon,
  value,
  onChange,
  error = false,
}) => {
  const classes = useStyles()
  const { i18n } = useTranslation()
  moment.locale(i18n.language)
  const [locale, setLocale] = useState<string>(i18n.language)

  const handleChange = (locale: any) => {
    setLocale(locale)
  }

  useEffect(() => {
    handleChange(i18n.language)
  }, [i18n.language])

  return (
    <>
      {label && (
        <label className={classes.title}>
          {label} {labelIcon && labelIcon}
        </label>
      )}
      {console.log('value', value)}
      <div className={classes.dateInputWrapper}>
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
          <DatePicker
            id="date"
            label="Tarih"
            format="DD/MM/yyyy"
            value={value}
            onChange={(date) => {
              onChange(date?.format())
            }}
            TextFieldComponent={(e) => {
              const dt = moment(e?.value as string, 'DD/MM/yyyy')
              return (
                <div
                  role="button"
                  onClick={e.onClick}
                  tabIndex={0}
                  onKeyDown={() => e.onClick}
                  className={`${classes.dateInput} ${error && 'error'}`}
                >
                  {startIcon && <span className="startIcon">{startIcon}</span>}
                  <span className="text">{dt.format('DD/MM/yyyy')}</span>
                  {endIcon && <span className="endIcon">{endIcon}</span>}
                </div>
              )
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
    </>
  )
}

const useStyles = makeStyles(() => ({
  title: {
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
  dateInputWrapper: {
    position: 'relative',
  },
  icon: {},
  dateInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${colors.grayMedium}`,
    borderRadius: '10px',
    fontFamily: 'Poppins',
    fontWeight: 800,
    backgroundColor: colors.white,
    color: colors.black,
    padding: '14px 16px',

    '&:focus': {
      outline: 'none',
      borderColor: colors.blueMedium,
    },

    '& .text': {
      flexBasis: '100%',
    },

    '& svg': {
      width: '1em',
    },

    '& .startIcon': {
      marginRight: '1rem',
      lineHeight: 0,
    },

    '& .endIcon': {
      marginLeft: '1rem',
      lineHeight: 0,
    },

    '&.error': {
      borderColor: colors.danger,
    },
  },
}))
