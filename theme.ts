import { createMuiTheme } from '@material-ui/core/styles'

//https://material-ui.com/components/use-media-query/
//https://material-ui.com/customization/breakpoints/
/**
 *  [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
 */

// const BODY_COLOR = "COLOR"
// spacing: [0, 4, 8, 16, 32, 64], theme.spacing(2); // = 8

export const colors = {
  white: '#FFFFFF',
  black: '#212121',
  sea: '#4489C9',
  seaRGB: '47, 95, 140',
  seaHover: '#2f5f8c',
  air: '#73c1ec', // '#59C2F0',
  airHover: '#6DB7E0',
  railway: '#AFA08A',
  railwayHover: '#A29581',
  iron: '#A3C86B',
  ironHover: '#87a756',
  blueDark2: '#3561A5',
  blueDark: '#2C394B',
  blueMedium: '#3D6680',
  blueLight: '#F2F6FA',
  grayMedium: '#C4C4C4',
  grayLight: '#EAEAEA',
  graySoft: '#E5E5E5',
  danger: '#E46D6D',
  lightSea: '#40C4F2',
  dangerHover: '#C15C5C',
  placeholder: '#b4b4b4',
}

const theme = createMuiTheme({
  spacing: 15, //theme.spacing(2)
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: colors.sea,
    },
    common: {
      black: colors.black,
    },
  },
  typography: {
    fontFamily: `'Raleway', sans-serif`,
    fontSize: 14,
    h1: {},
    button: {},
    body1: {
      fontSize: 14,
    },
    caption: {},
    subtitle1: {},
  },
  overrides: {
    MuiButton: {
      contained: {
        // backgroundColor: cyan.A400,
        '&:hover': {
          // backgroundColor: cyan.A400,
        },
      },
    },
  },
})

export default theme

// import { createMuiTheme } from '@material-ui/core/styles'
// import red from '@material-ui/core/colors/red'

// // Create a theme instance.
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//       light: "#578ad6"
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: '#fff',
//     },
//   },
// })

// export default theme
