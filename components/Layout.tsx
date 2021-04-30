import React, { FC, memo } from 'react'
import { AppBar } from '@material-ui/core'
import Header from './Header'

import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../theme'
import { GLUp } from './Common/GLUp'
import dynamic from 'next/dynamic'

const FooterDyanmic = dynamic(() => import('./Footer'), {
  ssr: false,
})

const Layout: FC = memo(({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.layout}>
      <AppBar position="sticky" color={'inherit'} style={{ overflow: 'hidden' }}>
        <Header />
      </AppBar>
      {children}
      <FooterDyanmic />
      <GLUp />
    </div>
  )
})

export default Layout
Layout.displayName = 'Layout'
const useStyles = makeStyles(() => ({
  layout: {
    backgroundColor: colors.blueLight,
  },
}))
