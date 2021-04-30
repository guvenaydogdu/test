/*import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { makeStyles, Container, Grid, Box, Theme } from '@material-ui/core'
import { GLBox } from '../../components/Common/GLBox'
import { colors } from '../../theme'
import {
  GLIconAirPlane,
  GLIconDate,
  GLIconInfo,
  GLIconNext,
  GLIconPrev,
} from '../../components/Common/GLIcons'
import { GLSelect } from '../../components/Common/Forms/GLSelect'
import { GLInput } from '../../components/Common/Forms/GLInput'
import { GLTooltip } from '../../components/Common/GLTooltip'
import { GLRangeButton } from '../../components/Common/Forms/GLRangeButton'
import { GLSwitch } from '../../components/Common/GLSwitch'
import { GLCheckBox } from '../../components/Common/Forms/GLCheckBox'
import { GLTextArea } from '../../components/Common/Forms/GLTextarea'
import { GLButton } from '../../components/Common/Forms/GLButtons'
import Link from 'next/link'
import { GLCargoStatus } from '../../components/Common/GLCargoStatus'
import { GLDatePicker } from '../../components/Common/Forms/GLDatePicker'

interface StyleProps {
  color?: string
}

interface IPageProps {
  color?: string
}

const PriceRequestFormAir: NextPage<IPageProps> = ({ color = colors.air }) => {
  const classes = useStyles({ color })

  return (
    <Layout>
      <div className={classes.insidePage}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justify="center">
            <Grid item xs={10}>
              <Box className={classes.formTitle}>
                <span>
                  <i>
                    <GLIconAirPlane color={color} />
                  </i>
                  <span className="title">Havayolu Fiyat Talep Formu</span>
                </span>
              </Box>
              <GLBox shadow={true}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <GLSelect
                      label="Yükleme Noktası"
                      data={[
                        {
                          id: 1,
                          label: 'Menu item 1',
                        },
                        {
                          id: 2,
                          label: 'Menu item 2',
                        },
                        {
                          id: 3,
                          label: 'Menu item 3',
                        },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <GLSelect
                      label="Varış Noktası"
                      data={[
                        {
                          id: 1,
                          label: 'Menu item 1',
                        },
                        {
                          id: 2,
                          label: 'Menu item 2',
                        },
                        {
                          id: 3,
                          label: 'Menu item 3',
                        },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <GLDatePicker
                      label="&nbsp;"
                      value={new Date()}
                      onChange={() => {
                        console.log('test')
                      }}
                      startIcon={<GLIconDate color={color} />}
                      endIcon={
                        <GLTooltip
                          color={color}
                          title="Bu seçeneğin işaretlenmesi halinde ilave ardiye hizmetleri ile ilgili talep olduğu Kabul edilerek, ardiye ücretli bir fiyat teklifi oluşturulacaktır."
                        >
                          <GLIconInfo />
                        </GLTooltip>
                      }
                    />
                  </Grid>
                </Grid>

                <hr className={classes.hr} />

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <GLSelect
                      label="Ürün Kategorisi"
                      data={[
                        {
                          id: 1,
                          label: 'Menu item 1',
                        },
                        {
                          id: 2,
                          label: 'Menu item 2',
                        },
                        {
                          id: 3,
                          label: 'Menu item 3',
                        },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <GLInput label="Ürün Cinsi / Adı" />
                  </Grid>
                  <Grid item xs={4}>
                    <GLInput label="Yük Bedeli" />
                  </Grid>
                  <Grid item xs={4}>
                    <GLSelect
                      label="Talep Çeşidi"
                      data={[
                        {
                          id: 1,
                          label: 'Menu item 1',
                        },
                        {
                          id: 2,
                          label: 'Menu item 2',
                        },
                        {
                          id: 3,
                          label: 'Menu item 3',
                        },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <GLInput
                      label="Bürüt Ağırlık"
                      placeholder="Kg"
                      endIcon={
                        <GLTooltip color={color} title="Tooltip Text">
                          <GLIconInfo />
                        </GLTooltip>
                      }
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <GLInput label="Hacim" />
                  </Grid>
                  <Grid item xs={4}>
                    <GLSelect
                      label="INCOTERM"
                      data={[
                        {
                          id: 1,
                          label: 'Menu item 1',
                        },
                        {
                          id: 2,
                          label: 'Menu item 2',
                        },
                        {
                          id: 3,
                          label: 'Menu item 3',
                        },
                      ]}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <GLInput label="Ölçüler" placeholder="En" />
                      </Grid>
                      <Grid item xs={4}>
                        <GLInput label="&nbsp;" placeholder="Boy" />
                      </Grid>
                      <Grid item xs={4}>
                        <GLInput label="&nbsp;" placeholder="Yükseklik" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <GLRangeButton size="large" label="Adet" labelPosition="top" color={color} />
                  </Grid>
                </Grid>

                <hr className={classes.hr} />

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={5}>
                    <strong className={classes.titleLight}>Hizmet Çeşidi</strong>
                    <Box className={classes.checkList}>
                      <GLCheckBox color={color}>Ön Taşıma</GLCheckBox>
                      <GLCheckBox color={color}>Kalkış Limanı Lokal Hizmetleri</GLCheckBox>
                      <GLCheckBox color={color}>Navlun</GLCheckBox>
                      <GLCheckBox color={color}>Varış Limanı Lokal Hizmetleri</GLCheckBox>
                      <GLCheckBox color={color}>Son Taşıma</GLCheckBox>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <div className={classes.cargoStatusWrapper}>
                      <GLCargoStatus color={color} />
                    </div>
                  </Grid>
                </Grid>

                <hr className={classes.hr} />

                <strong className={classes.titleLight}>Ek Hizmetler</strong>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box className={classes.checkList}>
                      <GLCheckBox color={color}>Sigorta İstiyorum</GLCheckBox>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item lg={4}>
                    <GLInput
                      placeholder="HS Kodu"
                      endIcon={
                        <GLTooltip
                          color={color}
                          title="Bu seçeneğin işaretlenmesi halinde ilave ardiye hizmetleri ile ilgili talep olduğu Kabul edilerek, ardiye ücretli bir fiyat teklifi oluşturulacaktır."
                        >
                          <GLIconInfo />
                        </GLTooltip>
                      }
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <GLSwitch tooltiptext="Tooltip Text" color={color} />
                  </Grid>
                  <Grid item xs={12}>
                    <GLTextArea
                      label="Notunuz"
                      labelIcon={
                        <GLTooltip
                          color={color}
                          title="Bu seçeneğin işaretlenmesi halinde ilave ardiye hizmetleri ile ilgili talep olduğu Kabul edilerek, ardiye ücretli bir fiyat teklifi oluşturulacaktır."
                        >
                          <GLIconInfo />
                        </GLTooltip>
                      }
                      placeholder="Mesajınızı buraya yazabilirsiniz."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box className={classes.checkContract}>
                      <GLCheckBox color={color}>
                        <Link href="#">Fiyat Talebi Aydınlatma</Link> Metnini Okudum,{' '}
                        <Link href="#">Yasaklı Ürünler</Link> Metnini Okudum, Yükün Uygunluğunu
                        Teyid Ederim.
                      </GLCheckBox>
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justify="flex-end"
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                >
                  <Grid item xs={3}>
                    <GLButton
                      text="Geri Dön"
                      textColor={colors.grayMedium}
                      textColorHover={colors.blueDark}
                      bgColor="transparent"
                      bgColorHover={colors.graySoft}
                      shadow={false}
                      iconSize="8px"
                      startIcon={<GLIconPrev />}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <GLButton
                      text="Devam Et"
                      textColor={colors.white}
                      textColorHover={colors.white}
                      bgColor={colors.air}
                      bgColorHover={colors.airHover}
                      iconSize="8px"
                      endIcon={<GLIconNext />}
                    />
                  </Grid>
                </Grid>
              </GLBox>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  )
}

export default PriceRequestFormAir

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
    },
  }
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  color: (props) => ({
    color: props.color,
  }),
  hr: {
    border: 'none',
    borderBottom: `1px solid ${colors.grayLight}`,
    margin: '32px 0',
  },
  insidePage: {
    paddingTop: '90px',
  },
  formTitle: (props) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: '10px 43px 10px 43px',
    borderRadius: '10px 10px 0 0',
    marginBottom: '-10px',

    '& > span': {
      display: 'flex',
      alignItems: 'center',
      borderBottom: `2px solid ${props.color}`,
      padding: '0 40px 10px 20px',

      '& i': {
        display: 'block',
        margin: '0 16px',
        lineHeight: 0,

        '& svg': {
          width: 'auto',
          height: '24px',
          fill: props.color,
        },
      },

      '& .title': {
        display: 'block',
        fontWeight: 800,
        fontSize: '14px',
        lineHeight: '16px',
        color: colors.black,
      },
    },
  }),
  searchCheck: {
    '& .MuiFormControlLabel-root': {
      display: 'flex',
      marginLeft: '-11px',

      '& .MuiTypography-root': {
        fontFamily: `'Poppins', sans-serif`,
        fontSize: '14px',
        lineHeight: '186%',
        color: colors.grayMedium,
        padding: '6px 0 0 0',
      },
    },
  },
  checkList: (props) => ({
    '& .MuiFormControlLabel-root': {
      '& .MuiFormControlLabel-label': {
        fontSize: '14px',
        color: colors.grayMedium,
      },

      '& .Mui-checked': {
        '& + .MuiFormControlLabel-label': {
          color: props.color,
        },
      },
    },
  }),
  checkContract: (props) => ({
    '& .MuiFormControlLabel-root': {
      '& .MuiFormControlLabel-label': {
        fontSize: '14px',
        color: colors.black,

        '& a': {
          color: props.color,
        },
      },
    },
  }),
  titleLight: {
    display: 'block',
    fontSize: '14px',
    color: colors.grayMedium,
    fontWeight: 800,
    paddingBottom: '16px',
  },
  cargoStatusWrapper: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '30px',

    '& > div': {
      flexBasis: '100%',
    },
  },
}))
*/

import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Requests from '../../requests'
import { ITransportTypePager, ITransportTypesResponse } from '../../interfaces/TransportTypes'
import { AirForm } from '../../components/DemandForms/AirForm'

interface IPageProps {
  transportTypes: ITransportTypesResponse
}

const PriceRequestFormSea: NextPage<IPageProps> = ({ transportTypes }) => {
  return (
    <Layout>
      <AirForm transportTypes={transportTypes} />
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

  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
      transportTypes: data,
    },
  }
}
