import { Box, makeStyles } from '@material-ui/core'
import React, { FC } from 'react'
import { colors } from '../../theme'
import { GLSelectFilter } from '../FormItems/GLInput'

interface IGLSortMenuProps {
  sortingValue: number
  handleChangeFilter: (value: number) => void
}

export const GLSortMenu: FC<IGLSortMenuProps> = ({ sortingValue, handleChangeFilter }) => {
  const selectFilter = [
    {
      id: 0,
      label: 'Önce en ucuz',
    },
    {
      id: 1,
      label: 'Önce en pahallı',
    },
  ]

  const classes = useStyles()

  const handleChangeSelectFilter = (event: any) => {
    handleChangeFilter(event.target.value)
  }

  return (
    <>
      <Box className={classes.filterAction}>
        <p>Sırala</p>
        <GLSelectFilter
          data={selectFilter}
          label={selectFilter[0].label}
          value={sortingValue}
          onChange={handleChangeSelectFilter}
        />
      </Box>
    </>
  )
}

const useStyles = makeStyles(() => ({
  filterAction: {
    display: 'flex',
    alignItems: 'flex-end',
    margin: '0',

    '& p': {
      fontSize: '14px',
      lineHeight: '16px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.grayMedium,
      textAlign: 'center',
      margin: '0 12px 7px 0',
    },
  },
}))
