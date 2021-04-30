import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SeaForm } from '../../components/DemandForms/SeaForm'
import Requests from '../../requests'
import { ITransportTypePager, ITransportTypesResponse } from '../../interfaces/TransportTypes'
import { ITranportTypeContainersResponse } from '../../interfaces/TransportTypeContainer'
import { TransportTypes } from '../../utils/global'

interface IPageProps {
  transportTypes: ITransportTypesResponse
  transportContainers: ITranportTypeContainersResponse
}

const PriceRequestFormSea: NextPage<IPageProps> = ({ transportTypes, transportContainers }) => {
  return (
    <Layout>
      <SeaForm transportTypes={transportTypes} transportContainers={transportContainers} />
    </Layout>
  )
}

export default PriceRequestFormSea

const transportTypepagerModel: ITransportTypePager = {
  pageNumber: 1,
  pageSize: 10,
  sortColumn: 'Id',
  sortDescending: false,
  isActive: true,
}

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  const requests = Requests()
  const data = await requests.TransportTypesRequest.getList(transportTypepagerModel)
  const transportTypeId = data.data?.find((x) => x.integrationId == TransportTypes.SEAWAY)?.id || 0
  const transportContainers = await requests.TransportTypeContainerRequest.getList({
    pageNumber: 1,
    pageSize: 100,
    sortDescending: true,
    transportTypeId,
  })

  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
      transportTypes: data,
      transportContainers,
    },
  }
}
