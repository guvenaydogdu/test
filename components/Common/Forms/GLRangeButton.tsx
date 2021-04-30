import { FC, useState } from 'react'
import { Theme, makeStyles, IconButton } from '@material-ui/core'
import { GLIconMinus, GLIconPlus } from './../GLIcons'
import { colors } from '../../../theme'

interface StyleProps {
  labelPosition?: string
  color?: string
}

interface IGLRangeButton {
  label?: string
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'large' | 'medium'
  color?: string
  value: number
  onChange: (...event: any[]) => void
  error?: boolean
}

export const GLRangeButton: FC<IGLRangeButton> = ({
  label,
  labelPosition = 'left',
  size,
  color = colors.sea,
  value,
  error,
  onChange,
}) => {
  const classes = useStyles({ labelPosition, color })

  const [rangeCount, setRangeCount] = useState<number>(value ? value : 0)

  const handleClickPlus = () => {
    const newVal = rangeCount + 1
    setRangeCount(newVal)
    onChange(newVal)
  }

  const handleClickMinus = () => {
    if (rangeCount == 0) return
    const newVal = rangeCount - 1
    setRangeCount(newVal)
    onChange(newVal)
  }

  return (
    <div
      className={`
                ${classes.range}
                ${error ? 'error' : ''}
                ${size == 'large' ? classes.sizeLarge : ''}
                ${labelPosition == 'top' ? classes.labelTop : ''}
                ${labelPosition == 'right' ? classes.labelRight : ''}
                ${labelPosition == 'bottom' ? classes.labelBottom : ''}
                ${labelPosition == 'left' ? classes.labelLeft : ''}
            `}
    >
      {label && <span>{label}</span>}
      <div className={classes.rangeContent}>
        <IconButton
          aria-label="Range Minus"
          className={classes.btnMinus}
          onClick={handleClickMinus}
        >
          <GLIconMinus />
        </IconButton>
        <span className={classes.rangeBox}>{value ? value : 0}</span>
        <IconButton aria-label="Range Plus" className={classes.btnPlus} onClick={handleClickPlus}>
          <GLIconPlus />
        </IconButton>
      </div>
    </div>
  )
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  range: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& > span': {
      fontFamily: `'Poppins', sans-serif`,
      fontSize: '14px',
      lineHeight: '186%',
      color: colors.grayMedium,
    },

    '&.error': {
      '& [class*="rangeBox"]': {
        borderColor: colors.danger,
      },

      '& [class*="btnPlus"], & [class*="btnMinus"]': {
        backgroundColor: colors.danger,
      },
    },
  },
  rangeContent: {
    display: 'flex',
    alignItems: 'center',
  },
  btnMinus: (props) => ({
    width: '24px',
    height: '32px',
    padding: '0',
    borderRadius: '5px 0 0 5px',
    backgroundColor: colors.grayLight,

    '&:hover': {
      backgroundColor: props.color,
    },

    '& svg': {
      width: '12px',
      height: '16px',
      fill: colors.white,
    },
  }),
  btnPlus: (props) => ({
    width: '24px',
    height: '32px',
    padding: '0',
    borderRadius: '0 5px 5px 0',
    backgroundColor: colors.grayLight,

    '&:hover': {
      backgroundColor: props.color,
    },

    '& svg': {
      width: '16px',
      height: '16px',
      fill: colors.white,
    },
  }),
  rangeBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 700,
    fontFamily: `'Poppins', sans-serif`,
    width: '40px',
    height: '40px',
    backgroundColor: colors.white,
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
  labelTop: {
    alignItems: 'flex-start',
    flexDirection: 'column',

    '& > span': {
      paddingBottom: '16px',
    },
  },
  labelRight: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',

    '& > span': {
      marginLeft: '16px',
    },
  },
  labelBottom: {
    flexDirection: 'column-reverse',

    '& > span': {
      paddingTop: '16px',
    },
  },
  labelLeft: {
    alignItems: 'center',

    '& > span': {
      marginRight: '16px',
    },
  },
}))
