import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Box, Container, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/styles/makeStyles'
import { colors } from '../../theme'
import { IOrdersResponse, OrderStatus } from '../../interfaces/Order'

import { ProfileLayout } from '../../components/ProfilePage/ProfileLayout'
import { GLSearchBarLine } from '../../components/Common/Forms/GLSearchBarLine'
import { GLIconSearch } from '../../components/Common/GLIcons'
//import { GLSortMenu } from '../../components/Common/GLSortMenu'
import { GLAccordionRequest } from '../../components/Common/GLAccordionRequest'
import GLScrollBar from '../../components/Common/GLScrollBar'
import Requests from '../../requests'
import { useAuth } from '../../providers/AuthProvider'

const ProfileDemandsPage: NextPage = () => {
  const classes = useStyles()
  const request = Requests()
  const { user } = useAuth()

  const [orders, setOrders] = useState<IOrdersResponse | null>(null)
  const [guarantorStatus, setGuarantorStatus] = useState<boolean>(false)

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
    request.UserRequest.get(Number(user?.userId))
      .then((res) => setGuarantorStatus(res.data.guarantorRequested))
      .catch((err) => console.log(err))
  }

  console.log(orders?.totalItemCount)

  //console.log('garantorluk durumu : ' + res.data.guarantorRequested)

  return (
    <Layout>
      <ProfileLayout>
        <Container className={classes.contentContainer}>
          <Box className={classes.titleArea}>
            <Typography variant="h1">Taleplerim</Typography>
            <GLSearchBarLine
              placeholder="Ne aramıştınız?"
              startIcon={<GLIconSearch color={colors.grayMedium} />}
            />
          </Box>
          {/* <hr className={classes.hr} /> */}
          <Box className={classes.sortMenu}>{/*
            <GLSortMenu />* */}</Box>
          <br />
          {orders?.totalItemCount === 0 ? (
            <span>talep yok</span>
          ) : (
            <GLScrollBar height={715}>
              {orders?.data.map((order) => {
                return (
                  <GLAccordionRequest key={order.id} data={order} guarantor={guarantorStatus} />
                )
              })}
            </GLScrollBar>
          )}
        </Container>
      </ProfileLayout>
    </Layout>
  )
}

export default ProfileDemandsPage

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
    },
  }
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
