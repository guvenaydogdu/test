import { FC, useState } from 'react'
import {
  makeStyles,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
} from '@material-ui/core'
import { colors } from '../../theme'
import { GLIconClose, GLIconContainer } from './GLIcons'
import { GLButton } from './Forms/GLButtons'
import { GLRangeButton } from './Forms/GLRangeButton'
import { GLSelect } from './Forms/GLSelect'
import { ITransportOptionsResponse } from '../../interfaces/TransportOption'
interface IGLCargoItemProps {
  name?: string
  count: number
  transportOptions: ITransportOptionsResponse
  transportOptionId: number
  onChangeOptions: (deleteId: number, newId: number) => any
  onChangeOptionCount: (optionId: number, count: number) => any
}
export const GLCargoItem: FC<IGLCargoItemProps> = ({
  name,
  count,
  transportOptions,
  transportOptionId,
  onChangeOptions,
  onChangeOptionCount,
}) => {
  const classes = useStyles()
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const handleEditMode = () => {
    setIsEditMode((prev) => !prev)
  }

  const onChangeItem = (newId: number) => {
    onChangeOptions(transportOptionId, newId)
  }
  const onChangeCount = (newCount: number) => {
    onChangeOptionCount(transportOptionId, newCount)
  }

  return (
    <Box className={classes.cargoItemBox}>
      <TableContainer component={Box}>
        <Table className={classes.table} aria-label="Table">
          <TableHead>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
              <TableCell>Konteyner Çeşidi</TableCell>
              <TableCell>Konteyner Adedi</TableCell>
              <TableCell>Yükleme Çeşidi</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <GLIconContainer />
              </TableCell>
              <TableCell>
                <strong>{name}</strong>
              </TableCell>
              <TableCell>
                <strong>{count} Adet</strong>
              </TableCell>
              <TableCell>
                <span>FCL</span>
              </TableCell>
              <TableCell>
                <GLButton
                  text="Düzenle"
                  textColor={colors.white}
                  endIcon={<GLIconClose />}
                  bgColor={colors.sea}
                  bgColorHover={colors.seaHover}
                  iconSize="16px"
                  onClick={handleEditMode}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {isEditMode && (
        <>
          <hr />
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item lg={4}>
              <GLSelect
                label="Konteyner Çeşidi"
                data={transportOptions.data.map((transportOption) => {
                  return {
                    id: transportOption.id,
                    label: transportOption.name,
                  }
                })}
                value={transportOptionId}
                onChange={onChangeItem}
              />
            </Grid>
            <Grid item lg={4}>
              <GLRangeButton size="large" value={count} onChange={onChangeCount} />
            </Grid>
            <Grid item lg={4}></Grid>
          </Grid>
        </>
      )}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  cargoItemBox: {
    background: colors.white,
    border: `1px solid ${colors.grayMedium}`,
    borderRadius: '5px',
    padding: '16px 21px',

    '& hr': {
      border: 'none',
      borderBottom: `1px solid ${colors.grayLight}`,
      margin: '23px 0',
    },
  },
  table: {
    color: colors.sea,

    '& thead': {
      '& tr': {
        '& th': {
          fontWeight: 'normal',
          fontSize: '12px',
          lineHeight: '14px',
          textAlign: 'center',
          color: colors.grayMedium,
          borderBottom: 'none',
          padding: 0,

          '&:last-child': {
            paddingRight: 0,
          },
        },
      },
    },

    '& tbody': {
      '& tr': {
        '& td': {
          textAlign: 'center',
          borderBottom: 'none',

          '& strong': {
            fontWeight: 'bold',
            fontSize: '14px',
            lineHeight: '16px',
            textAlign: 'center',
            fontFeatureSettings: "'pnum' on, 'lnum' on",
          },

          '& > svg': {
            width: '24px',
            height: '24px',
            fill: colors.iron,
          },

          '&:last-child': {
            paddingRight: 0,
          },
        },
      },
    },
  },
}))
