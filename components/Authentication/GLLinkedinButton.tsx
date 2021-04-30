import { Button } from '@material-ui/core'
import { colors } from '../../theme'
import Image from 'next/image'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'next-i18next'
import { LINKEDIN_URL } from '../../utils/linkedin'

export const GLLinkedinButton = () => {
  const classes = useStyles()

  const { t } = useTranslation()

  return (
    <a href={LINKEDIN_URL} style={{ textDecoration: 'none' }}>
      <Button
        aria-label="linkedin-logni"
        className={`${classes.btnLogInOutsource} ${classes.margin}`}
        variant="contained"
        color="primary"
        endIcon={<ChevronRightIcon />}
      >
        <span className="icon">
          <Image src="/images/icon-linkedin.svg" alt="linkedin" width="16px" height="16px" />
        </span>
        <span className="text">{t('continue_with_linkedin')}</span>
      </Button>
    </a>
  )
}
export default GLLinkedinButton
const useStyles = makeStyles(() => ({
  margin: {
    margin: '0 0 16px 0',
  },

  btnLogInOutsource: {
    width: '100%',
    border: `1px solid ${colors.grayLight}`,
    backgroundColor: 'transparent',
    color: colors.black,
    borderRadius: '10px',
    boxShadow: 'none',

    '&:hover': {
      backgroundColor: colors.grayLight,
      boxShadow: 'none',
    },

    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '34px',

      '& .icon': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      '& .text': {
        width: '100%',
        fontSize: '14px',
        lineHeight: '16.44px',
        fontWeight: '700',
        color: colors.black,
        textTransform: 'none',
        padding: '0 14px',
      },

      '& .MuiButton-endIcon': {
        color: colors.grayMedium,
      },
    },
  },
}))
