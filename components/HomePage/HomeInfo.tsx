import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { makeStyles, Grid, Button, Box } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { colors } from '../../theme'
import Requests from '../../requests'
import { useTranslation } from 'next-i18next'
import { IConfig } from '../../interfaces/Config'

export const HomeInfo: FC = () => {
  const classes = useStyles()
  const request = Requests()
  const [homeInfo, setHomeInfo] = useState<IConfig | null>(null)
  const { i18n, t } = useTranslation()

  useEffect(() => {
    getValue()
  }, [])
  const getValue = () => {
    request.ConfigRequest.getByName('homepage_shipeedy_info', i18n.language).then((res) => {
      setHomeInfo(res.data)
    })
  }

  return (
    <Grid container spacing={2} className={classes.homeInfo}>
      <Grid item lg={3}>
        <h4>Shipeedy</h4>
      </Grid>
      <Grid item lg={5}>
        <Box className={classes.homeInfoContent}>
          <p>{homeInfo?.value}</p>
          <Button
            aria-label="info"
            className={classes.btnInfo}
            variant="contained"
            color="default"
            endIcon={<ChevronRightIcon />}
            type="submit"
          >
            <span className="text">{t('details')}</span>
          </Button>
        </Box>
      </Grid>
      <Grid item lg={4}>
        <Image
          src="/images/pattern-home-shipeedy.svg"
          alt=""
          width=""
          height=""
          layout="responsive"
        />
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  homeInfo: {
    paddingTop: '145px',
    paddingBottom: '60px',

    '& h4': {
      fontSize: '42px',
      lineHeight: '49.31px',
      fontWeight: 700,
      color: colors.white,
    },
  },
  homeInfoContent: {
    padding: '0',

    '& p': {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
      color: colors.white,
      borderLeft: `1px solid ${colors.white}`,
      margin: '0 0 15px 0',
      padding: '30px 56px',
    },
  },
  btnInfo: {
    display: 'inline-flex',
    width: '190px',
    height: '50px',
    marginLeft: '56px',
    backgroundColor: colors.iron,
    color: colors.white,

    '&:hover': {
      backgroundColor: colors.ironHover,
      color: colors.white,
    },

    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '14px',
      lineHeight: '16.44px',
      fontWeight: '700',
      textTransform: 'none',

      '& .text': {
        width: '100%',
        textAlign: 'center',
      },

      '& .MuiButton-endIcon': {
        width: '20px',
      },
    },
  },
}))
