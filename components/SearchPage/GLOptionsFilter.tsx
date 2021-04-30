import React, { FC, memo } from 'react'
import dynamic from 'next/dynamic'
import { ITransportOptionsResponse } from '../../interfaces/TransportOption'
import { ISelectedTransportOption } from '../../pages/search'

import { GLFilterArea } from '../Common/GLFilterArea'
import { GLRangeButton } from '../Common/GLRangeButton'

interface IGLOptionsFilterProps {
  transportOptions: ITransportOptionsResponse
  handleSelectedTransportOptions: (selectedId: any) => void
  defaultValues: ISelectedTransportOption[]
}

const DynamicScrollBar = dynamic(() => import('../Common/GLScrollBar'), {
  ssr: false,
})

export const GLOptionsFilter: FC<IGLOptionsFilterProps> = memo(
  ({ transportOptions, handleSelectedTransportOptions, defaultValues }) => {
    return (
      <GLFilterArea title="Konteyner Adedi">
        <DynamicScrollBar height={420}>
          {transportOptions?.data.map((transportOption) => {
            return (
              <GLRangeButton
                key={transportOption.id}
                transportOptionId={transportOption.id}
                defaultValue={
                  defaultValues.find((x) => x.transportOptionId == transportOption.id)?.count
                }
                label={transportOption.name}
                onChange={handleSelectedTransportOptions}
              />
            )
          })}
        </DynamicScrollBar>
      </GLFilterArea>
    )
  }
)

GLOptionsFilter.displayName = 'GLOptionsFilter'
