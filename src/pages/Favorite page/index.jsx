
import { useContext } from "react";
import { CardsContext } from "../../contexts/cards-context";
import { CardList } from "../../components/card-list"
import { Sort } from "../../components/sort"
import { Spiner } from "../../components/spiner";

import s from './styles.module.css';
import { ContentHeader } from "../../components/content-header";


export const FavoritePage = ({isLoading}) => {

    const { favorites: goods } = useContext(CardsContext)

    console.log(goods);
    return (
        <> 
            {isLoading
                ? <Spiner />
                :  <>
                    <ContentHeader title="Избранное" textButton='Назад'/>
                    <CardList goods={goods}/>
                </>

            }
        </>
    )
}
