import s from './styles.module.css'
import { register } from 'swiper/element/bundle';
import { useRef, useEffect } from 'react';
import { Card } from '../card';

register();

function Carousel({ items, perView }) {

  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener('progress', (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener('slidechange', (e) => {
      console.log('slide changed');
    });

    const handleClickNextButton = () => {
      swiperElRef.current?.swiper?.slideNext();
    }

    const params = {
      injectStyles: [`
      .swiper-pagination-bullet {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: #000;
        opacity: 1;
        background: rgba(0, 0, 0, 0.2);
      }

      .swiper-pagination-bullet-active {
        color: #fff;
        background: #007aff;
      }
      `],
      pagination: {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
    }

    Object.assign(swiperElRef.current, params)

    swiperElRef.current.initialize();

    /* Object.assign(swiperElRef.current, {
      slidesPerView: 3,
      spaceBeetween: 30,
      centeredSlides: true,
      paginaton: {
        type: 'fraction'
      },
      navigation: true,

    }) */
  }, []);

  return (
    <>
          <swiper-container
            ref={swiperElRef}
            slides-per-view={perView}
            navigation="true"
            pagination="true"
            pagination-dynamic-bullets='true'
            init='false'
            
          >
            {items.map((dataItem, index) => <swiper-slide key={index}><Card {...dataItem}/></swiper-slide>)}
                  
          </swiper-container>
    {/* <swiper-container init='false'></swiper-container> */}
    </>
  );
}

export default Carousel;

