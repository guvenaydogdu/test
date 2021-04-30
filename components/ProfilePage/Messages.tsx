import React, { FC, useState } from 'react'
import {
  Box,
  Container,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core'
import makeStyles from '@material-ui/styles/makeStyles'
import { colors } from '../../theme'
import { GLTitleLine } from '../Common/GLTitleLine'
import { GLSearchBarLine } from '../Common/Forms/GLSearchBarLine'
import {
  GLIconDotsMore,
  GLIconLetter,
  GLIconRefresh,
  GLIconSearch,
  GLIconStar,
  GLIconStar2,
  GLIconTrash,
} from '../Common/GLIcons'
import { GLCheckBox } from '../Common/Forms/GLCheckBox'
import { GLPagination } from '../Common/GLPagination'
import Link from 'next/link'

export const Messages: FC = () => {
  const classes = useStyles()

  const [checkMessage, setCheckMessage] = useState<boolean>(false)
  const onChangeChecked = () => {
    setCheckMessage((prev) => !prev)
    setAnchorEl(null)
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Container className={classes.contentContainer}>
        <GLTitleLine
          title="Mesajlarım"
          message={
            <Box className={classes.messageTitle}>
              <span>Mesajınız Başarıyla Silinmiştir!</span>{' '}
              <Link href="/profile/messages">Geri Almak İçin Tıklayın</Link>
            </Box>
          }
        />
        <Box className={classes.actionBar}>
          <Box className={classes.actions}>
            <Box className={classes.messageMenu} aria-controls="message-menu" onClick={handleClick}>
              <GLCheckBox
                value={checkMessage}
                onChange={() => {
                  console.log('hello')
                }}
              />
            </Box>
            <Menu
              id="message-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={onChangeChecked}>Tümünü Seç</MenuItem>
              <MenuItem onClick={handleClose}>Tümünü Okundu Olarak İşaretle</MenuItem>
              <MenuItem onClick={handleClose}>Okundu Olarak İşaretle</MenuItem>
              <MenuItem onClick={handleClose}>Okunmadı Olarak İşaretle</MenuItem>
              <MenuItem onClick={handleClose}>Önemli Postalara Ekle</MenuItem>
              <MenuItem onClick={handleClose}>Yıldız Ekle</MenuItem>
              <MenuItem onClick={handleClose}>Seçilenleri Sil</MenuItem>
              <MenuItem onClick={handleClose}>Sil</MenuItem>
            </Menu>
            <IconButton>
              <GLIconRefresh />
            </IconButton>
            <Box className={classes.actionMore}>
              <IconButton>
                <GLIconTrash />
              </IconButton>
              <IconButton>
                <GLIconLetter />
              </IconButton>
              <IconButton>
                <GLIconRefresh />
              </IconButton>
              <IconButton aria-controls="message-menu" onClick={handleClick}>
                <GLIconDotsMore />
              </IconButton>
            </Box>
          </Box>
          <GLSearchBarLine
            placeholder="Ne aramıştınız?"
            startIcon={<GLIconSearch color={colors.grayMedium} />}
          />
        </Box>
      </Container>

      <TableContainer component={Paper} className={classes.tableMassage}>
        <Table>
          <TableRow className="read">
            <TableCell align="center">
              <IconButton>
                <GLIconStar color={colors.grayMedium} />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <GLCheckBox value={checkMessage} onChange={onChangeChecked} />
            </TableCell>
            <TableCell className="demandId">
              <span>ID: 2345678</span>
            </TableCell>
            <TableCell className="email">
              <Link href="mailto:sea@shipeedy.com">sea@shipeedy.com</Link>
            </TableCell>
            <TableCell className="text">
              <p>Sayın Buğra Hadimoğlu; İlgili Taleb...</p>
            </TableCell>
            <TableCell className="time" align="center">
              {checkMessage === false ? (
                <span>13:50</span>
              ) : (
                <Box>
                  <IconButton>
                    <GLIconTrash />
                  </IconButton>
                  <IconButton>
                    <GLIconLetter />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
          <TableRow className="unRead">
            <TableCell align="center">
              <IconButton>
                <GLIconStar color={colors.sea} />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <GLCheckBox value={checkMessage} onChange={onChangeChecked} />
            </TableCell>
            <TableCell className="demandId">
              <span>ID: 2345678</span>
            </TableCell>
            <TableCell className="email">
              <Link href="mailto:sea@shipeedy.com">sea@shipeedy.com</Link>
            </TableCell>
            <TableCell className="text">
              <p>Sayın Buğra Hadimoğlu; İlgili Taleb...</p>
            </TableCell>
            <TableCell className="time" align="center">
              {checkMessage === false ? (
                <span>13:50</span>
              ) : (
                <Box>
                  <IconButton>
                    <GLIconTrash />
                  </IconButton>
                  <IconButton>
                    <GLIconLetter />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
          <TableRow className="unRead">
            <TableCell align="center">
              <IconButton>
                <GLIconStar2 color={colors.sea} />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <GLCheckBox value={checkMessage} onChange={onChangeChecked} />
            </TableCell>
            <TableCell className="demandId">
              <span>ID: 2345678</span>
            </TableCell>
            <TableCell className="email">
              <Link href="mailto:sea@shipeedy.com">sea@shipeedy.com</Link>
            </TableCell>
            <TableCell className="text">
              <p>Sayın Buğra Hadimoğlu; İlgili Taleb...</p>
            </TableCell>
            <TableCell className="time" align="center">
              {checkMessage === false ? (
                <span>13:50</span>
              ) : (
                <Box>
                  <IconButton>
                    <GLIconTrash />
                  </IconButton>
                  <IconButton>
                    <GLIconLetter />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
          <TableRow className="read">
            <TableCell align="center">
              <IconButton>
                <GLIconStar2 color={colors.grayMedium} />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <GLCheckBox value={checkMessage} onChange={onChangeChecked} />
            </TableCell>
            <TableCell className="demandId">
              <span>ID: 2345678</span>
            </TableCell>
            <TableCell className="email">
              <Link href="mailto:sea@shipeedy.com">sea@shipeedy.com</Link>
            </TableCell>
            <TableCell className="text">
              <p>Sayın Buğra Hadimoğlu; İlgili Taleb...</p>
            </TableCell>
            <TableCell className="time" align="center">
              {checkMessage === false ? (
                <span>13:50</span>
              ) : (
                <Box>
                  <IconButton>
                    <GLIconTrash />
                  </IconButton>
                  <IconButton>
                    <GLIconLetter />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
          <TableRow className="read">
            <TableCell align="center">
              <IconButton>
                <GLIconStar2 color={colors.grayMedium} />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <GLCheckBox value={checkMessage} onChange={onChangeChecked} />
            </TableCell>
            <TableCell className="demandId">
              <span>ID: 2345678</span>
            </TableCell>
            <TableCell className="email">
              <Link href="mailto:sea@shipeedy.com">sea@shipeedy.com</Link>
            </TableCell>
            <TableCell className="text">
              <p>Sayın Buğra Hadimoğlu; İlgili Taleb...</p>
            </TableCell>
            <TableCell className="time" align="center">
              {checkMessage === false ? (
                <span>13:50</span>
              ) : (
                <Box>
                  <IconButton>
                    <GLIconTrash />
                  </IconButton>
                  <IconButton>
                    <GLIconLetter />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
          <TableRow className="read">
            <TableCell align="center">
              <IconButton>
                <GLIconStar2 color={colors.grayMedium} />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <GLCheckBox value={checkMessage} onChange={onChangeChecked} />
            </TableCell>
            <TableCell className="demandId">
              <span>ID: 2345678</span>
            </TableCell>
            <TableCell className="email">
              <Link href="mailto:sea@shipeedy.com">sea@shipeedy.com</Link>
            </TableCell>
            <TableCell className="text">
              <p>Sayın Buğra Hadimoğlu; İlgili Taleb...</p>
            </TableCell>
            <TableCell className="time" align="center">
              {checkMessage === false ? (
                <span>13:50</span>
              ) : (
                <Box>
                  <IconButton>
                    <GLIconTrash />
                  </IconButton>
                  <IconButton>
                    <GLIconLetter />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
          <TableRow className="read">
            <TableCell align="center">
              <IconButton>
                <GLIconStar2 color={colors.grayMedium} />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <GLCheckBox value={checkMessage} onChange={onChangeChecked} />
            </TableCell>
            <TableCell className="demandId">
              <span>ID: 2345678</span>
            </TableCell>
            <TableCell className="email">
              <Link href="mailto:sea@shipeedy.com">sea@shipeedy.com</Link>
            </TableCell>
            <TableCell className="text">
              <p>Sayın Buğra Hadimoğlu; İlgili Taleb...</p>
            </TableCell>
            <TableCell className="time" align="center">
              {checkMessage === false ? (
                <span>13:50</span>
              ) : (
                <Box>
                  <IconButton>
                    <GLIconTrash />
                  </IconButton>
                  <IconButton>
                    <GLIconLetter />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
          <TableRow className="read">
            <TableCell align="center">
              <IconButton>
                <GLIconStar2 color={colors.grayMedium} />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <GLCheckBox value={checkMessage} onChange={onChangeChecked} />
            </TableCell>
            <TableCell className="demandId">
              <span>ID: 2345678</span>
            </TableCell>
            <TableCell className="email">
              <Link href="mailto:sea@shipeedy.com">sea@shipeedy.com</Link>
            </TableCell>
            <TableCell className="text">
              <p>Sayın Buğra Hadimoğlu; İlgili Taleb...</p>
            </TableCell>
            <TableCell className="time" align="center">
              {checkMessage === false ? (
                <span>13:50</span>
              ) : (
                <Box>
                  <IconButton>
                    <GLIconTrash />
                  </IconButton>
                  <IconButton>
                    <GLIconLetter />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
          <TableRow className="read">
            <TableCell align="center">
              <IconButton>
                <GLIconStar2 color={colors.grayMedium} />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <GLCheckBox value={checkMessage} onChange={onChangeChecked} />
            </TableCell>
            <TableCell className="demandId">
              <span>ID: 2345678</span>
            </TableCell>
            <TableCell className="email">
              <Link href="mailto:sea@shipeedy.com">sea@shipeedy.com</Link>
            </TableCell>
            <TableCell className="text">
              <p>Sayın Buğra Hadimoğlu; İlgili Taleb...</p>
            </TableCell>
            <TableCell className="time" align="center">
              {checkMessage === false ? (
                <span>13:50</span>
              ) : (
                <Box>
                  <IconButton>
                    <GLIconTrash />
                  </IconButton>
                  <IconButton>
                    <GLIconLetter />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
          <TableRow className="read">
            <TableCell align="center">
              <IconButton>
                <GLIconStar2 color={colors.grayMedium} />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <GLCheckBox value={checkMessage} onChange={onChangeChecked} />
            </TableCell>
            <TableCell className="demandId">
              <span>ID: 2345678</span>
            </TableCell>
            <TableCell className="email">
              <Link href="mailto:sea@shipeedy.com">sea@shipeedy.com</Link>
            </TableCell>
            <TableCell className="text">
              <p>Sayın Buğra Hadimoğlu; İlgili Taleb...</p>
            </TableCell>
            <TableCell className="time" align="center">
              {checkMessage === false ? (
                <span>13:50</span>
              ) : (
                <Box>
                  <IconButton>
                    <GLIconTrash />
                  </IconButton>
                  <IconButton>
                    <GLIconLetter />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <Box>
        <GLPagination totalItemCount={20} handlePageNumber={() => 2} pageSize={20} />
      </Box>
    </>
  )
}

const useStyles = makeStyles(() => ({
  contentContainer: {
    padding: '32px 65px 0 65px',

    '& p[class*="title"]': {
      margin: '0 0 14px 0',
    },
  },
  messageTitle: {
    '& a': {
      color: colors.air,
    },
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',

    '& > .MuiIconButton-root': {
      padding: '6px',
      marginLeft: '12px',

      '& svg': {
        width: '18px',
        fill: colors.grayMedium,
      },

      '&:hover': {
        '& svg': {
          fill: colors.sea,
        },
      },
    },
  },
  actionMore: {
    borderLeft: `1px solid ${colors.grayMedium}`,
    marginLeft: '12px',

    '& .MuiIconButton-root': {
      padding: '6px',
      marginLeft: '12px',

      '& svg': {
        width: '18px',
        fill: colors.grayMedium,
      },

      '&:hover': {
        '& svg': {
          fill: colors.sea,
        },
      },
    },
  },
  messageMenu: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',

    '&:after': {
      content: '""',
      width: 0,
      height: 0,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: `5px solid ${colors.grayMedium}`,
    },
  },
  tableMassage: {
    boxShadow: 'none',
    marginBottom: '23px',

    '& .MuiTable-root': {
      '& .MuiTableRow-root': {
        padding: '0 20px',

        '& .MuiTableCell-root': {
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '16px',
          fontFeatureSettings: "'pnum' on, 'lnum' on",
          borderTop: `1px solid ${colors.blueLight}`,
          borderBottom: `1px solid ${colors.blueLight}`,
          padding: '1px 10px 2px 10px',

          '& .MuiIconButton-root': {
            padding: '6px',
          },

          '& svg': {
            width: '18px',
          },

          '& [class*="formCheckBox"]': {
            '& svg': {
              width: '24px',
            },
          },

          '&.demandId': {
            cursor: 'pointer',

            '& span': {
              textDecorationLine: 'underline',
            },
          },

          '&.text': {
            fontWeight: 'normal',
            maxWidth: '250px',
            overflow: 'hidden',
          },

          '&.email': {
            '& a': {
              textDecoration: 'none',
              color: 'inherit',
            },
          },

          '&.time': {
            fontSize: '12px',

            '& .MuiBox-root': {
              borderLeft: `1px solid ${colors.grayMedium}`,

              '& .MuiIconButton-root': {
                '& + .MuiIconButton-root': {
                  marginLeft: '12px',
                },

                '& svg': {
                  fill: colors.grayMedium,
                },

                '&:hover': {
                  '& svg': {
                    fill: colors.sea,
                  },
                },
              },
            },
          },

          '&:last-child': {
            width: '140px',
          },
        },

        '&.read': {
          backgroundColor: colors.blueLight,

          '& .MuiTableCell-root': {
            color: colors.grayMedium,

            '& [class*="customCheckBox"]': {
              fill: colors.grayMedium,
            },
          },
        },

        '&.unRead': {
          '& .MuiTableCell-root': {
            '& [class*="customCheckBox"]': {
              '& svg': {
                fill: colors.sea,
              },
            },

            '&.demandId': {
              color: colors.sea,
            },
          },
        },
      },
    },
  },
}))
