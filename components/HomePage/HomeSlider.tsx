import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { colors } from '../../theme'
import 'swiper/swiper.min.css'
import { ISlidersResponse } from '../../interfaces/Slider'
const SLIDER_URL = process.env.PROJECT_IMAGE_BASE_URL as string
SwiperCore.use([Pagination, Autoplay])
interface IHomeSliderProps {
  data: ISlidersResponse
}

export const HomeSlider: FC<IHomeSliderProps> = ({ data }) => {
  const classes = useStyles()

  return (
    <Swiper
      className={classes.homeSlider}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      pagination={{ clickable: true }}
    >
      {data?.data.map((slider) => {
        return (
          <SwiperSlide key={slider.id}>
            <Image
              src={SLIDER_URL + slider.imagePath}
              alt="home-slider-1"
              layout="fill"
              priority={true}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

const useStyles = makeStyles(() => ({
  homeSlider: {
    height: 'calc(100vh - 300px)',
    minHeight: '300px',

    '& .swiper-slide': {
      textAlign: 'center',

      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },

    '& .swiper-pagination': {
      position: 'absolute',
      zIndex: '10',
      left: '20%',
      top: '50%',
      display: 'flex',
      flexDirection: 'column',

      '& .swiper-pagination-bullet': {
        display: 'block',
        width: '10px',
        height: '10px',
        background: colors.white,
        borderRadius: '50%',
        opacity: '0.5',
        cursor: 'pointer',

        '&.swiper-pagination-bullet-active, &:hover': {
          opacity: '1',
        },

        '& + .swiper-pagination-bullet': {
          marginTop: '20px',
        },
      },
    },
  },
}))
