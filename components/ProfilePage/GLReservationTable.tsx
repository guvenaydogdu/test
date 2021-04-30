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
import React, { FC } from 'react'
import { IOrderTransportsResponse } from '../../interfaces/Order'
import { colors } from '../../theme'
import { GLIconCargo, GLIconContainer, GLIconShip } from '../Common/GLIcons'

interface IGLReservationTableProps {
  data: IOrderTransportsResponse | null
}

export const GLReservationTable: FC<IGLReservationTableProps> = ({ data }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.routeTablePaper}>
      <Table className={classes.routeTable} aria-label="simple table">
        <TableBody>
          {data?.data.map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell align="center" className={classes.icon}>
                  {row?.transportService?.iconPath == 'ico-sea-freight' && <GLIconShip />}
                  {row?.transportService?.iconPath == 'ico-local-service' && <GLIconCargo />}
                  {row?.transportService?.iconPath == 'ico-highway-service' && <GLIconContainer />}
                </TableCell>
                <TableCell align="center">
                  <span>{row.originLocationName}</span>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.colorSea}>
                    {row?.transportService?.nameTR}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <span>{row?.destinationLocationName}</span>
                </TableCell>
              </TableRow>
            )
          })}
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
