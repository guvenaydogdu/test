import { FC } from 'react'
import { emphasize, withStyles, makeStyles } from '@material-ui/core/styles'
import { Breadcrumbs, Chip } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles((theme) => ({
  BreadCrumbWrapper: {
    marginBottom: theme.spacing(3),
  },
}))

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip)

const GLBreadCrumb: FC = () => {
  const classes = useStyles()

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.BreadCrumbWrapper}>
      <StyledBreadcrumb label="Dashboard" icon={<HomeIcon fontSize="small" />} />
      <StyledBreadcrumb label="Duyurular" />
      <StyledBreadcrumb label="Kategoriler" />
    </Breadcrumbs>
  )
}

export default GLBreadCrumb
