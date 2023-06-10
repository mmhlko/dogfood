
//import { useContext } from "react";
//import { CardsContext } from "../../contexts/cards-context";
import { CardList } from "../../components/card-list"
import { Sort } from "../../components/sort"
import { Spiner } from "../../components/spiner";

import s from './styles.module.css';
import { ContentHeader } from "../../components/content-header";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../storage/hook";


export const FavoritePage = () => {    

    /* const { favorites: goods } = useContext(CardsContext) теперь берем не из контекста, а из среза*/
    const favorites = useAppSelector(state => state.products.favoriteProducts)
    const isLoading = useAppSelector(state => state.products.loading)
    /* console.log(goods); */
    return (
        <div className="content container"> 
            {isLoading
                ? <Spiner />
                :  <>
                    <ContentHeader title="Избранное" textButton='Назад'/>
                    <CardList goods={favorites}/>
                </>

            }
        </div>
    )
}
