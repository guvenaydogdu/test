/* Next.js / MUI integration here: https://github.com/mui-org/material-ui/tree/master/examples/nextjs */
import App, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { parseCookies } from '../helpers'
import { AuthProvider } from '../providers/AuthProvider'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'
import { DataProvider } from '../providers/DataProvider'
import { appWithTranslation } from 'next-i18next'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import 'react-quill/dist/quill.snow.css'
import '../components/Admin/Common/editor.css'
class GlobalLoadingApp extends App<AppProps> {
  constructor(props: AppProps) {
    super(props)
  }

  static async getInitialProps({ Component, ctx }: AppContext) {
    const cookies = ctx && ctx.req ? ctx.req.headers.cookie : ''

    let parsedCookies
    if (cookies && typeof cookies == 'string') {
      parsedCookies = parseCookies(cookies)
    }

    return {
      parsedCookies,
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, parsedCookies }: any = this.props

    return (
      <AuthProvider pasedCookies={parsedCookies}>
        <DataProvider>
          <ToastContainer />
          <Head>
            <title>Shipeedy</title>
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </DataProvider>
      </AuthProvider>
    )
  }
}

export default appWithTranslation(GlobalLoadingApp)
