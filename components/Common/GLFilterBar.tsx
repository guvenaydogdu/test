import React, { FC } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import { colors } from './../../theme'
import { GLIconAirPlane, GLIconRailway, GLIconShip } from './GLIcons'
import { GLSortMenu } from './GLSortMenu'
import { TransportTypes } from '../../utils/global'

interface IGFilterbarprops {
  sortingValue: number
  handleChangeFilter: (value: number) => void
  totalItemCount?: number
  getAcitveTransportTypeIntegrationId: () => string | undefined
}

export const GLFilterBar: FC<IGFilterbarprops> = ({
  sortingValue,
  handleChangeFilter,
  totalItemCount,
  getAcitveTransportTypeIntegrationId,
}) => {
  const classes = useStyles()

  return (
    <Box className={classes.filterWrapper}>
      <Box className={classes.resultText}>
        <span className={classes.icon}>
          {getAcitveTransportTypeIntegrationId() == TransportTypes.SEAWAY && <GLIconShip />}
          {getAcitveTransportTypeIntegrationId() == TransportTypes.AIRWAY && <GLIconAirPlane />}
          {getAcitveTransportTypeIntegrationId() == TransportTypes.RAILWAY && <GLIconRailway />}
        </span>
        <p>Aradığınız kriterlere uygun {totalItemCount} Sonuç bulundu.</p>
      </Box>
      <GLSortMenu sortingValue={sortingValue} handleChangeFilter={handleChangeFilter} />
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  filterWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${colors.grayMedium}`,
    borderRadius: '5px',
    padding: '11px 16px',
    marginBottom: '24px',
  },
  resultText: {
    display: 'flex',
    alignItems: 'center',

    '& p': {
      fontSize: '12px',
      lineHeight: '14px',
      fontFeatureSettings: "'pnum' on, 'lnum' on, 'liga' off",
      color: colors.blueMedium,
      margin: 0,
    },
  },
  icon: {
    display: 'block',
    marginRight: '24px',
    lineHeight: 0,

    '& svg': {
      width: '40px',
      height: 'auto',
      fill: colors.sea,
    },
  },
  formControl: {
    minWidth: 160,
  },
}))
