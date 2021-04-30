import { Box, Container, makeStyles, Typography } from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'
import Requests from '../../requests'
import { colors } from '../../theme'
import { GLSearchBarLine } from '../Common/Forms/GLSearchBarLine'
import { GLAccordionDemand } from './GLAccordionDemand'
import { GLIconSearch } from '../Common/GLIcons'
import { useAuth } from '../../providers/AuthProvider'
import { IOrdersResponse, OrderStatus } from '../../interfaces/Order'

export const Reservations: FC = () => {
  const classes = useStyles()
  const request = Requests()
  const { user } = useAuth()
  const [orders, setOrders] = useState<IOrdersResponse | null>(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    request.OrderRequest.getList({
      pageNumber: 1,
      pageSize: 100,
      userId: Number(user?.userId),
      statusId: OrderStatus.Requested,
      includeCategory: true,
      includeImoClass: true,
      includeTransportTypeContainer: true,
      includePackingType: true,
      includeIncoterm: true,
    })
      .then((res) => {
        setOrders(res)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Container className={classes.contentContainer}>
      <Box className={classes.titleArea}>
        <Typography variant="h1">Rezervasyonlar</Typography>
        <GLSearchBarLine
          placeholder="Ne aramıştınız?"
          startIcon={<GLIconSearch color={colors.grayMedium} />}
        />
      </Box>
      <hr className={classes.hr} />
      <Box className={classes.sortMenu}>{/** 
          <GLSortMenu />
          */}</Box>

      <br />

      {orders?.data.map((order) => {
        return <GLAccordionDemand key={order.id} data={order} />
      })}
    </Container>
  )
}

const useStyles = makeStyles(() => ({
  hr: {
    border: 'none',
    borderBottom: `1px solid ${colors.grayLight}`,
    margin: '24px 0',
  },
  sortMenu: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderBottom: `1px solid ${colors.grayLight}`,
    marginBottom: '24px',
  },
  contentContainer: {
    padding: '0 65px 65px 65px',
  },
  titleArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '24px',

    '& h1': {
      fontSize: '18px',
      fontWeight: 'bold',
      lineHeight: '150%',
      color: colors.sea,
    },
  },
}))
