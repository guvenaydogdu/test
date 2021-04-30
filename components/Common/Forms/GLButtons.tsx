import React, { FC, ReactElement } from 'react'
import { makeStyles, Theme, Button } from '@material-ui/core'

interface StyleProps {
  width?: string
  shadow?: boolean
  bgColor?: string
  bgColorHover?: string
  textColor?: string
  textColorHover?: string
  borderColor?: string
  borderColorHover?: string
  iconSize?: string
}

interface IGLButtonIconProps {
  width?: string
  shadow?: boolean
  bgColor?: string
  bgColorHover?: string
  borderColor?: string
  borderColorHover?: string
  text: string
  textColor?: string
  textColorHover?: string
  iconSize?: string
  disabled?: boolean
  startIcon?: ReactElement
  endIcon?: ReactElement
  onClick?: () => void
  type?: 'submit' | 'reset' | 'button'
}

// interface IGLButtonProps {
//     bgColor?: string
//     bgColorHover?: string
//     text: string
//     textColor?: string
//     textColorHover?: string
//     borderColor?: string
//     borderColorHover?: string
// }

// export const GLButton: FC<IGLButtonProps> = ({ bgColor, bgColorHover, text, textColor, textColorHover }) => {
//     const classes = useStyles({ bgColor, bgColorHover, textColor, textColorHover });
//     return (
//         <Button variant="contained" className={`${classes.btn}  ${classes.GLDefaultButton}`}>{text}</Button>
//     )
// }

// export const GLButtonText: FC<IGLButtonProps> = ({ text, textColor, textColorHover }) => {
//     const classes = useStyles({ textColor, textColorHover });
//     return (
//         <Button className={`${classes.btn} ${classes.GLButtonText}`}>{text}</Button>
//     )
// }

// export const GLButtonOutlined: FC<IGLButtonProps> = ({ borderColor, borderColorHover, text }) => {
//     const classes = useStyles({ borderColor, borderColorHover });
//     return (
//         <Button variant="outlined" className={`${classes.btn}  ${classes.GLButtonOutlined}`}>{text}</Button>
//     )
// }

export const GLButton: FC<IGLButtonIconProps> = ({
  width = '100%',
  shadow = true,
  bgColor,
  bgColorHover,
  borderColor,
  borderColorHover,
  text,
  textColor,
  textColorHover,
  iconSize,
  startIcon,
  endIcon,
  type,
  disabled,
  onClick,
}) => {
  const classes = useStyles({
    width,
    shadow,
    bgColor,
    bgColorHover,
    borderColor,
    borderColorHover,
    textColor,
    textColorHover,
    iconSize,
  })
  return (
    <Button
      className={`${classes.btn} ${classes.GLButtonIcon} ${shadow ? '' : classes.boxShadow}`}
      type={type}
      variant="contained"
      startIcon={startIcon && startIcon}
      endIcon={endIcon && endIcon}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="button-text">{text}</span>
    </Button>
  )
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  btn: {
    display: 'flex',
    width: '100%',
    borderRadius: '10px',
    padding: '16px',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '16.44px',
  },
  boxShadow: () => ({
    boxShadow: 'none',

    '&:hover': {
      boxShadow: 'none',
    },
  }),
  GLButtonIcon: (props) => ({
    width: props.width,
    color: props.textColor,
    border: `1px solid ${props.borderColor}`,
    backgroundColor: props.bgColor,

    '&:hover': {
      color: props.textColorHover,
      borderColor: props.borderColorHover,
      backgroundColor: props.bgColorHover,
    },

    '& .button-text': {
      width: '100%',
    },

    '& .MuiButton-label': {
      textTransform: 'none',
    },

    '& svg': {
      width: props.iconSize,
      height: props.iconSize,
      fill: props.textColor,
    },
  }),
  // GLDefaultButton: (props) => ({
  //     color: props.textColor,
  //     backgroundColor: props.bgColor,

  //     '&:hover': {
  //         color: props.textColorHover,
  //         backgroundColor: props.bgColorHover,
  //     },

  //     '& .MuiButton-label': {
  //         textTransform: 'none',
  //     },
  // }),
  // GLButtonText: (props) => ({
  //     color: props.textColor,

  //     '&:hover': {
  //         color: props.textColorHover,
  //     },

  //     '& .MuiButton-label': {
  //         textTransform: 'none',
  //     },
  // }),
  // GLButtonOutlined: (props) => ({
  //     color: props.borderColor,
  //     borderColor: props.borderColor,

  //     '&:hover': {
  //         color: props.borderColorHover,
  //         borderColor: props.borderColorHover,
  //     },

  //     '& .MuiButton-label': {
  //         textTransform: 'none',
  //     },
  // }),
}))
