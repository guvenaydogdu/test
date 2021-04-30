import React, { FC } from 'react'
import { ITransportType } from '../../interfaces/TransportTypes'
import { GLIconShip } from '../GLIcons/Ship'
import { GLIconAirPlane } from '../GLIcons/AirPlane'
import { GLIconRailway } from '../GLIcons/Railway'

import { useTranslation } from 'next-i18next'

interface IGLTransportTypeSelectProps {
  onChange: (...event: any[]) => void
  value: number
  data: ITransportType[] | undefined
}

export const GLTransportTypeSelect: FC<IGLTransportTypeSelectProps> = ({
  value,
  onChange,
  data,
}) => {
  const { t } = useTranslation()
  const handleChange = (id: number) => {
    onChange(id)
  }

  return (
    <>
      {data?.map((transportTypes) => {
        return (
          <span
            role="button"
            tabIndex={0}
            className={value == transportTypes.id ? 'active' : ''}
            onClick={() => handleChange(transportTypes.id)}
            onKeyDown={() => handleChange(transportTypes.id)}
            key={transportTypes.id}
          >
            <i>
              {transportTypes.code == 'seaway' && <GLIconShip />}
              {transportTypes.code == 'airway' && <GLIconAirPlane />}
              {transportTypes.code == 'railway' && <GLIconRailway />}
            </i>
            <strong>{t(transportTypes.code)}</strong>
          </span>
        )
      })}
    </>
  )
}
