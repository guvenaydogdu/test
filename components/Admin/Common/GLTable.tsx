import { FC, MouseEvent, ChangeEvent, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  IconButton,
  Switch,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import moment from 'moment'
interface IProps {
  columNames: IColumn[]
  data: any
  handleUpdate?: (id: number) => void
  handleRemove?: (id: number) => void
  handleSwitch?: (id: number) => void
  switchValue?: string
  totalItem: number | undefined
  onPageChange?: (field: string, value: any) => void
  onPageRowsChange?: (field: string, value: any) => void
  rowsPerPage: number
  pageNumber: number
  externalData?: any
}
interface IColumn {
  id: string
  label: string
  align?: string
  minWidth?: number
  format?: () => string
  externalData?: boolean
  type?: string
  subId?: string
}

const GLTable: FC<IProps> = ({
  columNames,
  data,
  handleUpdate,
  handleRemove,
  handleSwitch,
  switchValue,
  totalItem,
  onPageChange,
  onPageRowsChange,
  rowsPerPage,
  pageNumber,
  externalData,
}) => {
  const classes = useStyles()
  const columns = columNames.map((column) => {
    const newColum: IColumn = {
      id: column.id,
      label: column.label,
      minWidth: column.minWidth || 100,
      externalData: column?.externalData,
      type: column?.type,
      subId: column?.subId,
    }
    return newColum
  })

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null,
    newPage: number
  ) => {
    if (onPageChange) {
      onPageChange('pageNumber', newPage + 1)
    }
  }
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onPageRowsChange) {
      onPageRowsChange('pageSize', parseInt(event.target.value))
    }
  }
  useEffect(() => {
    if (onPageChange) {
      onPageChange('pageNumber', 1)
    }
  }, [rowsPerPage])

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={'left'} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right">#</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={'left'}>
                        {column?.externalData
                          ? externalData?.find((eData: any) => eData?.id == value)?.name
                          : column.type == 'date'
                          ? moment(value).format('DD/MM/YYYY')
                          : column?.subId
                          ? row[column.id]
                            ? row[column.id][column?.subId]
                            : '-'
                          : value}
                      </TableCell>
                    )
                  })}
                  <TableCell align="right">
                    {handleUpdate && (
                      <IconButton onClick={() => handleUpdate(row.id)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    )}
                    {handleRemove && (
                      <IconButton onClick={() => handleRemove(row.id)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    )}
                    {handleSwitch && (
                      <Switch
                        checked={switchValue ? row[switchValue] : false}
                        onChange={() => handleSwitch(row.id)}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalItem ? totalItem : 0}
        rowsPerPage={rowsPerPage}
        page={pageNumber - 1}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default GLTable

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
})
