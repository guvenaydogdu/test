import React, { FC, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { colors } from '../../theme'
import 'moment/locale/tr'
import moment from 'moment'
import { useTranslation } from 'next-i18next'

interface IGLSearchBarDatePickerProps {
  onChange: (...event: any[]) => void
  value: Date
}

export const GLSearchBarDatePicker: FC<IGLSearchBarDatePickerProps> = ({ onChange, value }) => {
  const { i18n } = useTranslation()
  moment.locale(i18n.language)
  const [locale, setLocale] = useState<string>(i18n.language)
  const classes = useStyles()

  const handleChange = (locale: any) => {
    setLocale(locale)
  }

  useEffect(() => {
    handleChange(i18n.language)
  }, [i18n.language])
  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
      <DatePicker
        id="date"
        label="Tarih"
        format="DD/MM/yyyy"
        value={value}
        onChange={(date) => {
          onChange(date?.format('yyyy-MM-DD'))
        }}
        TextFieldComponent={(e) => {
          const dt = moment(e?.value as string, 'DD/MM/yyyy')
          const weekDayName = dt.format('dddd')
          const monthName = dt.format('MMMM')
          return (
            <div
              role="button"
              className={classes.inputDate}
              onClick={e.onClick}
              tabIndex={0}
              onKeyDown={() => e.onClick}
            >
              <div className="content">
                <span>{weekDayName}</span>
                <strong>
                  {dt.date()} {monthName}
                </strong>
              </div>
            </div>
          )
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

const useStyles = makeStyles(() => ({
  inputDate: {
    backgroundImage: 'url(/images/icon-calendar.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '16px 50%',
    backgroundSize: '24px',

    '& .content': {
      fontFamily: 'Arial, sans serif',
      display: 'flex',
      flexDirection: 'column',
      padding: '18px 18px 18px 80px',

      '& span': {
        display: 'block',
        fontSize: '14px',
        lineHeight: '16.44px',
        color: colors.grayMedium,
        margin: '0 0 8px 0',
      },

      '& strong': {
        display: 'block',
        fontSize: '18px',
        lineHeight: '21.13px',
        fontWeight: 700,
        color: colors.sea,
      },
    },
  },
}))
