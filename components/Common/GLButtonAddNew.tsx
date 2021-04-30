import { FC } from 'react'
import { makeStyles, Button } from '@material-ui/core'
import { colors } from '../../theme'
import { GLIconPlus } from './GLIcons'

interface IGLButtonAddNew {
  onClick: () => any
}

export const GLButtonAddNew: FC<IGLButtonAddNew> = ({ onClick }) => {
  const classes = useStyles()

  return (
    <Button
      variant="outlined"
      endIcon={<GLIconPlus />}
      className={classes.addButton}
      onClick={onClick}
    >
      Yük Ekle
    </Button>
  )
}

const useStyles = makeStyles(() => ({
  addButton: {
    borderRadius: 0,
    border: 'none',
    borderBottom: `1px solid ${colors.sea}`,
    padding: '3px 8px 15px 8px',
    minWidth: '215px',

    '& .MuiButton-label': {
      fontWeight: 800,
      fontSize: '14px',
      lineHeight: '16px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.sea,
      textTransform: 'none',
    },

    '& svg': {
      width: '16px',
      height: '16px',
      fill: colors.sea,
      marginLeft: '24px',
    },
  },
}))
