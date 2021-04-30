import React, { FC, ReactElement } from 'react'
import { Button, makeStyles, Theme } from '@material-ui/core'
import { colors } from '../../theme'

interface IStyleProps {
  buttonColor: string
  buttonHoverColor: string
  textColor: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
}
interface IGLButtonProps {
  text: string
  onClick?: () => void
  buttonColor: string
  buttonHoverColor: string
  textColor: string
  type: 'submit' | 'reset' | 'button'
  variant: 'contained' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  endIcon?: ReactElement
  startIcon?: ReactElement
  ariaLabel?: string
}

export const GLButton: FC<IGLButtonProps> = ({
  text,
  buttonColor,
  buttonHoverColor,
  textColor,
  onClick,
  type,
  endIcon,
  variant,
  ariaLabel,
  size,
}) => {
  const classes = useStyles({ buttonColor, buttonHoverColor, textColor, size })

  return (
    <Button
      aria-label={ariaLabel ? ariaLabel : ''}
      onClick={onClick}
      endIcon={endIcon}
      type={type}
      variant={variant}
      className={`${classes.customButton} ${classes.btn}`}
    >
      <span className="text">{text}</span>
    </Button>
  )
}

const useStyles = makeStyles<Theme, IStyleProps>(() => ({
  customButton: (props) => ({
    backgroundColor: props.buttonColor,
    border: `1px solid ${props.textColor}`,
    borderRadius: '10px',

    '&:hover': {
      backgroundColor: props.buttonHoverColor,

      '& .MuiButton-label': {
        color: colors.white,
      },
    },

    '& .MuiButton-label': {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '16px',
      textAlign: 'center',
      color: props.textColor,
      textTransform: 'none',
    },
  }),
  btn: (props) => {
    if (props.size == 'small') {
      return {
        border: 'none',
      }
    } else if (props.size == 'medium') {
      return {
        border: 'none',
      }
    } else if (props.size == 'large') {
      return {
        width: '100%',
        maxWidth: '160px',
        height: '48px',
      }
    } else if (props.size == 'xlarge') {
      return {
        border: 'none',
      }
    } else {
      return {
        border: 'none',
      }
    }
  },
}))
