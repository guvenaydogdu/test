import React, { FC, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, Grid } from '@material-ui/core'
import { colors } from '../../theme'
import { UserCard } from './UserCard'
import Requests from '../../requests'
import { IUserPager, IUsersResponse } from '../../interfaces/User'
import { GLPagination } from '../Common/GLPagination'

export const AllUser: FC = () => {
  const classes = useStyles()
  const requests = Requests()
  const [users, setUsers] = useState<IUsersResponse | null>(null)
  const [pagerModel, setPagerModel] = useState<IUserPager>({
    pageNumber: 1,
    pageSize: 20,
    sortColumn: 'Id',
    sortDescending: true,
    countryId: 0,
    cityId: 0,
    searchText: undefined,
  })

  useEffect(() => {
    getData()
  }, [pagerModel])

  const getData = () => {
    requests.UserRequest.getList(pagerModel)
      .then((res) => {
        setUsers(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handlePageNumber = (pageNumber: number) => {
    setPagerModel({
      ...pagerModel,
      pageNumber: pageNumber,
    })
  }

  return (
    <Container className={classes.contentContainer}>
      <Grid container spacing={2}>
        {users?.data.map((user) => {
          return (
            <Grid item md={6} key={user.id}>
              <UserCard
                name={user.firstName}
                surName={user.lastName}
                email={user.email}
                image="https://loremflickr.com/96/96/people"
                user={user}
              />
            </Grid>
          )
        })}
      </Grid>
      <Box className={classes.paginationWrapper}>
        <GLPagination
          pageSize={pagerModel.pageSize}
          totalItemCount={users?.totalItemCount}
          handlePageNumber={handlePageNumber}
        />
      </Box>
    </Container>
  )
}

const useStyles = makeStyles({
  contentContainer: {
    padding: '32px 65px',

    '& hr': {
      border: 'none',
      height: '1px',
      margin: '0',
      backgroundColor: colors.grayLight,
      marginBottom: '28px',
    },
  },
  paginationWrapper: {
    marginTop: '32px',
  },
})
