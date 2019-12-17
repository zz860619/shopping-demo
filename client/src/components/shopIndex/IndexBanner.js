import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css'

import banner1 from '../../assets/image/banner-1.jpg'
import banner2 from '../../assets/image/banner-2.jpg'
import banner3 from '../../assets/image/banner-3.jpg'


const Banner = () =>{

    const params = {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
      return (
        <Swiper {...params}>
          <div style={{height:"500px",background:`url(${banner2})`,backgroundPosition:"50%",backgroundSize:"cover"}}><div className="banner-border"></div><div className="banner-title"><span>Kubo's Shop</span></div></div>
          <div style={{height:"500px",background:`url(${banner1})`,backgroundPosition:"50%",backgroundSize:"cover"}}><div className="banner-border"></div><div className="banner-title"><span>簡單X時尚</span></div></div>
          <div style={{height:"500px",background:`url(${banner3})`,backgroundPosition:"50%",backgroundSize:"cover"}}><div className="banner-border"></div><div className="banner-title"><span>2019冬季特賣</span></div></div>
        </Swiper>
      )
};





export default Banner;