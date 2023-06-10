import './styles.css'
import { register } from 'swiper/element/bundle';
import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import s from './styles.module.css';
import { ReactComponent as ArrowIcon } from './img/arrow.svg';

register();

function Carousel({ items, perView, component: Component, virtual = false, title }) {
  const [data, setData] = useState([]) //стейт для хранения виртуальных карточек
  const swiperElRef = useRef(null);

  useEffect(() => {

    const mainOptionSlider = {
      slidesPerView: perView,
      /* centeredSlides: true, */
      spaceBetween: 30,
      navigation: {
        nextEl: '.next', //селектор кнопки
        prevEl: '.prev' //селектор кнопки
      }
    }

    if (virtual) {
      Object.assign(swiperElRef.current, {
        ...mainOptionSlider,
        /*       pagination: {
                type: 'bullets', //'fraction'
              }, */
        virtual: {
          slides: [...items],
          renderExternal: function (dataVirtual) { //вызывается когда происходит смещение
            setData(dataVirtual) //в стейт слайдера попадает часть карточек
          },
          addSlidesAfter: 3,
          addSlidesBefore: 3,
        },
      });


    } else {
      Object.assign(swiperElRef.current, {
        ...mainOptionSlider,

      });

    }
    items.length !== 0 && swiperElRef.current.initialize();
  }, [items]);

  return (
    <div>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
        <div className={s.buttonWrapper}>
          <button className={classNames('prev', s.button)} aria-label='Прокрутить слайдер назад'>
            <span className='visually-hidden'>Назад</span>
            <ArrowIcon style={{ transform:  "rotate(180deg)" }} />
          </button>
          <button className={classNames('next', s.button)} aria-label='Прокрутить слайдер вперед'>
            <ArrowIcon />
            <span className='visually-hidden'>Вперед</span>
          </button>
        </div>

      </div>


      {virtual

        ?
        <swiper-container init='false' ref={swiperElRef}>
          {data?.slides?.map((dataItem, index) => (
            <swiper-slide key={index} style={{ left: `${data.offset}px` }}><Component {...dataItem} /></swiper-slide>
          ))}
        </swiper-container>

        : <swiper-container
          ref={swiperElRef}
          slides-per-view={perView}
          /*           navigation="true"
                    pagination="true"
                    pagination-dynamic-bullets='true' */
          init='false'
        >
          {items.map((dataItem, index) => <swiper-slide key={index}><Component {...dataItem} /></swiper-slide>)}

        </swiper-container>}
    </div>


  );
}

export default Carousel;

