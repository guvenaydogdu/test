import React, { FC, useState, useRef } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import Image from 'next/image'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { colors } from '../../theme'
import 'swiper/swiper.min.css'
import { GLIconPrev, GLIconNext } from './GLIcons'

SwiperCore.use([Navigation])

interface IGLGallerySliderProps {
  galleryItemIndex?: number
  data: string[]
}

export const GLGallerySlider: FC<IGLGallerySliderProps> = ({ galleryItemIndex, data }) => {
  const classes = useStyles()
  const nextRef = useRef<any>(null)
  const prevRef = useRef<any>(null)

  const [slideIndex] = useState<number>(galleryItemIndex ? galleryItemIndex : 0)

  // const handleChangeSlide = (index: number) => {
  //     if (index == -1 && slideIndex == 0) setSlideIndex(data.length - 1)
  //     else if (index == 1 && slideIndex == (data.length - 1)) setSlideIndex(0)
  //     else setSlideIndex(index)
  // }

  return (
    <Box className={classes.swiperContainer}>
      <span className={classes.swiperPrev} ref={prevRef}>
        <GLIconPrev />
      </span>

      <span className={classes.swiperNext} ref={nextRef}>
        <GLIconNext />
      </span>

      <Swiper
        className={classes.gallerySlider}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.prevEl = prevRef.current
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.nextEl = nextRef.current
          swiper.navigation.update()
        }}
        centeredSlides={true}
        initialSlide={slideIndex}
      >
        {data.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <Image src={item} alt="gallery" width="730px" height="536px" />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  swiperContainer: {
    position: 'relative',
    padding: '0 88px',
  },
  gallerySlider: {
    padding: '0',
    borderRadius: '10px',

    '& .swiper-wrapper': {
      padding: '0',

      '& .swiper-slide': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '& img': {
          width: '100%',
          maxHeight: '536px',
          objectFit: 'cover',
        },
      },
    },
  },
  swiperPrev: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '0',
    top: '50%',
    zIndex: 20,
    width: '48px',
    height: '48px',
    cursor: 'pointer',

    '& svg': {
      width: '16px',
      height: '28px',
      fill: colors.white,
    },
  },
  swiperNext: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '0',
    top: '50%',
    zIndex: 20,
    width: '48px',
    height: '48px',
    cursor: 'pointer',

    '& svg': {
      width: '16px',
      height: '28px',
      fill: colors.white,
    },
  },
}))
