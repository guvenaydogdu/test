import React, { FC, memo, useEffect, useState } from 'react'
import { GLModal } from '../GLModal'
import { Box } from '@material-ui/core'
import Requests from '../../../requests'
import { ITransportTypesResponse } from '../../../interfaces/TransportTypes'
import { SeaForm } from '../../DemandForms/SeaForm'
import { IOrder } from '../../../interfaces/Order'
import { TransportTypes } from '../../../utils/global'
import { ITranportTypeContainersResponse } from '../../../interfaces/TransportTypeContainer'

interface IModalProps {
  status: boolean
  handleChange: () => void
  initialData: IOrder
}

export const ModalDemandForm: FC<IModalProps> = memo(({ status, handleChange, initialData }) => {
  const requests = Requests()
  const [transportTypes, setTransportTypes] = useState<ITransportTypesResponse | null>(null)
  const [
    transportContainerTypes,
    setTransportContainerTypes,
  ] = useState<ITranportTypeContainersResponse | null>(null)

  useEffect(() => {
    if (status && !transportTypes) {
      getTransportTypes()
    }
  }, [status])

  const getTransportTypes = () => {
    requests.TransportTypesRequest.getList({ pageNumber: 1, pageSize: 10 })
      .then((res) => {
        const integrationId = res?.data.find((x) => x.id == initialData.transportTypeId)
          ?.integrationId
        if (integrationId == TransportTypes.SEAWAY && transportContainerTypes == null) {
          getTransportContainerTypes()
        }

        return res
      })
      .then((res) => {
        setTransportTypes(res)
        return res
      })
      .catch((err) => console.log(err))
  }

  const getTransportContainerTypes = () => {
    requests.TransportTypeContainerRequest.getList({
      pageNumber: 1,
      pageSize: 100,
      sortDescending: true,
      transportTypeId: initialData.transportTypeId,
    })
      .then((res) => {
        setTransportContainerTypes(res)
      })
      .catch((err) => console.log(err))
  }

  const getActiveTransportTypeIntegrationId = () => {
    return transportTypes?.data.find((x) => x.id == initialData.transportTypeId)?.integrationId
  }

  return (
    <GLModal
      isDemandForm={true}
      maxWidth="980px"
      statusModal={status}
      handleModalChange={handleChange}
    >
      {transportTypes && (
        <Box>
          {getActiveTransportTypeIntegrationId() == TransportTypes.SEAWAY &&
          transportContainerTypes ? (
            <SeaForm
              transportTypes={transportTypes}
              transportContainers={transportContainerTypes}
              fromDemands={true}
              customerId={initialData.userId}
            />
          ) : null}
        </Box>
      )}
    </GLModal>
  )
})

ModalDemandForm.displayName = 'ModalDemandForm'
