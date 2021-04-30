import React, { FC, memo } from 'react'

import { ITransportSearch, ITransportSearchResponse } from '../../interfaces/Search'
import { GLAccordion } from '../Common/GLAccordion'
import { GLBox } from '../Common/GLBox'
import { GLFilterBar } from '../Common/GLFilterBar'
import { GLNoResults } from '../Common/GLNoResults'

interface IGLTransportSearchResultsProps {
  transportSearch: ITransportSearchResponse | null
  sortingValue: number
  handleChangeFilter: (value: number) => void
  toForm: () => any
  shippingLineVisible: number
  getAcitveTransportTypeIntegrationId: () => string | undefined
  onSelectTransport: (data: ITransportSearch) => void
}

export const GLTransportSearchResults: FC<IGLTransportSearchResultsProps> = memo(
  ({
    transportSearch,
    sortingValue,
    handleChangeFilter,
    toForm,
    shippingLineVisible,
    getAcitveTransportTypeIntegrationId,
    onSelectTransport,
  }) => {
    return (
      <>
        {transportSearch?.data && transportSearch?.data?.length > 0 && (
          <GLBox shadow={true}>
            <GLFilterBar
              totalItemCount={transportSearch?.totalItemCount}
              sortingValue={sortingValue}
              handleChangeFilter={handleChangeFilter}
              getAcitveTransportTypeIntegrationId={getAcitveTransportTypeIntegrationId}
            />
            {transportSearch?.data?.map((transport) => {
              return (
                <GLAccordion
                  key={transport.id}
                  data={transport}
                  shippingLineVisible={shippingLineVisible}
                  getAcitveTransportTypeIntegrationId={getAcitveTransportTypeIntegrationId}
                  onSelectTransport={onSelectTransport}
                />
              )
            })}
          </GLBox>
        )}

        {transportSearch?.data && transportSearch?.data?.length == 0 && (
          <GLNoResults toForm={toForm} />
        )}
      </>
    )
  }
)

GLTransportSearchResults.displayName = 'GLTransportSearchResults'
