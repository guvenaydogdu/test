import { FC, useState } from 'react'
import { makeStyles, IconButton } from '@material-ui/core'
import { GLIconMinus, GLIconPlus } from './GLIcons'
import { colors } from '../../theme'

interface IGLRangeButton {
  label: string
  size?: 'large' | 'medium'
  onChange: any
  transportOptionId: number
  defaultValue?: number
}

export const GLRangeButton: FC<IGLRangeButton> = ({
  label,
  size,
  onChange,
  transportOptionId,
  defaultValue,
}) => {
  const classes = useStyles()

  const [rangeCount, setRangeCount] = useState<number>(defaultValue ? defaultValue : 0)

  const handleClickPlus = () => {
    const newValue = rangeCount + 1
    setRangeCount(newValue)
    onChange({
      transportOptionId,
      count: newValue,
    })
  }

  const handleClickMinus = () => {
    if (rangeCount == 0) return
    const newValue = rangeCount - 1
    setRangeCount(newValue)
    onChange({
      transportOptionId,
      count: newValue,
    })
  }

  return (
    <div className={`${classes.range} ${size == 'large' && classes.sizeLarge}`}>
      <span>{label}</span>
      <div className={classes.rangeContent}>
        <IconButton
          aria-label="Range Minus"
          className={classes.btnMinus}
          onClick={handleClickMinus}
        >
          <GLIconMinus />
        </IconButton>
        <span className={classes.rangeBox}>{rangeCount}</span>
        <IconButton aria-label="Range Minus" className={classes.btnPlus} onClick={handleClickPlus}>
          <GLIconPlus />
        </IconButton>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  range: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',

    '& > span': {
      fontFamily: `'Poppins', sans-serif`,
      fontSize: '14px',
      lineHeight: '186%',
      color: colors.grayMedium,
    },
  },
  rangeContent: {
    display: 'flex',
    alignItems: 'center',
  },
  btnMinus: {
    width: '24px',
    height: '32px',
    padding: '0',
    borderRadius: '5px 0 0 5px',
    backgroundColor: colors.grayLight,

    '&:hover': {
      backgroundColor: colors.sea,
    },

    '& svg': {
      width: '12px',
      height: '16px',
      fill: colors.white,
    },
  },
  btnPlus: {
    width: '24px',
    height: '32px',
    padding: '0',
    borderRadius: '0 5px 5px 0',
    backgroundColor: colors.grayLight,

    '&:hover': {
      backgroundColor: colors.sea,
    },

    '& svg': {
      width: '16px',
      height: '16px',
      fill: colors.white,
    },
  },
  rangeBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 700,
    fontFamily: `'Poppins', sans-serif`,
    width: '40px',
    height: '40px',
    border: `1px solid ${colors.grayLight}`,
  },
  sizeLarge: {
    '& *[class*="rangeContent"]': {
      '& *[class*="rangeBox"]': {
        width: '48px',
        height: '48px',
        backgroundColor: colors.white,
      },

      '& .MuiIconButton-root': {
        width: '28px',
        height: '38px',
      },
    },
  },
}))
