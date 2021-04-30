import { Box, makeStyles } from '@material-ui/core'
import React, { FC } from 'react'
import { ITransportService, ITransportServicesResponse } from '../../interfaces/TransportService'
import { colors } from '../../theme'
import { TransportServiceIds, TurkeyIds } from '../../utils/global'
import { GLFilterArea } from '../Common/GLFilterArea'
import { GLCheckBox } from '../FormItems/GLInput'

interface IGLServicesFilterProps {
  transportServices: ITransportServicesResponse
  selectedTransportServices: number[]
  handleSelectedTransportServices: (selectedId: number) => void
  originLocationId?: number
}

//DENIZ NAVLUNU 6
//LOKAL HİZMET 7
//KARA YOLU TAŞIMA 8

export const GLSearchServicesFilter: FC<IGLServicesFilterProps> = ({
  transportServices,
  selectedTransportServices,
  handleSelectedTransportServices,
  originLocationId,
}) => {
  const classes = useStyles()
  const getLabel = (transportService: ITransportService) => {
    if (transportService.id == 6) return 'Navlun'
    else if (transportService.id == 7) {
      if (originLocationId == TurkeyIds.ONE || originLocationId == TurkeyIds.TWO) {
        return 'Kalkış limanı lokal hizmetleri'
      } else {
        return 'Varış limanı lokal hizmetleri'
      }
    } else if (transportService.id == 8) {
      if (originLocationId == TurkeyIds.ONE || originLocationId == TurkeyIds.TWO) {
        return 'Ön Taşıma'
      } else {
        return 'Son Taşıma'
      }
    } else return transportService.nameTR + transportService.id
  }
  const getDisabled = (data: ITransportService) => {
    if (data.integrationId == TransportServiceIds.NAVLUN) return true
    const transportId = transportServices?.data.find(
      (item) => item.integrationId == TransportServiceIds.TASIMA
    )?.id
    if (
      selectedTransportServices?.find((x) => x == transportId) &&
      data.integrationId == TransportServiceIds.LOKAL
    ) {
      return true
    }
    return false
  }
  return (
    <GLFilterArea title="Hizmet Çeşidi">
      <Box className={classes.searchCheck}>
        {transportServices?.data.map((transportService) => {
          return (
            <GLCheckBox
              key={transportService.id}
              checked={selectedTransportServices.indexOf(transportService.id) > -1}
              label={getLabel(transportService)}
              onChange={() => {
                handleSelectedTransportServices(transportService.id)
              }}
              disabled={getDisabled(transportService)}
            />
          )
        })}
      </Box>
    </GLFilterArea>
  )
}

GLSearchServicesFilter.displayName = 'GLSearchServicesFilter'
const useStyles = makeStyles(() => ({
  searchCheck: {
    '& .MuiFormControlLabel-root': {
      display: 'flex',
      marginLeft: '-11px',

      '& .MuiTypography-root': {
        fontFamily: `'Poppins', sans-serif`,
        fontSize: '14px',
        lineHeight: '186%',
        color: colors.grayMedium,
        padding: '6px 0 0 0',
      },
    },
  },
}))
