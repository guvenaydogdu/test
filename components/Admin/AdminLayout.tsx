import { FC, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import AdminHeader from './AdminHeader'
import AdminAside from './AdminAside'
import { Drawer, CssBaseline } from '@material-ui/core'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(4.7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(4.7) + 1,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const AdminLayout: FC = ({ children }) => {
  const classes = useStyles()

  const [openDrawer, setOpenDrawer] = useState<boolean>(true)
  const handleDrawerChange = (isStatus: boolean) => {
    setOpenDrawer(isStatus)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AdminHeader toggleDrawer={openDrawer} handleDrawerChange={handleDrawerChange} />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
      >
        <AdminAside handleDrawerChange={handleDrawerChange} />
      </Drawer>
      <main className={classes.content}>{children}</main>
      <footer>Footer</footer>
    </div>
  )
}

export default AdminLayout
