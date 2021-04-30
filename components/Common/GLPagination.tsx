import { FC, memo } from 'react'
import { usePagination } from '@material-ui/lab/Pagination'
import { makeStyles } from '@material-ui/core'
import { colors } from '../../theme'
import { GLIconArrowLeftLong, GLIconArrowRightLong } from './GLIcons'

interface IGLPaginationProps {
  totalItemCount?: number
  handlePageNumber: (pageNumber: number) => void
  pageSize: number
}

export const GLPagination: FC<IGLPaginationProps> = memo(
  ({ totalItemCount, handlePageNumber, pageSize }) => {
    const classes = useStyles()
    const totalPageNumber = Math.ceil(
      totalItemCount ? totalItemCount / pageSize : pageSize / pageSize
    )
    const { items } = usePagination({
      count: totalPageNumber,
      onChange: (_, pageNumber) => {
        handlePageNumber(pageNumber)
      },
    })

    return (
      <nav className={classes.pagination}>
        <ul>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null

            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '…'
            } else if (type === 'page') {
              children = (
                <button type="button" className={selected ? 'selected' : ''} {...item}>
                  {page}
                </button>
              )
            } else {
              if (type == 'previous') {
                if (page > 0) {
                  children = (
                    <button type="button" {...item}>
                      <GLIconArrowLeftLong />
                      {'Önceki'}
                    </button>
                  )
                }
              } else {
                if (totalPageNumber != page - 1) {
                  children = (
                    <button type="button" {...item}>
                      <GLIconArrowRightLong />
                      {'Sonraki'}
                    </button>
                  )
                }
              }
            }

            return <li key={index}>{children}</li>
          })}
        </ul>
      </nav>
    )
  }
)

const useStyles = makeStyles({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '58px',

    '& ul': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: 0,

      '& li': {
        display: 'block',
        margin: 0,
        padding: 0,

        '& button': {
          fontWeight: 800,
          fontSize: '14px',
          lineHeight: '186%',
          padding: '10px 18px',
          color: colors.grayMedium,
          backgroundColor: colors.white,
          border: `1px solid ${colors.grayLight}`,
          cursor: 'pointer',

          '&.selected': {
            color: colors.sea,
          },

          '&:focus': {
            outline: 'none',
          },
        },

        '&:first-child': {
          marginRight: '20px',

          '& button': {
            display: 'flex',
            alignItems: 'center',
            borderRadius: '10px',
            borderColor: colors.sea,
            backgroundColor: colors.sea,
            color: colors.white,

            '&[disabled]': {
              backgroundColor: 'transparent',
              color: colors.sea,

              '& svg': {
                fill: colors.sea,
              },
            },

            '& svg': {
              width: '16px',
              height: '16px',
              fill: colors.white,
              marginRight: '10px',
            },
          },
        },

        '&:last-child': {
          marginLeft: '20px',

          '& button': {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row-reverse',
            borderRadius: '10px',
            borderColor: colors.sea,
            backgroundColor: colors.sea,
            color: colors.white,

            '&[disabled]': {
              backgroundColor: 'transparent',
              color: colors.sea,

              '& svg': {
                fill: colors.sea,
              },
            },

            '& svg': {
              width: '16px',
              height: '16px',
              fill: colors.white,
              marginLeft: '10px',
            },
          },
        },

        '&:nth-child(2)': {
          '& button': {
            borderRadius: '10px 0 0 10px',
          },
        },

        '&:nth-last-child(2)': {
          '& button': {
            borderRadius: '0 10px 10px 0',
          },
        },
      },
    },
  },
})
