import { Box, makeStyles } from '@material-ui/core'
import dynamic from 'next/dynamic'
import React, { FC, memo } from 'react'
import { IShippingLinesResponse } from '../../interfaces/ShippingLine'

import { colors } from '../../theme'
import { GLFilterArea } from '../Common/GLFilterArea'
import { GLCheckBox } from '../FormItems/GLInput'

const DynamicScrollBar = dynamic(() => import('../Common/GLScrollBar'), {
  ssr: false,
})

interface IGLShippingLinesFilterProps {
  shippingLines: IShippingLinesResponse
  selectedShippingLines: number[]
  handleSelectedShippingLines: (selectedId: number) => void
  shippingLineVisible: number
}

export const GLShippingLinesFilter: FC<IGLShippingLinesFilterProps> = memo(
  ({ shippingLines, selectedShippingLines, handleSelectedShippingLines, shippingLineVisible }) => {
    const classes = useStyles()

    if (shippingLineVisible == 1) {
      return (
        <GLFilterArea title="Taşıyıcı">
          <Box className={classes.glScrollBar}>
            <DynamicScrollBar height={120}>
              <Box className={classes.searchCheck}>
                {shippingLines?.data.map((shippingLine) => {
                  return (
                    <GLCheckBox
                      key={shippingLine.id}
                      checked={selectedShippingLines.indexOf(shippingLine.id) > -1}
                      label={shippingLine.name}
                      onChange={() => {
                        handleSelectedShippingLines(shippingLine.id)
                      }}
                    />
                  )
                })}
              </Box>
            </DynamicScrollBar>
          </Box>
        </GLFilterArea>
      )
    } else return null
  }
)

GLShippingLinesFilter.displayName = 'GLShippingLinesFilter'
const useStyles = makeStyles(() => ({
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
  glScrollBar: {
    '& > div': {
      '& > div:last-child': {
        background: colors.grayLight,

        '& > div': {
          backgroundColor: colors.sea + ' !important',
        },
      },
    },
  },
}))
