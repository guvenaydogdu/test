import React, { FC, useState } from 'react'
import {
  makeStyles,
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@material-ui/core'
import { colors } from './../../theme'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {
  GLIconArrowDown,
  GLIconArrowUp,
  GLIconShip,
  GLIconInfo,
  GLIconCargo,
  GLIconContainer,
  GLIconAirPlane,
  GLIconRailway,
} from './GLIcons'
import { GLCheckBox } from '../FormItems/GLInput'
import { GLTooltip } from './GLTooltip'

import { GLCargoStatus } from './GLCargoStatus'
import { ITransportSearch } from '../../interfaces/Search'
import { TransportTypes } from '../../utils/global'
interface IGLAccordion {
  data: ITransportSearch
  shippingLineVisible: number
  getAcitveTransportTypeIntegrationId: () => string | undefined
  onSelectTransport?: (data: ITransportSearch) => void
}
export const GLAccordion: FC<IGLAccordion> = ({
  data,
  shippingLineVisible,
  getAcitveTransportTypeIntegrationId,
  onSelectTransport,
}) => {
  const classes = useStyles()
  const [cardFooterStatus, setCardFooterStatus] = useState<boolean>(false)
  const [routeDetail, setRouteDetail] = useState<boolean>(false)

  const handleCardFooterStatus = () => {
    setCardFooterStatus((prev) => !prev)
  }

  const handleRouteDetail = () => {
    setRouteDetail((prev) => !prev)
  }

  return (
    <Box className={`${classes.wrapper} ${routeDetail && 'active'}`}>
      <Box className={classes.title}>
        <Avatar>
          {getAcitveTransportTypeIntegrationId() == TransportTypes.SEAWAY && <GLIconShip />}
          {getAcitveTransportTypeIntegrationId() == TransportTypes.AIRWAY && <GLIconAirPlane />}
          {getAcitveTransportTypeIntegrationId() == TransportTypes.RAILWAY && <GLIconRailway />}
        </Avatar>
        {shippingLineVisible == 1 && (
          <Typography variant="h5">{data?.shippingLine?.name}</Typography>
        )}

        <IconButton onClick={handleRouteDetail}>
          {routeDetail ? <GLIconArrowUp /> : <GLIconArrowDown />}
        </IconButton>
      </Box>
      <TableContainer component={Paper} className={classes.routeTablePaper}>
        <Table className={classes.routeTable} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="center" className={classes.icon}>
                <GLCheckBox label="" checked={cardFooterStatus} onChange={handleCardFooterStatus} />
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">{data.originLocation?.name}</Typography>
              </TableCell>
              <TableCell align="center">
                <GLCargoStatus />
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5"> {data.destinationLocation?.name}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className={classes.colorIron}>
                  <strong>{data.price} $</strong>
                </Typography>
              </TableCell>
              <TableCell align="center">
                <GLTooltip title="Bu seçeneğin işaretlenmesi halinde ilave ardiye hizmetleri ile ilgili talep olduğu Kabul edilerek, ardiye ücretli bir fiyat teklifi oluşturulacaktır.">
                  {!cardFooterStatus && <GLIconInfo />}
                </GLTooltip>
              </TableCell>
            </TableRow>
            {routeDetail && (
              <>
                {data?.transportServices.map((tservice, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center" className={classes.icon}>
                        {tservice.transportService.iconPath == 'ico-sea-freight' && <GLIconShip />}
                        {tservice.transportService.iconPath == 'ico-local-service' && (
                          <GLIconCargo />
                        )}
                        {tservice.transportService.iconPath == 'ico-highway-service' && (
                          <GLIconContainer />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <span>{tservice.originLocation.name}</span>
                      </TableCell>
                      <TableCell align="center">
                        <Typography className={classes.colorSea}>
                          {tservice.transportService.nameTR}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {!tservice.isLocal && <span>Mersin, Türkiye</span>}
                      </TableCell>
                      <TableCell align="center">&nbsp;</TableCell>
                      <TableCell align="center">&nbsp;</TableCell>
                    </TableRow>
                  )
                })}
                {/*
           
                <TableRow>
                  <TableCell align="center" className={classes.icon}>
                    <GLIconContainer />
                  </TableCell>
                  <TableCell align="center">
                    <span>Mersin, Türkiye</span>
                  </TableCell>
                  <TableCell align="center">
                    <Typography className={classes.colorSea}>Gidiş Liman Hizmetleri</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <span>Doha, Katar</span>
                  </TableCell>
                  <TableCell align="center">&nbsp;</TableCell>
                  <TableCell align="center">&nbsp;</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" className={classes.icon}>
                    <GLIconShip />
                  </TableCell>
                  <TableCell align="center">
                    <span>Doha, Katar</span>
                  </TableCell>
                  <TableCell align="center">
                    <Typography className={classes.colorSea}>Navlun</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <span>Al-Gaf, Katar</span>
                  </TableCell>
                  <TableCell align="center">&nbsp;</TableCell>
                  <TableCell align="center">&nbsp;</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" className={classes.icon}>
                    <GLIconContainer />
                  </TableCell>
                  <TableCell align="center">
                    <span>Doha, Katar</span>
                  </TableCell>
                  <TableCell align="center">
                    <Typography className={classes.colorSea}>Varış Limanı Hizmetleri</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <span>Al-Gaf, Katar</span>
                  </TableCell>
                  <TableCell align="center">&nbsp;</TableCell>
                  <TableCell align="center">&nbsp;</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" className={classes.icon}>
                    <GLIconCargo />
                  </TableCell>
                  <TableCell align="center">
                    <span>Doha, Katar</span>
                  </TableCell>
                  <TableCell align="center">
                    <Typography className={classes.colorSea}>Son Taşıma</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <span>Al-Gaf, Katar</span>
                  </TableCell>
                  <TableCell align="center">&nbsp;</TableCell>
                  <TableCell align="center">&nbsp;</TableCell>
                </TableRow>
           * */}{' '}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {cardFooterStatus && (
        <Box className={classes.footer}>
          <Typography variant="h3">{data.totalPrice} $</Typography>
          <Typography>
            İlgili fiyat <strong>Gösterge Fiyat</strong> niteliğindedir. Talebiniz sunucu oluşacak
            nihai fiyat tarafınıza bir sonraki aşamalarda iletilecektir.
          </Typography>
          {onSelectTransport && (
            <Button
              aria-label="register"
              className={classes.btnArrow}
              variant="contained"
              color="primary"
              endIcon={<ChevronRightIcon />}
              type="submit"
              onClick={() => onSelectTransport(data)}
            >
              <span className="text">Devam Et</span>
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  colorSea: {
    color: colors.sea,
  },
  colorIron: {
    color: colors.iron,
  },
  wrapper: {
    marginBottom: '16px',
    padding: '16px 20px',
    borderRadius: '5px',
    boxShadow: 'none',
    border: `1px solid ${colors.grayMedium}`,

    '&.active': {
      backgroundColor: colors.blueLight,
      borderColor: colors.sea,

      '& [class*="makeStyles-title"]': {
        '& .MuiIconButton-root': {
          backgroundColor: colors.sea,

          '& svg': {
            fill: colors.white,
          },
        },
      },
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${colors.grayLight}`,
    paddingBottom: '16px',

    '& .MuiAvatar-circle': {
      backgroundColor: 'transparent',
      marginRight: '20px',

      '& svg': {
        fill: colors.sea,
      },
    },

    '& .MuiTypography-root': {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '19px',
      color: colors.sea,
    },

    '& .MuiIconButton-root': {
      width: '40px',
      height: '40px',
      border: `1px solid ${colors.grayLight}`,
      borderRadius: '50%',
      marginLeft: 'auto',

      '& svg': {
        fill: colors.sea,
      },
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 0 16px 0',

    '& > *': {
      flexBasis: '33.3%',
    },

    '& h3': {
      fontWeight: 'bold',
      fontSize: '32px',
      lineHeight: '38px',
      textAlign: 'center',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.iron,
    },

    '& p': {
      fontSize: '10px',
      lineHeight: '12px',
      fontFeatureSettings: "'pnum' on, 'lnum' on, 'liga' off",
      color: colors.sea,

      '& strong': {
        fontWeigth: 800,
        textDecoration: 'underline',
        color: colors.blueMedium,
      },
    },
  },
  btnArrow: {
    display: 'flex',
    width: '100%',
    maxWidth: '215px',
    height: '48px',

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
  routeTablePaper: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  routeTable: {
    fontSize: '14px',
    lineHeight: '16px',
    textAlign: 'center',

    '& .MuiTableBody-root': {
      '& .MuiTableRow-root:first-child, & .MuiTableRow-root:last-child': {
        '& .MuiTableCell-root::before': {
          display: 'none',
        },
      },

      '& .MuiTableRow-root': {
        '& .MuiTableCell-root': {
          borderBottom: `1px solid ${colors.blueLight}`,

          '&:first-child': {
            borderBottom: 'none',
          },
        },
      },

      '& .MuiTableRow-root:first-child': {
        '& .MuiTableCell-root:first-child': {
          borderBottom: `1px solid ${colors.blueLight}`,
        },
      },

      '& .MuiTableRow-root:last-child': {
        '& .MuiTableCell-root:first-child': {
          borderBottom: `1px solid ${colors.blueLight}`,
        },
      },
    },

    '& h5': {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '150%',
    },

    '& span': {
      fontSize: '14px',
      fontWeight: 600,
      color: colors.black,
    },

    '& strong': {
      fontWeight: 800,
      fontFeatureSettings: "'pnum' on, 'lnum' on",
    },
  },
  icon: {
    position: 'relative',

    '& svg': {
      width: '24px',
      fill: colors.sea,
    },

    '&::before': {
      content: "''",
      position: 'absolute',
      left: '50%',
      top: '75%',
      width: '2px',
      height: '40%',
      borderRadius: '20px',
      backgroundColor: colors.sea,
    },
  },
  iconInfo: {
    width: '24px',
    padding: '2px',

    '& svg': {
      width: '16px',
      height: '16px',
      fill: colors.grayMedium,
    },
  },
  routeDetail: {
    display: 'flex',
    alignItems: 'center',

    '& .icon': {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',

      '& svg': {
        width: '24px',
        fill: colors.sea,
      },
    },

    '& p': {
      flexBasis: '60%',
      fontSize: '14px',
      lineHeight: '16px',
      textAlign: 'center',
      color: colors.black,

      '& span': {
        color: colors.sea,
      },
    },
  },
}))
