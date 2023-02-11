import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Box } from '@chakra-ui/react';

export const TutorialSwiper = () => {
  return (
    <Swiper
      modules={[Pagination]}
      style={{ width: 248, height: 460 }}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <Box height={'calc(100% - 44px)'} backgroundColor={'black'} color={'white'}>
          Slide 1
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box height={'calc(100% - 44px)'}>Slide 2</Box>
      </SwiperSlide>
    </Swiper>
  );
};
