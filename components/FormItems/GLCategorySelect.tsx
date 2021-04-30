import { Box, Grid } from '@material-ui/core'
import React, { FC, memo, useEffect, useState } from 'react'
import { GLButton } from '../Common/Forms/GLButtons'
import { GLInput } from '../Common/Forms/GLInput'
import { GLModal } from '../Common/GLModal'
import { GLTitleLine } from '../Common/GLTitleLine'
import { GLSelect } from '../Common/Forms/GLSelect'
import { colors } from '../../theme'
import { GLIconNext } from '../../components/Common/GLIcons'
import Requests from '../../requests'
import { ICategoriesResponse, ICategoryPager } from '../../interfaces/Category'

const defaultPager: ICategoryPager = {
  pageNumber: 1,
  pageSize: 100,
  sortDescending: true,
  parentCategoryId: null,
}

interface IGLCategorySelectProps {
  onChange?: any
  error?: boolean
  categoryName?: string | null
}

export const GLCategorySelect: FC<IGLCategorySelectProps> = memo(
  ({ onChange, error, categoryName }) => {
    const requests = Requests()

    const [statusModalProduct, setStatusModalProduct] = useState<boolean>(false)
    const [mainCategories, setMainCategories] = useState<ICategoriesResponse | null>(null)
    const [secondCategories, setSecondCategories] = useState<ICategoriesResponse | null>(null)
    const [thirdCategories, setThirdCategories] = useState<ICategoriesResponse | null>(null)
    const [mainCategoryId, setMainCategoryId] = useState<number | null>(null)
    const [secondCategoryId, setSecondCategoryId] = useState<number | null>(null)
    const [thirdCategoryId, setThirdCategoryId] = useState<number | null>(null)

    const handleMainCategoryId = (id: number) => {
      setMainCategoryId(id)
      setSecondCategoryId(null)
      setThirdCategoryId(null)
    }

    const handleSecondCategoryId = (id: number) => {
      setSecondCategoryId(id)
      setThirdCategoryId(null)
    }
    const handleThirdCategoryId = (id: number) => {
      setThirdCategoryId(id)
    }
    const handleModalChangeProduct = () => {
      if (thirdCategoryId) {
        onChange(thirdCategoryId)
      }
      setStatusModalProduct((prev) => !prev)
    }

    const getData = () => {
      if (secondCategoryId) {
        defaultPager.parentCategoryId = secondCategoryId
      } else if (mainCategoryId) {
        defaultPager.parentCategoryId = mainCategoryId
      }

      requests.CategoryRequest.getList(defaultPager)
        .then((res) => {
          if (secondCategoryId) {
            setThirdCategories(res)
          } else if (mainCategoryId) {
            setSecondCategories(res)
          } else {
            setMainCategories(res)
          }
        })
        .catch((err) => console.log(err))
    }
    useEffect(() => {
      if (statusModalProduct) {
        getData()
      }
    }, [mainCategoryId, secondCategoryId, statusModalProduct])

    const getValue = () => {
      let textVal = mainCategoryId ? '' : categoryName

      if (mainCategoryId && mainCategories) {
        const cat = mainCategories.data.find((x) => x.id == mainCategoryId)
        if (cat) {
          textVal += cat['nameTR']
        }
      }
      if (secondCategoryId && secondCategories) {
        const cat = secondCategories.data.find((x) => x.id == secondCategoryId)
        if (cat) {
          textVal = textVal + ',' + cat['nameTR']
        }
      }
      if (thirdCategoryId && thirdCategories) {
        const cat = thirdCategories.data.find((x) => x.id == thirdCategoryId)
        if (cat) {
          textVal = textVal + ',' + cat['nameTR']
        }
      }

      return textVal
    }
    return (
      <>
        <GLInput
          disabled
          label="Ürün Kategorisi Seçin"
          value={getValue()}
          onClick={handleModalChangeProduct}
          error={error}
        />
        <GLModal
          maxWidth="400px"
          statusModal={statusModalProduct}
          handleModalChange={handleModalChangeProduct}
        >
          <Box>
            <GLTitleLine title="Ürün Kategorisi Seçin" />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <GLSelect
                  label="Ana Kategori"
                  data={mainCategories?.data.map((cat) => {
                    return { id: cat.id, label: cat.nameTR }
                  })}
                  onChange={handleMainCategoryId}
                  value={mainCategoryId}
                />
              </Grid>
              <Grid item xs={12}>
                {secondCategories && (
                  <GLSelect
                    label="İkincil Kategori"
                    data={secondCategories?.data.map((cat) => {
                      return { id: cat.id, label: cat.nameTR }
                    })}
                    onChange={handleSecondCategoryId}
                    value={secondCategoryId}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {thirdCategories && (
                  <GLSelect
                    label="Üçüncül Kategori"
                    data={thirdCategories?.data.map((cat) => {
                      return { id: cat.id, label: cat.nameTR }
                    })}
                    onChange={handleThirdCategoryId}
                    value={thirdCategoryId}
                  />
                )}
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <GLButton
                  text="Devam Et"
                  textColor={colors.white}
                  textColorHover={colors.white}
                  bgColor={colors.sea}
                  bgColorHover={colors.seaHover}
                  iconSize="8px"
                  endIcon={<GLIconNext />}
                  onClick={handleModalChangeProduct}
                />
              </Grid>
            </Grid>
          </Box>
        </GLModal>
      </>
    )
  }
)

GLCategorySelect.displayName = 'GLCategorySelect'
