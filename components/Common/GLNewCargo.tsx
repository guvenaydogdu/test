import { FC, useState } from 'react'
import { makeStyles, Box, Grid } from '@material-ui/core'
import { colors } from '../../theme'
import { GLTitleLine } from './GLTitleLine'
import { GLButton } from './Forms/GLButtons'
import { GLSelect } from './Forms/GLSelect'
import { ITransportOptionsResponse } from '../../interfaces/TransportOption'
import { GLRangeButton } from './Forms/GLRangeButton'

interface IGlNewCargo {
  onNewOptionAdded: (optionId: number, count: number) => any
  transportOptions: ITransportOptionsResponse
  handleNewTransport: () => any
}

export const GLNewCargo: FC<IGlNewCargo> = ({
  onNewOptionAdded,
  transportOptions,
  handleNewTransport,
}) => {
  const [optionId, setOptionId] = useState<number>(0)
  const [count, setCount] = useState<number>(0)

  const onClick = () => {
    if (optionId > 0 && count > 0) {
      onNewOptionAdded(optionId, count)
      handleNewTransport()
    }
  }

  const classes = useStyles()
  return (
    <Box className={classes.newCargo}>
      <Grid container spacing={2} justify="center">
        <Grid item lg={9}>
          <GLTitleLine size="medium" title="Yeni Yük" />
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
                onChange={(id: number) => {
                  setOptionId(id)
                }}
              />
            </Grid>
            <Grid item lg={4}>
              <GLRangeButton
                size="large"
                value={count}
                onChange={(newCount: number) => setCount(newCount)}
              />
            </Grid>
            <Grid item lg={4}>
              <GLButton
                text="Güncelle"
                textColor={colors.sea}
                textColorHover={colors.white}
                bgColor="transparent"
                bgColorHover={colors.sea}
                borderColor={colors.sea}
                shadow={false}
                onClick={onClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  newCargo: {
    backgroundColor: colors.blueLight,
    margin: '32px -20px 36px -20px',
    padding: '24px 0',
  },
}))
