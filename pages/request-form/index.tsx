import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { makeStyles, Container, Grid, Box } from '@material-ui/core'
import { colors } from '../../theme'
import { GLIconShip } from '../../components/Common/GLIcons'
import { GLAutoComplete } from '../../components/FormItems/GLAutoComplete'
import { GLSelect } from '../../components/FormItems/GLInput'

const RequestForm: NextPage = () => {
  const classes = useStyles()
  return (
    <Layout>
      <div className={classes.pageContent}>
        <Container maxWidth="lg">
          <div className={classes.pageInside}>
            <Box className={classes.tabTitle}>
              <span role="button">
                <i>
                  <GLIconShip />
                </i>
                <strong>Denizyolu Fiyat Talep Formu</strong>
              </span>
            </Box>
            <Box className={classes.tabContent}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <label className={classes.formTitle}>Yükleme Noktası</label>
                  <GLAutoComplete
                    data={loadingPoint}
                    label=""
                    value={0}
                    onChange={() => {
                      console.log('test')
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <label className={classes.formTitle}>Varış Noktası</label>
                  <GLAutoComplete
                    data={loadingPoint}
                    label=""
                    value={0}
                    onChange={() => {
                      console.log('test')
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <label className={classes.formTitle}>&nbsp;</label>
                  <span className={classes.formItem}></span>
                </Grid>
              </Grid>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                  <label className={classes.formTitle}>Ürün Kategorisi</label>
                  <GLSelect
                    data={loadingPoint}
                    label=""
                    value=""
                    onChange={() => {
                      console.log('test')
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <label className={classes.formTitle}>Ürün Cinsi / Adı</label>
                  {/* <GLInput
                                        label=""
                                        value=""
                                        onChange={() => { }}
                                    /> */}
                </Grid>
                <Grid item xs={12} lg={4}>
                  <label className={classes.formTitle}>Yük Bedeli</label>
                  <span className={classes.formItem}></span>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                  <label className={classes.formTitle}>Yükleme Çeşidi</label>
                  <span className={classes.formItem}></span>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <label className={classes.formTitle}>Brüt Ağırlık</label>
                  <span className={classes.formItem}></span>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                  <label className={classes.formTitle}>Ölçüler</label>
                  <span className={classes.formItem}></span>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <label className={classes.formTitle}>&nbsp;</label>
                  <span className={classes.formItem}></span>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <label className={classes.formTitle}>&nbsp;</label>
                  <span className={classes.formItem}></span>
                </Grid>
                <Grid item xs={12} lg={2}>
                  <label className={classes.formTitle}>Adet</label>
                  <span className={classes.formItem}></span>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                  <label className={classes.formTitle}>IMO</label>
                  <span className={classes.formItem}></span>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <label className={classes.formTitle}>Class</label>
                  <span className={classes.formItem}></span>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <label className={classes.formTitle}>Un Numarası</label>
                  <span className={classes.formItem}></span>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                  <label className={classes.formTitle}>İstiflenebilir Ürün</label>
                  <span className={classes.formItem}></span>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <label className={classes.formTitle}>Kat Sayısı</label>
                  <span className={classes.formItem}></span>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <label className={classes.formTitle}>Paketleme Çeşidi</label>
                  <span className={classes.formItem}></span>
                </Grid>
              </Grid>
              <hr />
            </Box>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default RequestForm

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
  pageContent: {
    padding: '52px 0',

    // '& .MuiGrid-container': {
    //   marginTop: '0',
    //   marginBottom: '0',
    // },

    // '& .MuiGrid-item': {
    //   paddingTop: '0',
    //   paddingBottom: '0',
    // },
  },
  pageInside: {
    padding: '0 65px',
  },
  tabTitle: {
    display: 'inline-flex',
    backgroundColor: colors.white,
    padding: '0 42px 0 32px',
    borderRadius: '10px 10px 0 0',

    '& > span': {
      display: 'flex',
      justifyContent: 'center',
      borderBottom: `2px solid ${colors.sea}`,
      padding: '16px 50px 0 50px',
      cursor: 'pointer',

      '&:focus': {
        outline: 'none',
      },

      '& > i': {
        margin: '0 16px 10px 0',

        '& svg': {
          width: '24px',
          height: '24px',

          '& path': {
            fill: colors.sea,
          },
        },
      },

      '& > strong': {
        display: 'block',
        fontSize: '14px',
        fontWeight: 700,
        lineHeight: '150%',
        color: colors.black,
        paddingTop: '2px',
      },
    },
  },
  tabContent: {
    display: 'block',
    backgroundColor: colors.white,
    padding: '40px 4vw',
    borderRadius: '0 10px 10px 10px',
    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)',

    '& hr': {
      display: 'block',
      border: 'none',
      borderTop: `1px solid ${colors.grayLight}`,
      margin: '8px 0 32px 0',
    },
  },
  formTitle: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '150%',
    color: colors.grayMedium,
    padding: '0 0 16px 0',
  },

  formItem: {
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${colors.grayMedium}`,
    height: '48px',
    borderRadius: '10px',
    marginBottom: '24px',
  },
}))

const loadingPoint = [
  {
    id: 1,
    label: 'İstanbul',
  },
  {
    id: 2,
    label: 'Antalya',
  },
  {
    id: 3,
    label: 'İzmir',
  },
  {
    id: 4,
    label: 'Ordu',
  },
  {
    id: 5,
    label: 'Samsun',
  },
  {
    id: 6,
    label: 'Giresun',
  },
  {
    id: 7,
    label: 'Trabzon',
  },
  {
    id: 8,
    label: 'Rize',
  },
  {
    id: 9,
    label: 'Sinop',
  },
]
