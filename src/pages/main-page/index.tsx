import { Link, useLocation } from "react-router-dom";
import { ContentHeader } from "../../components/content-header";
import s from './styles.module.css';

import Hero from "../../components/hero";
import CategoryMenu from "../../components/category-menu";
import classNames from "classnames";
import Banner, { BannerSize } from "../../components/banner";
//images
import imageGift from './img/gift.png';
import imageSets from './img/set.png';
import imageMix from './img/mix.png';
import imageTurkey from './img/turkey.png';
import imageHorns from './img/horns.png';
import Carousel from "../../components/carousel";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../storage/hook";
import { Card } from "../../components/card";


function MainPage() {

    const cards = useAppSelector(state => state.products.data)

    return (
        <>
            <Hero />
            <div className={classNames("content container", s.mainPage)}>
                <CategoryMenu extraClass="home" />
                <Banner
                    size={BannerSize.big}
                    subtitle="Легкое говяжье - пластины"
                    title="Подарок за первый заказ"
                    colorBg="#FF8F27"
                    bg={imageGift}
                />
                <Carousel items={cards.slice(0, 10)} perView={4} component={Card} title={'Хиты'}/>
                <div className={s.banner_wrapper}>
                    <Banner
                        size={BannerSize.middle}
                        title="Наборы"
                        subtitle="для дрессировки"
                        colorBg="#D8A217"
                        price='от 840 ₽'
                        bg={imageSets} />
                    <Banner
                        size={BannerSize.middle}
                        title='Микс масел'
                        subtitle='пищевая здоровая натуральная добавка'
                        colorBg='#24B5BE'
                        bg={imageMix} />
                </div>
                <Carousel items={cards.slice(10, 20)} perView={4} component={Card} title={'Лакомства'}/>
                <div className={s.banner_wrapper}>
                    <Banner
                        size={BannerSize.middle}
                        title='Рога северного оленя'
                        subtitle='от 10 до 30 кг.'
                        colorBg='#9CCD55'
                        bg={imageHorns} />
                    <Banner
                        size={BannerSize.middle}
                        title='Слипы из шеи индейки'
                        subtitle='100 % натуральное'
                        colorBg='#DB6825'
                        bg={imageTurkey} />
                </div>
                <Banner
                    size={BannerSize.big}
                    subtitle="Легкое говяжье - пластины"
                    title="Подарок за первый заказ"
                    colorBg="#FF8F27"
                    bg={imageGift}
                />
                <Carousel items={cards.slice(20, 30)} perView={4} component={Card} title={'Недавно смотрели'}/>


            </div>



        </>
    );
}

export default MainPage;


{/*             <ContentHeader title='Главная страница'/>
            <div><Link to={'/catalog'}>В каталог</Link></div>
            <div><Link replace to={'/dnd'}  state={{backgroundLocation: location, initialPath: location.pathname}}>
                Открыть защитную страницу
            </Link></div> */}