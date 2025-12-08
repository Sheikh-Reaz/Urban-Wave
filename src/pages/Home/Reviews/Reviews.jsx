import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);

  return (
    <div>
      <div >
        <h3 className="text-5xl text-center">Our Customer Reviews</h3>
      </div>

      <Swiper
      loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'3'}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 100,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
