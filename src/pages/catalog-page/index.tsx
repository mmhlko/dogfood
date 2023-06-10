import { CardList } from "../../components/card-list"
import { Sort } from "../../components/sort"
import { Spiner } from "../../components/spiner";
import s from './styles.module.css';
import { ContentHeader } from "../../components/content-header";
import { TABS } from "../../utils/constants";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../storage/hook";
import Carousel from "../../components/carousel";
import { Card } from "../../components/card";
import { getProducts } from "../../storage/products/selector";




export const CatalogPage = () => {

    
    //упрощение const cards = useAppSelector(state => state.products.data)
    const cards = useAppSelector(getProducts)

    return (


        <div className="content container">
            <ContentHeader title="Каталог" textButton='Главная' to='/' />
            <Sort tabs={TABS} />
            <CardList goods={cards}/>
            
            
            
        </div>

        

    )
}


        {/* старая версия до скелетона карточек
        
        return (
            <> {isLoading
                ? <Spiner />
                :  <>
                    <ContentHeader title="Каталог" textButton='Главная' to='/' />
                    <CardList goods={goods}/>
                </>

            }
            </>
        )
        */}