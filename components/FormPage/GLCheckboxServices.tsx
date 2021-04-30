import React, { FC } from 'react'

import { makeStyles, FormControlLabel, Checkbox, Theme } from '@material-ui/core'
import { colors } from '../../theme'
import { ITransportService, ITransportServicesResponse } from '../../interfaces/TransportService'
import { TransportServiceIds, TurkeyIds } from '../../utils/global'

interface StyleProps {
  color?: string
}

;('10112')

interface IGLCheckboxServicesProps {
  labelPosition?: 'top' | 'right' | 'bottom' | 'left'
  color?: string
  onChange: (...event: any[]) => void
  value: number[]
  transportServices: ITransportServicesResponse | null
  originLocationId?: number | null
}
export const GLCheckboxServices: FC<IGLCheckboxServicesProps> = ({
  labelPosition = 'right',
  color = colors.sea,
  value,
  onChange,
  transportServices,
  originLocationId,
}) => {
  const classes = useStyles({ color })
  const getLabel = (transportService: ITransportService) => {
    if (transportService.integrationId == TransportServiceIds.NAVLUN) return 'Navlun'
    else if (transportService.integrationId == TransportServiceIds.LOKAL) {
      if (originLocationId == TurkeyIds.ONE || originLocationId == TurkeyIds.TWO) {
        return 'Kalkış limanı lokal hizmetleri'
      } else {
        return 'Varış limanı lokal hizmetleri'
      }
    } else if (transportService.integrationId == TransportServiceIds.TASIMA) {
      if (originLocationId == TurkeyIds.ONE || originLocationId == TurkeyIds.TWO) {
        return 'Ön Taşıma'
      } else {
        return 'Son Taşıma'
      }
    } else return transportService.nameTR
  }

  const handleChange = (data: ITransportService) => {
    let newData: number[]
    if (value.includes(data.id)) {
      newData = value.filter((sId) => sId != data.id)
    } else {
      if (value?.length > 0) {
        newData = [...value, data.id]
      } else {
        newData = [data.id]
      }
      const id = transportServices?.data.find(
        (item) => item.integrationId == TransportServiceIds.LOKAL
      )?.id
      if (data.integrationId == TransportServiceIds.TASIMA && id && !value.includes(id)) {
        const id = transportServices?.data.find(
          (item) => item.integrationId == TransportServiceIds.LOKAL
        )?.id
        if (newData && id) {
          newData = [...newData, id]
        }
      }
    }
    onChange(newData)
  }
  const getValue = (data: ITransportService) => {
    return value?.find((x) => x == data.id) ? true : false
  }
  const getDisabled = (data: ITransportService) => {
    if (data.integrationId == TransportServiceIds.NAVLUN) return true
    const transportId = transportServices?.data.find(
      (item) => item.integrationId == TransportServiceIds.TASIMA
    )?.id
    if (value?.find((x) => x == transportId) && data.integrationId == TransportServiceIds.LOKAL) {
      return true
    }
    return false
  }
  return (
    <>
      {transportServices?.data.map((data) => {
        return (
          <div
            className={`
                  ${classes.formCheckBox}
                  ${labelPosition == 'top' && classes.labelTop}
                  ${labelPosition == 'right' && classes.labelRight}
                  ${labelPosition == 'bottom' && classes.labelBottom}
                  ${labelPosition == 'left' && classes.labelLeft}
              `}
            key={data.id}
          >
            <FormControlLabel
              className={classes.formControl}
              control={
                <Checkbox
                  color="default"
                  classes={{ root: classes.customCheckBox }}
                  onChange={() => handleChange(data)}
                  disabled={getDisabled(data)}
                  checked={getValue(data)}
                />
              }
              label={getLabel(data)}
            />
          </div>
        )
      })}
    </>
  )
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  customCheckBox: (props) => ({
    color: colors.grayMedium,

    '&.Mui-checked': {
      color: props.color,
    },
  }),
  formControl: {
    marginRight: 0,
  },
  formCheckBox: {
    display: 'flex',
    flexDirection: 'column',

    '& .MuiFormControlLabel-root': {
      alignItems: 'flex-start',

      '& > .MuiTypography-root': {
        fontSize: '14px',
        color: colors.black,
        paddingTop: '10px',

        '& a': {
          color: colors.sea,
          textDecoration: 'underline',
        },
      },
    },
  },
  labelTop: {
    flexDirection: 'column',

    '& label': {
      paddingBottom: '16px',
    },
  },
  labelRight: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',

    '& .text': {
      margin: '0',
    },
  },
  labelBottom: {
    flexDirection: 'column-reverse',

    '& label': {
      paddingTop: '16px',
    },
  },
  labelLeft: {
    alignItems: 'center',

    '& > label': {
      marginRight: '16px',
    },
  },
}))
