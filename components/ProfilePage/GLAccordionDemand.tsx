import React, { FC, useState } from 'react'
import { Box, makeStyles, Typography, IconButton, Grid, List, ListItem } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { GLIconContainer, GLIconShip } from '../Common/GLIcons'
import { colors } from '../../theme'
import { IOrder, IOrderTransportsResponse } from '../../interfaces/Order'
import moment from 'moment'
import Requests from '../../requests'
import { GLReservationTable } from './GLReservationTable'

interface IGLAccordionDemandProps {
  data: IOrder
}

export const GLAccordionDemand: FC<IGLAccordionDemandProps> = ({ data }) => {
  const classes = useStyles()
  const request = Requests()

  const [routeDetail, setRouteDetail] = useState<boolean>(false)
  const [demandDetail, setDemandDetail] = useState<IOrderTransportsResponse | null>(null)

  const handleRouteDetail = () => {
    setRouteDetail((prev) => !prev)
    if (demandDetail == null) {
      getOrderTransport()
    }
  }

  const getOrderTransport = () => {
    request.OrderTransportRequest.getList({
      pageNumber: 1,
      pageSize: 10,
      orderId: data.id,
      transportId: 0,
      includeTransportService: true,
    })
      .then((res) => setDemandDetail(res))
      .catch((err) => console.log(err))
  }
  return (
    <Box className={`${classes.accordion} ${routeDetail && 'active'}`}>
      <Box className={classes.accordionTitle}>
        <Box className={classes.titleTop}>
          <Box className={classes.headTitle}>
            <span className="icon">
              <GLIconShip color={colors.sea} />
            </span>
            <span className="title">
              <Typography>Talep No: {data?.id}</Typography>
              <span>
                <em>{moment(data?.date).format('DD.MM.YYYY')}</em>
              </span>
            </span>
          </Box>
          <Box className={classes.headInfo}>
            <p>Başarılı Talep</p>
          </Box>
          <Box className={`${classes.arrow} ${routeDetail && 'active'}`}>
            <IconButton onClick={handleRouteDetail}>
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.titleBottom}>
          <Box className="route">
            <span>{data.originLocationName}</span>
            <em>&nbsp;</em>
            <span>{data.destinationLocationName}</span>
          </Box>
          <Box className="type">
            <span className="icon">
              <GLIconContainer color={colors.iron} />
            </span>
            <span className="name">{data.transportTypeContainer?.name}</span>
          </Box>
          <Box className="price">
            <span>{data.requestTotalPrice} $</span>
          </Box>
        </Box>
      </Box>
      <Box className={`${classes.accordionDetail} ${routeDetail && 'active'}`}>
        <hr />
        <br />
        <Typography className="title">Detaylar</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <List component="nav" aria-label="Details" className={classes.glList}>
              <ListItem>Ürün Kategörisi: {data.category?.nameEN} </ListItem>
              <ListItem>Ürün Adı / Cinsi: {data.productName} </ListItem>
              <ListItem>IMO: {data?.imo == true ? 'Var' : 'Yok'} </ListItem>
              <ListItem>Class: {data.imoClass?.nameEN} </ListItem>
              <ListItem>UN Number: {data.unCode ? data.unCode : '-'}</ListItem>
              <ListItem>Sigorta:{data.needInsurance == true ? 'Var' : 'Yok'} </ListItem>
            </List>
          </Grid>
          <Grid item xs={4}>
            <List component="nav" aria-label="Details" className={classes.glList}>
              <ListItem>Mal Bedeli: {data.cost}</ListItem>
              <ListItem>Brüt Ağırlık (kg):{data.grossWeight} </ListItem>
              <ListItem>Adet: {data.count}</ListItem>
              <ListItem>
                Ölçüler: {data.width} - {data.size} - {data.height}
              </ListItem>
              <ListItem>Hacim: {data.capacity}</ListItem>
              <ListItem>INCOTERM: {data.incoterm?.name}</ListItem>
            </List>
          </Grid>
          <Grid item xs={4}>
            <List component="nav" aria-label="Details" className={classes.glList}>
              <ListItem>Konteyner Çeşidi:</ListItem>
              <ListItem>Konteyner Adedi:</ListItem>
              <ListItem>
                İstiflenebilir Ürün : {data?.hoardable == true ? 'Evet' : 'Hayır'}
              </ListItem>
              <ListItem>Kat Sayısı:{data.floorCount}</ListItem>
              <ListItem>Paketleme Çeşidi:{data.packingType?.nameEN}</ListItem>
              <ListItem>Transit Süre:-</ListItem>
            </List>
          </Grid>
        </Grid>
        <br />
        <hr />
        <GLReservationTable data={demandDetail} />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  hr: {
    border: 'none',
    borderBottom: `1px solid ${colors.grayLight}`,
    margin: '24px 0',
  },
  accordion: {
    border: `1px solid ${colors.grayMedium}`,
    backgroundColor: colors.white,
    borderRadius: '5px',
    padding: '16px 30px',
    marginBottom: '16px',
    transition: 'all .2s ease',

    '&.active': {
      borderColor: colors.sea,
      backgroundColor: colors.blueLight,
    },
  },
  accordionTitle: {},
  accordionDetail: {
    height: 0,
    overflow: 'hidden',
    padding: 0,
    transition: 'all .2s ease',

    '&.active': {
      height: 'auto',
      padding: '1rem 0',
    },

    '& hr': {
      border: 'none',
      borderBottom: `1px solid ${colors.grayLight}`,
      margin: '0 0 16px 0',
    },

    '& .title': {
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '16px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.sea,
      paddingBottom: '16px',
      margin: 0,
    },
  },
  titleTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${colors.grayLight}`,
    paddingBottom: '16px',
  },
  titleBottom: {
    display: 'flex',
    padding: '32px 0 16px 0',

    '& .route': {
      flexBasis: '55%',
      display: 'flex',
      alignItems: 'center',
      paddingRight: '16px',

      '& span': {
        display: 'block',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '16px',
        color: colors.black,
        whiteSpace: 'nowrap',
      },

      '& em': {
        position: 'relative',
        display: 'block',
        width: '52px',
        height: '1px',
        margin: '0 1rem',
        backgroundColor: colors.grayMedium,

        '&:before, &:after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          marginTop: '-4px',
          display: 'block',
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          backgroundColor: colors.grayLight,
          border: `1px solid ${colors.grayMedium}`,
        },

        '&:after': {
          left: 'auto',
          right: '0',
        },
      },
    },

    '& .type': {
      flexBasis: '30%',
      display: 'flex',
      alignItems: 'center',

      '& .icon': {
        marginRight: '1rem',

        '& svg': {
          width: '24px',
          height: '24px',
        },
      },

      '& .name': {
        display: 'block',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '16px',
        color: colors.black,
        whiteSpace: 'nowrap',
      },
    },

    '& .price': {
      flexBasis: '15%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',

      '& span': {
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '150%',
        color: colors.iron,
        fontFeatureSettings: "'pnum' on, 'lnum' on",
      },
    },
  },
  arrow: {
    flexBasis: '15%',
    display: 'flex',
    justifyContent: 'flex-end',

    '& .MuiButtonBase-root': {
      border: `1px solid ${colors.grayMedium}`,
      transform: 'rotate(0deg)',
      transition: 'all .2s ease',
      padding: '7px',

      '& svg': {
        fill: colors.sea,
      },
    },

    '&.active': {
      '& .MuiButtonBase-root': {
        transform: 'rotate(-180deg)',
      },
    },
  },
  headTitle: {
    flexBasis: '55%',
    display: 'flex',

    '& .icon': {
      paddingRight: '1em',
      lineHeight: 0,

      '& svg': {
        width: '40px',
        height: '40px',
      },
    },

    '& .title': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',

      '& p': {
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '16px',
        fontFeatureSettings: "'pnum' on, 'lnum' on",
        color: colors.sea,
        paddingBottom: '2px',
      },

      '& span': {
        display: 'flex',
        alignItems: 'center',

        '& em': {
          display: 'block',
          fontWeight: 600,
          fontSize: '12px',
          lineHeight: '14px',
          fontStyle: 'normal',
          fontFeatureSettings: "'pnum' on, 'lnum' on",
          color: colors.grayMedium,
        },

        '& span': {
          display: 'block',
          fontWeight: 700,
          fontSize: '10px',
          lineHeight: '12px',
          color: colors.white,
          backgroundColor: colors.iron,
          fontFeatureSettings: "'pnum' on, 'lnum' on",
          padding: '3px 9px 1px 9px',
          marginLeft: '8px',
          borderRadius: '5px',
        },
      },
    },
  },
  headInfo: {
    flexBasis: '30%',

    '& p': {
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '16px',
      color: colors.sea,
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      margin: 0,
    },

    '& span': {
      display: 'block',
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '14px',
      color: colors.iron,
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      padding: '6px 0 0 0',
    },
  },
  download: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 0',
  },
  btnDownload: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',

    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '16px',
    textDecorationLine: 'underline',
    fontFeatureSettings: "'pnum' on, 'lnum' on",
    color: colors.sea,

    '& svg': {
      width: '24px',
      height: '24px',
      marginRight: '1rem',
    },
  },
  textDanger: {
    display: 'flex',
    alignItems: 'flex-start',
    color: colors.danger,

    '& svg': {
      width: '16px',
      height: '16px',
      margin: '1px 16px 0 0',
    },
  },
  dueDatePrice: {
    '& strong': {
      display: 'block',
      fontWeight: 700,
      fontSize: '32px',
      lineHeight: '38px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.iron,
      paddingBottom: '7px',
    },

    '& p': {
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '14px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.grayMedium,
      margin: 0,
    },
  },
  btnBadge: {
    backgroundColor: colors.iron,
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    fontWeight: 600,
    fontSize: '12px !important',
    lineHeight: '18px',
    textAlign: 'center',
    fontFeatureSettings: "'pnum' on, 'lnum' on",
    color: colors.white,
  },
  glList: {
    '& li': {
      padding: '4px 0',
      fontSize: '12px',
      lineHeight: '14px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
    },
  },
  fileList: {
    '& .MuiListItem-container': {
      border: `1px solid ${colors.blueLight}`,

      '& .MuiListItem-root': {
        '&.checked': {
          backgroundColor: colors.blueLight,
        },

        '& .MuiListItemIcon-root': {
          '& .MuiIconButton-root': {
            color: colors.sea,

            '&:hover': {
              backgroundColor: `rgba(${colors.seaRGB}, .1)`,
            },
          },
        },

        '& .MuiListItemText-root': {
          '& .MuiTypography-root': {
            display: 'flex',

            '& span': {
              flexBasis: '50%',
              color: colors.sea,
              textDecoration: 'underline',
            },

            '& strong': {
              flexBasis: '50%',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'normal',
              color: colors.black,
              textDecoration: 'underline',

              '& svg': {
                width: '18px',
                height: '18px',
                fill: colors.grayMedium,
                marginRight: '8px',
              },
            },
          },
        },
      },

      '& .MuiListItemSecondaryAction-root': {
        '& .MuiButtonBase-root': {
          '& + .MuiButtonBase-root': {
            marginLeft: '1rem',
          },

          '& svg': {
            width: '16px',
            height: '16px',
            fill: colors.grayMedium,
          },

          '&:hover svg': {
            fill: colors.sea,
          },
        },
      },
    },
  },
}))
