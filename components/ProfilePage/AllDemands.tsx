import React, { FC, useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid } from '@material-ui/core'
import { colors } from '../../theme'
import { GLTitleLine } from '../Common/GLTitleLine'
import { GLSelect } from '../Common/Forms/GLSelect'
import { GLPagination } from '../Common/GLPagination'
import { IOrderPager, IOrdersResponse, OrderStatus } from '../../interfaces/Order'
import Requests from '../../requests'
import { IShippingLine } from '../../interfaces/ShippingLine'
import { GLShippingLinesAutoComplete } from '../AutoCompletes/GLShippingLinesAutoComplete'
import { GLArkasUserAccordionDemand } from './GLArkasUserAccordionDemand'
import { GLInput } from '../Common/Forms/GLInput'

export const AllDemands: FC = () => {
  const classes = useStyles()
  const requests = Requests()
  const timeOutRef = useRef<any>()
  const [orders, setOrders] = useState<IOrdersResponse | null>(null)

  const [orderPager, setOrderPager] = useState<IOrderPager>({
    pageNumber: 1,
    pageSize: 5,
    statusId: OrderStatus.Requested,
    includeCategory: true,
    includeImoClass: true,
    includeTransportTypeContainer: true,
    includePackingType: true,
    includeIncoterm: true,
    shippingLineId: undefined,
    orderId: undefined,
  })

  const onChangeStatusId = (id: number) => {
    setOrderPager({
      ...orderPager,
      statusId: id,
    })
  }

  const handlePageNumber = (pageNumber: number) => {
    setOrderPager({
      ...orderPager,
      pageNumber: pageNumber,
    })
  }

  const handleOrderNumber = (orderId: number) => {
    setOrderPager({
      ...orderPager,
      orderId: orderId ? Number(orderId) : undefined,
    })
  }

  const onChangeShippingLineId = (data: IShippingLine | null) => {
    if (data) {
      setOrderPager({
        ...orderPager,
        shippingLineId: data.id,
      })
    } else {
      setOrderPager({
        ...orderPager,
        shippingLineId: undefined,
      })
    }
  }

  useEffect(() => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }

    timeOutRef.current = setTimeout(() => {
      getData()
    }, 1000)
  }, [orderPager])

  const getData = () => {
    requests.OrderRequest.getList(orderPager)
      .then((res) => setOrders(res))
      .catch((err) => console.log(err))
  }

  return (
    <Container className={classes.contentContainer}>
      <GLTitleLine title="Tüm Talepler" />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <GLInput
            label="Talep No"
            onChange={(evt: any) => {
              handleOrderNumber(evt.target.value)
            }}
            type={'number'}
          />
        </Grid>
        <Grid item xs={4}>
          <GLSelect
            label="Durum"
            data={[
              {
                id: OrderStatus.Requested,
                label: 'Requested',
              },
              {
                id: OrderStatus.PendingApproval,
                label: 'PendingApproval',
              },
              {
                id: OrderStatus.NegativeEvaluation,
                label: 'NegativeEvaluation',
              },
              {
                id: OrderStatus.Rejected,
                label: 'Rejected',
              },
              {
                id: OrderStatus.PendingFinancialApproval,
                label: 'PendingFinancialApproval',
              },
              {
                id: OrderStatus.NegativeFinancialEvaluation,
                label: 'NegativeFinancialEvaluation',
              },
              {
                id: OrderStatus.PendingPurchase,
                label: 'PendingPurchase',
              },
              {
                id: OrderStatus.PassedPaymentPeriod,
                label: 'PassedPaymentPeriod',
              },
              {
                id: OrderStatus.Purchased,
                label: 'Purchased',
              },
              {
                id: OrderStatus.ActiveClientRejected,
                label: 'ActiveClientRejected',
              },
            ]}
            onChange={onChangeStatusId}
            value={orderPager.statusId}
          />
        </Grid>
        <Grid item xs={4}>
          <GLShippingLinesAutoComplete onChange={onChangeShippingLineId} label={'Firma Adı'} />
        </Grid>
      </Grid>

      <br />

      {orders?.data.map((data) => {
        return <GLArkasUserAccordionDemand key={data.id} data={data} />
      })}

      <GLPagination
        pageSize={orderPager.pageSize}
        totalItemCount={orders?.totalItemCount}
        handlePageNumber={handlePageNumber}
      />
    </Container>
  )
}

const useStyles = makeStyles({
  contentContainer: {
    padding: '32px',

    '& hr': {
      border: 'none',
      height: '1px',
      margin: '0',
      backgroundColor: colors.grayLight,
      marginBottom: '28px',
    },
  },
})
