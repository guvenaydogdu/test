import { Box, makeStyles, Theme } from '@material-ui/core'
import React, { FC } from 'react'
import { colors } from '../../theme'
import { GLIconCargo, GLIconContainer, GLIconShip } from './GLIcons'

interface StyleProps {
  color?: string
}

interface IGLCargoStatusProps {
  color?: string
}

export const GLCargoStatus: FC<IGLCargoStatusProps> = ({ color }) => {
  const classes = useStyles({ color })

  return (
    <Box className={classes.cargoStatus}>
      <div className="container">
        <span className="active">
          <GLIconContainer />
        </span>
        <span className="active">
          <GLIconContainer />
        </span>
      </div>
      <div className="line"></div>
      <div className="transport">
        <span>
          <GLIconCargo />
        </span>
        <span className="active">
          <GLIconShip />
        </span>
        <span>
          <GLIconCargo />
        </span>
      </div>
    </Box>
  )
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  cargoStatus: (props) => ({
    '& .line': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      '&:before, &:after': {
        content: "''",
        position: 'absolute',
        left: 0,
        top: '-0.3em',
        display: 'block',
        borderRadius: '50%',
        backgroundColor: colors.blueMedium,
        width: '.645em',
        height: '.645em',
        marginBottom: '-0.1em',
      },

      '&:after': {
        left: 'auto',
        right: 0,
      },
    },

    '& .container': {
      display: 'flex',
      alignItems: 'center',
      padding: '0 2.2em',

      '& > span': {
        position: 'relative',
        width: '100%',
        display: 'block',
        textAlign: 'center',
        padding: '0 .4em 1em .4em',

        '&:before': {
          position: 'absolute',
          left: '50%',
          top: '100%',
          content: "''",
          display: 'block',
          borderRadius: '50%',
          backgroundColor: colors.blueMedium,

          width: '.645em',
          height: '.645em',
          transform: 'translate(-50%, -.3em)',
        },

        '&.active': {
          '&:before': {
            backgroundColor: props.color,
          },
        },
      },

      '& svg': {
        width: 'auto',
        height: '1em',
        fill: props.color,
      },
    },

    '& .transport': {
      display: 'flex',
      alignItems: 'flex-start',

      '& > span': {
        width: '100%',
        display: 'block',
        borderTop: `1px solid ${colors.blueMedium}`,
        textAlign: 'center',
        padding: '1em 0 0 0',

        '&.active': {
          borderTopColor: props.color,

          '& svg': {
            fill: props.color,
          },
        },
      },

      '& svg': {
        width: 'auto',
        height: '1em',
        fill: colors.grayMedium,
      },
    },
  }),
}))
