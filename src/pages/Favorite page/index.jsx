
//import { useContext } from "react";
//import { CardsContext } from "../../contexts/cards-context";
import { CardList } from "../../components/card-list"
import { Sort } from "../../components/sort"
import { Spiner } from "../../components/spiner";

import s from './styles.module.css';
import { ContentHeader } from "../../components/content-header";
import { useSelector } from "react-redux";


export const FavoritePage = () => {    

    /* const { favorites: goods } = useContext(CardsContext) теперь берем не из контекста, а из среза*/
    const favorites = useSelector(state => state.products.favoriteProducts)
    const isLoading = useSelector(state => state.products.loading)
    /* console.log(goods); */
    return (
        <> 
            {isLoading
                ? <Spiner />
                :  <>
                    <ContentHeader title="Избранное" textButton='Назад'/>
                    <CardList goods={favorites}/>
                </>

            }
        </>
    )
}
