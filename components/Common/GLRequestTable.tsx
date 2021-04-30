import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { colors } from '../../theme'
import { GLIconCargo, GLIconContainer, GLIconShip } from './GLIcons'

export const GLRequestTable = () => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.routeTablePaper}>
      <Table className={classes.routeTable} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell align="center" className={classes.icon}>
              <GLIconCargo />
            </TableCell>
            <TableCell align="center">
              <span>Kayseri, Türkiye</span>
            </TableCell>
            <TableCell align="center">
              <Typography className={classes.colorSea}>Ön Taşıma</Typography>
            </TableCell>
            <TableCell align="center">
              <span>Mersin, Türkiye</span>
            </TableCell>
          </TableRow>
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
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const useStyles = makeStyles(() => ({
  colorSea: {
    color: colors.sea,
  },
  colorIron: {
    color: colors.iron,
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
